import { Effect, pipe } from "effect";
import { KankaError, KankaErrorCode, KankaNetworkError, KankaRateLimitError, KankaServerError, KankaTimeoutError } from "../errors.js";

/**
 * Error handler options
 */
export interface ErrorHandlerOptions {
    /**
     * Maximum number of retries
     */
    maxRetries?: number;

    /**
     * Base delay between retries in milliseconds
     */
    baseDelayMs?: number;

    /**
     * Maximum delay between retries in milliseconds
     */
    maxDelayMs?: number;

    /**
     * Whether to use exponential backoff
     */
    useExponentialBackoff?: boolean;

    /**
     * Whether to add jitter to retry delays
     */
    addJitter?: boolean;

    /**
     * Custom predicate to determine if an error is retryable
     */
    isRetryable?: (error: KankaError) => boolean;

    /**
     * Custom function to get retry delay
     */
    getRetryDelay?: (error: KankaError, retryCount: number) => number;

    /**
     * Callback to execute before retrying
     */
    onRetry?: (error: KankaError, retryCount: number, delayMs: number) => Effect.Effect<void, never, never>;
}

/**
 * Default error handler options
 */
export const defaultErrorHandlerOptions: ErrorHandlerOptions = {
    maxRetries: 3,
    baseDelayMs: 1000,
    maxDelayMs: 30000,
    useExponentialBackoff: true,
    addJitter: true,
    isRetryable: (error: KankaError) => {
        // Use the error's isRetryable method if available
        if (typeof error.isRetryable === 'function') {
            return error.isRetryable();
        }

        // Otherwise, determine based on error type
        return (
            error instanceof KankaNetworkError ||
            error instanceof KankaServerError ||
            error instanceof KankaTimeoutError ||
            error instanceof KankaRateLimitError ||
            error.code === KankaErrorCode.NETWORK ||
            error.code === KankaErrorCode.SERVER_ERROR ||
            error.code === KankaErrorCode.TIMEOUT ||
            error.code === KankaErrorCode.RATE_LIMIT
        );
    },
    getRetryDelay: (error: KankaError, retryCount: number) => {
        // Use the error's getRetryDelayMs method if available
        if (typeof error.getRetryDelayMs === 'function') {
            return error.getRetryDelayMs();
        }

        // Otherwise, use exponential backoff
        const baseDelay = 1000;
        return Math.min(baseDelay * Math.pow(2, retryCount), 30000);
    },
    onRetry: (error: KankaError, retryCount: number, delayMs: number) => {
        return Effect.logWarning(`Retrying after error (${retryCount}): ${error.message}. Waiting ${delayMs}ms...`);
    }
};

