import { Data, Effect } from "effect";

/**
 * Base error class for Kanka API errors
 */
export class KankaError extends Data.TaggedError("KankaError")<{
    readonly message: string;
    readonly cause?: unknown;
}> {}

/**
 * Error thrown when the API returns a non-2xx status code
 */
export class KankaApiError extends Data.TaggedError("KankaApiError")<{
    readonly status: number;
    readonly statusText: string;
    readonly url: string;
    readonly body: unknown;
}> {}

/**
 * Error thrown when the API request fails due to network issues
 */
export class KankaNetworkError extends Data.TaggedError("KankaNetworkError")<{
    readonly message: string;
    readonly cause: unknown;
}> {}

/**
 * Error thrown when the API request fails due to authentication issues
 */
export class KankaAuthenticationError extends Data.TaggedError("KankaAuthenticationError")<{
    readonly message: string;
}> {}

/**
 * Error thrown when the API request fails due to rate limiting
 */
export class KankaRateLimitError extends Data.TaggedError("KankaRateLimitError")<{
    readonly retryAfter?: number;
    readonly message: string;
}> {}

/**
 * Error thrown when the API request fails due to validation issues
 */
export class KankaValidationError extends Data.TaggedError("KankaValidationError")<{
    readonly errors: Record<string, string[]>;
    readonly message: string;
}> {}

/**
 * Create a KankaApiError from a Response object
 */
export const fromResponse = (response: Response, body: unknown): KankaApiError => {
    return new KankaApiError({
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body,
    });
};

/**
 * Handle common API errors
 */
export const handleApiError = <E, A>(
    effect: Effect.Effect<A, E, never>
): Effect.Effect<A, KankaError | E, never> => {
    return Effect.catchAll(effect, (error) => {
        if (error instanceof KankaError) {
            return Effect.fail(error);
        }

        return Effect.fail(
            new KankaError({
                message: "An unexpected error occurred",
                cause: error,
            })
        );
    });
};
