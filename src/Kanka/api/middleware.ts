import { Effect, pipe } from "effect";
import { KankaError, KankaErrorCode } from "../errors.js";
import { KankaConfigTag } from "../config.js";

/**
 * Middleware function type
 * 
 * A middleware function takes an effect and returns a new effect with the same
 * success and error types, but potentially with additional dependencies.
 */
export type Middleware<R = never> = <A>(
    effect: Effect.Effect<A, KankaError, R | KankaConfigTag>
) => Effect.Effect<A, KankaError, R | KankaConfigTag>;

/**
 * Create a middleware that logs requests and responses
 * 
 * @param options Options for the logging middleware
 * @returns A middleware function
 * 
 * @example
 * ```typescript
 * const loggingMiddleware = createLoggingMiddleware({
 *   logRequests: true,
 *   logResponses: true,
 *   logErrors: true
 * });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   loggingMiddleware,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createLoggingMiddleware = (options: {
    logRequests?: boolean;
    logResponses?: boolean;
    logErrors?: boolean;
    logLevel?: 'debug' | 'info' | 'warn' | 'error';
} = {}): Middleware => {
    const {
        logRequests = true,
        logResponses = true,
        logErrors = true,
        logLevel = 'info'
    } = options;

    return <A>(effect: Effect.Effect<A, KankaError, KankaConfigTag>) => {
        // Log the request
        let result = effect;

        if (logRequests) {
            result = pipe(
                result,
                Effect.tap(() => {
                    const message = `Request started`;
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
                            return Effect.logInfo(message);
                    }
                })
            );
        }

        // Log the response
        if (logResponses) {
            result = pipe(
                result,
                Effect.tap(response => {
                    const message = `Request completed: ${JSON.stringify(response)}`;
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
                            return Effect.logInfo(message);
                    }
                })
            );
        }

        // Log errors
        if (logErrors) {
            result = pipe(
                result,
                Effect.tapError(error => {
                    const message = `Request failed: ${error.message}`;
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
                            return Effect.logError(message);
                    }
                })
            );
        }

        return result;
    };
};

/**
 * Create a middleware that adds headers to requests
 * 
 * @param headers Headers to add to requests
 * @returns A middleware function
 * 
 * @example
 * ```typescript
 * const headersMiddleware = createHeadersMiddleware({
 *   'X-Custom-Header': 'custom-value'
 * });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   headersMiddleware,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createHeadersMiddleware = (
    _headers: Record<string, string>
): Middleware => {
    return <A>(effect: Effect.Effect<A, KankaError, KankaConfigTag>) => {
        // This is a placeholder implementation
        // In a real implementation, we would need to modify the request
        // to add the headers, but that would require access to the request
        // object, which we don't have in this simplified model.
        return effect;
    };
};

/**
 * Create a middleware that adds authentication to requests
 * 
 * @param token Authentication token
 * @returns A middleware function
 * 
 * @example
 * ```typescript
 * const authMiddleware = createAuthMiddleware('my-token');
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   authMiddleware,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createAuthMiddleware = (token: string): Middleware => {
    return createHeadersMiddleware({
        'Authorization': `Bearer ${token}`
    });
};

/**
 * Create a middleware that caches responses
 * 
 * @param options Options for the caching middleware
 * @returns A middleware function
 * 
 * @example
 * ```typescript
 * const cachingMiddleware = createCachingMiddleware({
 *   ttl: 60000 // 1 minute
 * });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   cachingMiddleware,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createCachingMiddleware = (_options: {
    ttl?: number;
    maxSize?: number;
} = {}): Middleware => {
    // This is a placeholder implementation
    return <A>(effect: Effect.Effect<A, KankaError, KankaConfigTag>) => {
        // In a real implementation, we would need to:
        // 1. Generate a cache key from the request
        // 2. Check if the key exists in the cache and is not expired
        // 3. If it exists, return the cached value
        // 4. If it doesn't exist, execute the effect and cache the result
        return effect;
    };
};

/**
 * Create a middleware that adds rate limiting to requests
 * 
 * @param options Options for the rate limiting middleware
 * @returns A middleware function
 * 
 * @example
 * ```typescript
 * const rateLimitingMiddleware = createRateLimitingMiddleware({
 *   maxRequests: 10,
 *   windowMs: 60000 // 1 minute
 * });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   rateLimitingMiddleware,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createRateLimitingMiddleware = (options: {
    maxRequests?: number;
    windowMs?: number;
} = {}): Middleware => {
    const {
        maxRequests = 10,
        windowMs = 60000 // 1 minute
    } = options;

    // Track request timestamps
    const requestTimestamps: number[] = [];

    return <A>(effect: Effect.Effect<A, KankaError, KankaConfigTag>) => {
        return pipe(
            Effect.sync(() => {
                // Remove expired timestamps
                const now = Date.now();
                const windowStart = now - windowMs;
                while (requestTimestamps.length > 0 && requestTimestamps[0] < windowStart) {
                    requestTimestamps.shift();
                }

                // Check if we've exceeded the rate limit
                if (requestTimestamps.length >= maxRequests) {
                    const oldestTimestamp = requestTimestamps[0];
                    const resetTime = oldestTimestamp + windowMs;
                    const waitTime = resetTime - now;
                    throw new KankaError({
                        message: `Rate limit exceeded. Try again in ${Math.ceil(waitTime / 1000)} seconds.`,
                        code: KankaErrorCode.RATE_LIMIT
                    });
                }

                // Add current timestamp
                requestTimestamps.push(now);
            }),
            Effect.flatMap(() => effect)
        );
    };
};

/**
 * Create a middleware that adds metrics tracking to requests
 * 
 * @param options Options for the metrics middleware
 * @returns A middleware function
 * 
 * @example
 * ```typescript
 * const metricsMiddleware = createMetricsMiddleware({
 *   trackTiming: true,
 *   trackErrors: true
 * });
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   metricsMiddleware,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createMetricsMiddleware = (options: {
    trackTiming?: boolean;
    trackErrors?: boolean;
} = {}): Middleware => {
    const {
        trackTiming = true,
        trackErrors = true
    } = options;

    // Simple metrics tracking
    const metrics = {
        totalRequests: 0,
        totalErrors: 0,
        totalTime: 0,
        averageTime: 0
    };

    return <A>(effect: Effect.Effect<A, KankaError, KankaConfigTag>) => {
        if (!trackTiming && !trackErrors) {
            return effect;
        }

        return pipe(
            Effect.sync(() => {
                metrics.totalRequests++;
                return trackTiming ? Date.now() : 0;
            }),
            Effect.flatMap(startTime => pipe(
                effect,
                Effect.tap(() => {
                    if (trackTiming) {
                        const endTime = Date.now();
                        const duration = endTime - startTime;
                        metrics.totalTime += duration;
                        metrics.averageTime = metrics.totalTime / metrics.totalRequests;
                    }
                    return Effect.succeed(undefined);
                }),
                Effect.tapError((_error: KankaError) => {
                    if (trackErrors) {
                        metrics.totalErrors++;
                    }
                    return Effect.succeed(undefined);
                })
            ))
        );
    };
};

/**
 * Combine multiple middlewares into a single middleware
 * 
 * @param middlewares Middlewares to combine
 * @returns A combined middleware function
 * 
 * @example
 * ```typescript
 * const combinedMiddleware = combineMiddlewares([
 *   createLoggingMiddleware(),
 *   createAuthMiddleware('my-token'),
 *   createCachingMiddleware()
 * ]);
 * 
 * const result = await pipe(
 *   getCharacters(),
 *   combinedMiddleware,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const combineMiddlewares = <R = never>(
    middlewares: ReadonlyArray<Middleware<R>>
): Middleware<R> => {
    return <A>(effect: Effect.Effect<A, KankaError, R | KankaConfigTag>) => {
        return middlewares.reduce(
            (acc, middleware) => middleware(acc),
            effect
        );
    };
};