/**
 * Create a retry handler for Kanka API errors
 * 
 * @param options Options for the retry handler
 * @returns A function that retries an effect on retryable errors
 * 
 * @example
 * ```typescript
 * const retryHandler = createRetryHandler({ maxRetries: 3 });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   retryHandler,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createRetryHandler = (options: ErrorHandlerOptions = {}) => {
    const {
        maxRetries = defaultErrorHandlerOptions.maxRetries,
        baseDelayMs = defaultErrorHandlerOptions.baseDelayMs,
        maxDelayMs = defaultErrorHandlerOptions.maxDelayMs,
        useExponentialBackoff = defaultErrorHandlerOptions.useExponentialBackoff,
        addJitter = defaultErrorHandlerOptions.addJitter,
        isRetryable = defaultErrorHandlerOptions.isRetryable,
        getRetryDelay = defaultErrorHandlerOptions.getRetryDelay,
        onRetry = defaultErrorHandlerOptions.onRetry
    } = options;

    return <A, R>(effect: Effect.Effect<A, KankaError, R>): Effect.Effect<A, KankaError, R> => {
        const retry = (retryCount: number): Effect.Effect<A, KankaError, R> => {
            return pipe(
                effect,
                Effect.catchAll((error: KankaError) => {
                    // Check if we've reached the maximum number of retries
                    if (retryCount >= (maxRetries || 0)) {
                        return Effect.fail(error);
                    }

                    // Check if the error is retryable
                    if (!isRetryable?.(error)) {
                        return Effect.fail(error);
                    }

                    // Calculate delay
                    let delayMs = baseDelayMs || 1000;

                    if (useExponentialBackoff) {
                        delayMs = getRetryDelay?.(error, retryCount) || delayMs;
                    }

                    // Add jitter to prevent thundering herd
                    if (addJitter) {
                        delayMs = delayMs * (0.8 + Math.random() * 0.4);
                    }

                    // Cap at maximum delay
                    delayMs = Math.min(delayMs, maxDelayMs || 30000);

                    // Execute retry callback
                    return pipe(
                        onRetry?.(error, retryCount + 1, delayMs) || Effect.succeed(undefined),
                        Effect.flatMap(() => Effect.sleep(delayMs)),
                        Effect.flatMap(() => retry(retryCount + 1))
                    );
                })
            );
        };

        return retry(0);
    };
};

/**
 * Create a timeout handler for Kanka API effects
 * 
 * @param timeoutMs Timeout in milliseconds
 * @returns A function that adds a timeout to an effect
 * 
 * @example
 * ```typescript
 * const timeoutHandler = createTimeoutHandler(5000);
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   timeoutHandler,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createTimeoutHandler = (timeoutMs: number) => {
    return <A, E extends KankaError, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, E | KankaTimeoutError, R> => {
        return pipe(
            effect,
            Effect.timeoutFail({
                duration: timeoutMs,
                onTimeout: () => new KankaTimeoutError({
                    message: `Request timed out after ${timeoutMs}ms`,
                    timeoutMs
                })
            })
        );
    };
};

/**
 * Create a logging handler for Kanka API errors
 * 
 * @param options Options for the logging handler
 * @returns A function that logs errors
 * 
 * @example
 * ```typescript
 * const loggingHandler = createLoggingHandler({ logLevel: 'warn' });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   loggingHandler,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createLoggingHandler = (options: {
    logLevel?: 'debug' | 'info' | 'warn' | 'error';
    includeDetails?: boolean;
} = {}) => {
    const { logLevel = 'warn', includeDetails = true } = options;

    return <A, R>(effect: Effect.Effect<A, KankaError, R>): Effect.Effect<A, KankaError, R> => {
        return pipe(
            effect,
            Effect.tapError((error: KankaError) => {
                const message = includeDetails && error.formatDetails
                    ? error.formatDetails()
                    : error.message;

                switch (logLevel) {
                    case 'debug':
                        return Effect.logDebug(message);
                    case 'info':
                        return Effect.logInfo(message);
                    case 'warn':
                        return Effect.logWarning(message);
                    case 'error':
                        return Effect.logError(message);
                    default:
                        return Effect.logWarning(message);
                }
            })
        );
    };
};

/**
 * Create a fallback handler for Kanka API errors
 * 
 * @param fallback Fallback value or function to provide a fallback value
 * @returns A function that provides a fallback value on error
 * 
 * @example
 * ```typescript
 * const fallbackHandler = createFallbackHandler([]);
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   fallbackHandler,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createFallbackHandler = <A>(fallback: A | ((error: KankaError) => Effect.Effect<A, never, never>)) => {
    return <R>(effect: Effect.Effect<A, KankaError, R>): Effect.Effect<A, never, R> => {
        return pipe(
            effect,
            Effect.catchAll((error: KankaError) => {
                if (typeof fallback === 'function') {
                    return (fallback as (error: KankaError) => Effect.Effect<A, never, never>)(error);
                }
                return Effect.succeed(fallback);
            })
        );
    };
};

/**
 * Create a combined error handler with retry, timeout, logging, and fallback
 * 
 * @param options Options for the error handler
 * @returns A function that handles errors
 * 
 * @example
 * ```typescript
 * const errorHandler = createErrorHandler({
 *   retry: { maxRetries: 3 },
 *   timeout: 5000,
 *   logging: { logLevel: 'warn' },
 *   fallback: []
 * });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   errorHandler,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createErrorHandler = <A>(options: {
    retry?: ErrorHandlerOptions | false;
    timeout?: number | false;
    logging?: { logLevel?: 'debug' | 'info' | 'warn' | 'error'; includeDetails?: boolean } | false;
    fallback?: A | ((error: KankaError) => Effect.Effect<A, never, never>) | false;
} = {}) => {
    return <R>(effect: Effect.Effect<A, KankaError, R>): Effect.Effect<A, KankaError | never, R> => {
        let result = effect;

        // Apply timeout handler
        if (options.timeout !== false && options.timeout !== undefined) {
            // KankaTimeoutError is a subclass of KankaError, so this is safe
            result = createTimeoutHandler(options.timeout)(result) as Effect.Effect<A, KankaError, R>;
        }

        // Apply retry handler
        if (options.retry !== false) {
            result = createRetryHandler(options.retry)(result);
        }

        // Apply logging handler
        if (options.logging !== false) {
            result = createLoggingHandler(options.logging)(result);
        }

        // Apply fallback handler
        if (options.fallback !== false && options.fallback !== undefined) {
            result = createFallbackHandler(options.fallback)(result) as Effect.Effect<A, never, R>;
        }

        return result;
    };
};
