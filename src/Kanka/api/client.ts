import { Url, UrlParams } from "@effect/platform";
import { Effect } from "effect";
import { KankaConfigTag } from "../config.js";
import {
    KankaApiError,
    KankaAuthenticationError,
    KankaNetworkError,
    KankaRateLimitError,
    KankaValidationError,
    fromResponse,
} from "../errors.js";
import { ErrorResponse } from "../schemas/common.js";
import { params } from "@effect/platform/HttpRouter";

/**
 * HTTP method types
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ParamsType = Record<string, string | number | boolean | undefined> | undefined;

/**
 * Request options
 */
export interface RequestOptions {
    method?: HttpMethod;
    body?: unknown;
    params?: ParamsType
}


/**
 * Make a request to the Kanka API
 */
export const request = <T>(path: string, options: RequestOptions = {}) => {
    return Effect.gen(function* (_) {
        const config = yield* KankaConfigTag;
        const { baseUrl, apiKey } = config;

        const urlBase = yield* Url.fromString(path, baseUrl);
        let url = urlBase;
        if (options.params) {
            url = Url.setUrlParams(urlBase, UrlParams.fromInput(options.params));
        }
        console.log(`Hailing to ${url}`);

        // Build request options
        const requestOptions: RequestInit = {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
        };

        if (options.body) {
            requestOptions.body = JSON.stringify(options.body);
        }

        try {
            // Make the request
            const response = yield* Effect.tryPromise({
                try: () => fetch(url, requestOptions),
                catch: (error) =>
                    new KankaNetworkError({
                        message: "Network error",
                        cause: error,
                    }),
            });

            // Handle non-2xx responses
            if (!response.ok) {
                const contentType = response.headers.get("Content-Type");

                // Handle rate limiting
                if (response.status === 429) {
                    const retryAfter = response.headers.get("Retry-After");
                    return yield* Effect.fail(
                        new KankaRateLimitError({
                            message: "Rate limit exceeded",
                            retryAfter: parseInt(retryAfter ?? "0", 10),
                        })
                    );
                }

                // Handle authentication errors
                if (response.status === 401) {
                    return yield* Effect.fail(
                        new KankaAuthenticationError({
                            message: "Authentication failed",
                        })
                    );
                }

                // Parse error response if it's JSON
                if (contentType?.includes("application/json")) {
                    const errorData = yield* Effect.tryPromise({
                        try: () => response.json(),
                        catch: () => ({ message: "Unknown error" }),
                    });

                    // Handle validation errors
                    if (response.status === 422) {
                        const errorResponse = errorData as ErrorResponse;
                        return yield* Effect.fail(
                            new KankaValidationError({
                                message: errorResponse.message,
                                errors: errorResponse.errors || {},
                            })
                        );
                    }

                    return yield* Effect.fail(fromResponse(response, errorData));
                }

                // Handle non-JSON error responses
                return yield* Effect.fail(
                    fromResponse(response, {
                        message: response.statusText,
                    })
                );
            }

            // Parse successful response
            const data = yield* Effect.tryPromise({
                try: () => response.json() as Promise<T>,
                catch: (error) =>
                    fromResponse(response, {
                        message: "Failed to parse response",
                        error,
                    }),
            });

            return data;
        } catch (error) {
            if (
                error instanceof KankaNetworkError ||
                error instanceof KankaApiError ||
                error instanceof KankaAuthenticationError ||
                error instanceof KankaRateLimitError ||
                error instanceof KankaValidationError
            ) {
                return yield* Effect.fail(error);
            }

            return yield* Effect.fail(
                new KankaNetworkError({
                    message: "Unknown error",
                    cause: error,
                })
            );
        }
    });
};

/**
 * Make a GET request to the Kanka API
 */
export const get = <T>(
    path: string,
    params?: ParamsType
) => {
    return request<T>(path, { method: "GET", params });
};

/**
 * Make a POST request to the Kanka API
 */
export const post = <T>(
    path: string,
    body: unknown,
    params?: ParamsType
) => {
    return request<T>(path, { method: "POST", body, params });
};

/**
 * Make a PUT request to the Kanka API
 */
export const put = <T>(
    path: string,
    body: unknown,
    params?: Record<string, string | number | boolean>
) => {
    return request<T>(path, { method: "PUT", body, params });
};

/**
 * Make a DELETE request to the Kanka API
 */
export const del = <T>(
    path: string,
    params?: ParamsType
) => {
    return request<T>(path, { method: "DELETE", params });
};

/**
 * Make a PATCH request to the Kanka API
 */
export const patch = <T>(
    path: string,
    body: unknown,
    params?: ParamsType
) => {
    return request<T>(path, { method: "PATCH", body, params });
};

/**
 * Upload a file to the Kanka API
 */
export const uploadFile = <T>(
    path: string,
    formData: FormData,
    params?: ParamsType
) => {
    return Effect.gen(function* (_) {
        const config = yield* KankaConfigTag;
        const { baseUrl, apiKey } = config;

        const urlBase = yield* Url.fromString(path, baseUrl);
        let url = urlBase;
        if (params) {
            url = Url.setUrlParams(urlBase, UrlParams.fromInput(params));
        }
        console.log(`Uploading to ${url}`);

        // Build request options for file upload
        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
                // Don't set Content-Type, let the browser set it with the boundary
            },
            body: formData
        };

        try {
            // Make the request
            const response = yield* Effect.tryPromise({
                try: () => fetch(url, requestOptions),
                catch: (error) =>
                    new KankaNetworkError({
                        message: "Network error",
                        cause: error,
                    }),
            });

            // Handle non-2xx responses
            if (!response.ok) {
                const contentType = response.headers.get("Content-Type");

                // Handle rate limiting
                if (response.status === 429) {
                    const retryAfter = response.headers.get("Retry-After");
                    return yield* Effect.fail(
                        new KankaRateLimitError({
                            message: "Rate limit exceeded",
                            retryAfter: parseInt(retryAfter ?? "0", 10),
                        })
                    );
                }

                // Handle authentication errors
                if (response.status === 401) {
                    return yield* Effect.fail(
                        new KankaAuthenticationError({
                            message: "Authentication failed",
                        })
                    );
                }

                // Parse error response if it's JSON
                if (contentType?.includes("application/json")) {
                    const errorData = yield* Effect.tryPromise({
                        try: () => response.json(),
                        catch: () => ({ message: "Unknown error" }),
                    });

                    // Handle validation errors
                    if (response.status === 422) {
                        const errorResponse = errorData as ErrorResponse;
                        return yield* Effect.fail(
                            new KankaValidationError({
                                message: errorResponse.message,
                                errors: errorResponse.errors || {},
                            })
                        );
                    }

                    return yield* Effect.fail(fromResponse(response, errorData));
                }

                // Handle non-JSON error responses
                return yield* Effect.fail(
                    fromResponse(response, {
                        message: response.statusText,
                    })
                );
            }

            // Parse successful response
            const data = yield* Effect.tryPromise({
                try: () => response.json() as Promise<T>,
                catch: (error) =>
                    fromResponse(response, {
                        message: "Failed to parse response",
                        error,
                    }),
            });

            return data;
        } catch (error) {
            if (
                error instanceof KankaNetworkError ||
                error instanceof KankaApiError ||
                error instanceof KankaAuthenticationError ||
                error instanceof KankaRateLimitError ||
                error instanceof KankaValidationError
            ) {
                return yield* Effect.fail(error);
            }

            return yield* Effect.fail(
                new KankaNetworkError({
                    message: "Unknown error",
                    cause: error,
                })
            );
        }
    });
};
