import { Data, Effect } from "effect";

/**
 * Error codes for Kanka API errors
 */
export enum KankaErrorCode {
    // General errors
    UNKNOWN = "UNKNOWN",
    NETWORK = "NETWORK",
    TIMEOUT = "TIMEOUT",
    PARSING = "PARSING",

    // Authentication/Authorization errors
    AUTHENTICATION = "AUTHENTICATION",
    AUTHORIZATION = "AUTHORIZATION",
    INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

    // Resource errors
    NOT_FOUND = "NOT_FOUND",
    ALREADY_EXISTS = "ALREADY_EXISTS",

    // Validation errors
    VALIDATION = "VALIDATION",
    INVALID_REQUEST = "INVALID_REQUEST",

    // Server errors
    SERVER_ERROR = "SERVER_ERROR",
    MAINTENANCE = "MAINTENANCE",

    // Rate limiting
    RATE_LIMIT = "RATE_LIMIT"
}

/**
 * Request context for error reporting
 */
export interface RequestContext {
    readonly url: string;
    readonly method: string;
    readonly params?: Record<string, unknown> | undefined;
    readonly body?: unknown;
    readonly headers?: Record<string, string> | undefined;
    readonly timestamp: Date;
}

/**
 * Response context for error reporting
 */
export interface ResponseContext {
    readonly status: number;
    readonly statusText: string;
    readonly headers?: Record<string, string> | undefined;
    readonly body?: unknown;
}

/**
 * Base error class for Kanka API errors
 */
export class KankaError extends Data.TaggedError("KankaError")<{
    readonly message: string;
    readonly code?: KankaErrorCode;
    readonly cause?: unknown;
    readonly request?: RequestContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        code?: KankaErrorCode;
        cause?: unknown;
        request?: RequestContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.UNKNOWN,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.UNKNOWN}`,
            `Message: ${this.message}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
            if (this.request.params && Object.keys(this.request.params).length > 0) {
                details.push(`Params: ${JSON.stringify(this.request.params)}`);
            }
            if (this.request.body) {
                details.push(`Request Body: ${JSON.stringify(this.request.body)}`);
            }
        }

        if (this.cause) {
            details.push(`Cause: ${String(this.cause)}`);
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return false; // Base implementation - most errors are not retryable by default
    }

    /**
     * Get the recommended delay before retrying in milliseconds
     */
    getRetryDelayMs(): number {
        return 1000; // Default 1 second
    }
}

/**
 * Error thrown when the API returns a non-2xx status code
 */
export class KankaApiError extends Data.TaggedError("KankaApiError")<{
    readonly status: number;
    readonly statusText: string;
    readonly url: string;
    readonly body: unknown;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        status: number;
        statusText: string;
        url: string;
        body: unknown;
        code?: KankaErrorCode;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.UNKNOWN,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.UNKNOWN}`,
            `Status: ${this.status} ${this.statusText}`,
            `URL: ${this.url}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.request) {
            details.push(`Request Method: ${this.request.method}`);
            if (this.request.params && Object.keys(this.request.params).length > 0) {
                details.push(`Request Params: ${JSON.stringify(this.request.params)}`);
            }
            if (this.request.body) {
                details.push(`Request Body: ${JSON.stringify(this.request.body)}`);
            }
        }

        if (this.response) {
            if (this.response.headers) {
                details.push(`Response Headers: ${JSON.stringify(this.response.headers)}`);
            }
            if (this.response.body) {
                details.push(`Response Body: ${JSON.stringify(this.response.body)}`);
            }
        } else if (this.body) {
            details.push(`Response Body: ${JSON.stringify(this.body)}`);
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        // Server errors (5xx) are generally retryable
        return this.status >= 500 && this.status < 600;
    }
}

/**
 * Error thrown when the API request fails due to network issues
 */
export class KankaNetworkError extends Data.TaggedError("KankaNetworkError")<{
    readonly message: string;
    readonly cause: unknown;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        cause: unknown;
        code?: KankaErrorCode;
        request?: RequestContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.NETWORK,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.NETWORK}`,
            `Message: ${this.message}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.retryCount !== undefined) {
            details.push(`Retry Count: ${this.retryCount}`);
        }

        details.push(`Cause: ${String(this.cause)}`);

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return true; // Network errors are generally retryable
    }

    /**
     * Get the recommended delay before retrying in milliseconds
     */
    getRetryDelayMs(): number {
        const baseDelay = 1000; // 1 second
        const retryCount = this.retryCount || 0;
        return Math.min(baseDelay * Math.pow(2, retryCount), 30000); // Max 30 seconds
    }
}

/**
 * Error thrown when the API request fails due to authentication issues
 */
export class KankaAuthenticationError extends Data.TaggedError("KankaAuthenticationError")<{
    readonly message: string;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        code?: KankaErrorCode;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.AUTHENTICATION,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.AUTHENTICATION}`,
            `Message: ${this.message}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.response) {
            details.push(`Status: ${this.response.status} ${this.response.statusText}`);
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return false; // Authentication errors are not retryable
    }
}

/**
 * Error thrown when the API request fails due to authorization issues
 * This is different from authentication - it's when the user is authenticated
 * but doesn't have permission to perform the requested action
 */
export class KankaAuthorizationError extends Data.TaggedError("KankaAuthorizationError")<{
    readonly message: string;
    readonly code?: KankaErrorCode;
    readonly campaignId?: number;
    readonly entityType?: string;
    readonly action?: string;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        code?: KankaErrorCode;
        campaignId?: number;
        entityType?: string;
        action?: string;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.AUTHORIZATION,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.AUTHORIZATION}`,
            `Message: ${this.message}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.campaignId) {
            details.push(`Campaign ID: ${this.campaignId}`);
        }

        if (this.entityType) {
            details.push(`Entity Type: ${this.entityType}`);
        }

        if (this.action) {
            details.push(`Action: ${this.action}`);
        }

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.response) {
            details.push(`Status: ${this.response.status} ${this.response.statusText}`);
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return false; // Authorization errors are not retryable
    }
}

/**
 * Error thrown when the API request fails due to rate limiting
 */
export class KankaRateLimitError extends Data.TaggedError("KankaRateLimitError")<{
    readonly retryAfter?: number;
    readonly message: string;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        retryAfter?: number;
        code?: KankaErrorCode;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.RATE_LIMIT,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.RATE_LIMIT}`,
            `Message: ${this.message}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.retryAfter !== undefined) {
            details.push(`Retry After: ${this.retryAfter} seconds`);
        }

        if (this.retryCount !== undefined) {
            details.push(`Retry Count: ${this.retryCount}`);
        }

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.response) {
            details.push(`Status: ${this.response.status} ${this.response.statusText}`);
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return true; // Rate limit errors are retryable after waiting
    }

    /**
     * Get the recommended delay before retrying in milliseconds
     */
    getRetryDelayMs(): number {
        return (this.retryAfter || 1) * 1000;
    }
}

/**
 * Error thrown when the API request fails due to validation issues
 */
export class KankaValidationError extends Data.TaggedError("KankaValidationError")<{
    readonly errors: Record<string, string[]>;
    readonly message: string;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        errors: Record<string, string[]>;
        message: string;
        code?: KankaErrorCode;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.VALIDATION,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.VALIDATION}`,
            `Message: ${this.message}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.response) {
            details.push(`Status: ${this.response.status} ${this.response.statusText}`);
        }

        details.push("Validation Errors:");
        Object.entries(this.errors).forEach(([field, messages]) => {
            details.push(`  ${field}: ${messages.join(', ')}`);
        });

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return false; // Validation errors are not retryable without changing the request
    }
}

/**
 * Error thrown when a resource is not found
 */
export class KankaResourceNotFoundError extends Data.TaggedError("KankaResourceNotFoundError")<{
    readonly message: string;
    readonly resourceType: string;
    readonly resourceId?: number | string;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        resourceType: string;
        resourceId?: number | string;
        code?: KankaErrorCode;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.NOT_FOUND,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.NOT_FOUND}`,
            `Message: ${this.message}`,
            `Resource Type: ${this.resourceType}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.resourceId !== undefined) {
            details.push(`Resource ID: ${this.resourceId}`);
        }

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.response) {
            details.push(`Status: ${this.response.status} ${this.response.statusText}`);
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return false; // Not found errors are not retryable
    }
}

/**
 * Error thrown when the server returns a 5xx error
 */
export class KankaServerError extends Data.TaggedError("KankaServerError")<{
    readonly message: string;
    readonly status: number;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        status: number;
        code?: KankaErrorCode;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.SERVER_ERROR,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.SERVER_ERROR}`,
            `Message: ${this.message}`,
            `Status: ${this.status}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.retryCount !== undefined) {
            details.push(`Retry Count: ${this.retryCount}`);
        }

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.response) {
            details.push(`Status: ${this.response.status} ${this.response.statusText}`);
            if (this.response.body) {
                details.push(`Response Body: ${JSON.stringify(this.response.body)}`);
            }
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return true; // Server errors are generally retryable
    }

    /**
     * Get the recommended delay before retrying in milliseconds
     * Uses exponential backoff based on retry count
     */
    getRetryDelayMs(): number {
        const baseDelay = 1000; // 1 second
        const retryCount = this.retryCount || 0;
        return Math.min(baseDelay * Math.pow(2, retryCount), 30000); // Max 30 seconds
    }
}

/**
 * Error thrown when a request times out
 */
export class KankaTimeoutError extends Data.TaggedError("KankaTimeoutError")<{
    readonly message: string;
    readonly timeoutMs: number;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        timeoutMs: number;
        code?: KankaErrorCode;
        request?: RequestContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.TIMEOUT,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.TIMEOUT}`,
            `Message: ${this.message}`,
            `Timeout: ${this.timeoutMs}ms`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.retryCount !== undefined) {
            details.push(`Retry Count: ${this.retryCount}`);
        }

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return true; // Timeout errors are generally retryable
    }

    /**
     * Get the recommended delay before retrying in milliseconds
     */
    getRetryDelayMs(): number {
        const baseDelay = 1000; // 1 second
        const retryCount = this.retryCount || 0;
        return Math.min(baseDelay * Math.pow(2, retryCount), 30000); // Max 30 seconds
    }
}

/**
 * Error thrown when parsing a response fails
 */
export class KankaParsingError extends Data.TaggedError("KankaParsingError")<{
    readonly message: string;
    readonly cause: unknown;
    readonly code?: KankaErrorCode;
    readonly request?: RequestContext;
    readonly response?: ResponseContext;
    readonly timestamp?: Date;
    readonly retryCount?: number;
}> {
    constructor(params: {
        message: string;
        cause: unknown;
        code?: KankaErrorCode;
        request?: RequestContext;
        response?: ResponseContext;
        timestamp?: Date;
        retryCount?: number;
    }) {
        super({
            ...params,
            code: params.code || KankaErrorCode.PARSING,
            timestamp: params.timestamp || new Date()
        });
    }

    /**
     * Format error details as a string for debugging
     */
    formatDetails(): string {
        const details: string[] = [
            `Error Code: ${this.code || KankaErrorCode.PARSING}`,
            `Message: ${this.message}`,
            `Timestamp: ${this.timestamp?.toISOString() || new Date().toISOString()}`
        ];

        if (this.request) {
            details.push(`URL: ${this.request.method} ${this.request.url}`);
        }

        if (this.response) {
            details.push(`Status: ${this.response.status} ${this.response.statusText}`);
        }

        details.push(`Cause: ${String(this.cause)}`);

        return details.join('\n');
    }

    /**
     * Check if this error is retryable
     */
    isRetryable(): boolean {
        return false; // Parsing errors are not retryable without changing the response
    }
}

/**
 * Create a request context object from request details
 */
export const createRequestContext = (
    url: string,
    method: string,
    params?: Record<string, unknown>,
    body?: unknown,
    headers?: Record<string, string>
): RequestContext => {
    return {
        url,
        method,
        params,
        body,
        headers,
        timestamp: new Date()
    };
};

/**
 * Create a response context object from a Response object
 */
export const createResponseContext = async (
    response: Response
): Promise<ResponseContext> => {
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
        headers[key] = value;
    });

    let body: unknown = undefined;
    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
        try {
            // Clone the response to avoid consuming it
            const clonedResponse = response.clone();
            body = await clonedResponse.json();
        } catch (error) {
            // Ignore parsing errors
        }
    }

    return {
        status: response.status,
        statusText: response.statusText,
        headers,
        body
    };
};

/**
 * Determine error code based on HTTP status code
 */
const determineErrorCode = (status: number): KankaErrorCode => {
    if (status === 400) return KankaErrorCode.INVALID_REQUEST;
    if (status === 401) return KankaErrorCode.AUTHENTICATION;
    if (status === 403) return KankaErrorCode.AUTHORIZATION;
    if (status === 404) return KankaErrorCode.NOT_FOUND;
    if (status === 422) return KankaErrorCode.VALIDATION;
    if (status === 429) return KankaErrorCode.RATE_LIMIT;
    if (status >= 500) return KankaErrorCode.SERVER_ERROR;
    return KankaErrorCode.UNKNOWN;
};

/**
 * Create a KankaApiError from a Response object
 * @deprecated Use the async version instead
 */
export const fromResponse = (response: Response, body: unknown): KankaApiError => {
    return new KankaApiError({
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body,
        code: determineErrorCode(response.status)
    });
};

/**
 * Create a specific error type from a Response object
 */
export const fromResponseAsync = async (
    response: Response,
    body: unknown,
    request?: RequestContext
): Promise<KankaApiError | KankaAuthenticationError | KankaAuthorizationError | KankaRateLimitError | KankaValidationError | KankaResourceNotFoundError | KankaServerError> => {
    const responseContext = await createResponseContext(response);
    const code = determineErrorCode(response.status);

    // Handle different status codes with specific error types
    if (response.status === 401) {
        return new KankaAuthenticationError({
            message: "Authentication failed. Please check your API key.",
            code,
            request: request || undefined,
            response: responseContext
        });
    }

    if (response.status === 403) {
        // Try to determine if this is a campaign-level authorization issue
        let campaignId: number | undefined = undefined;
        let entityType: string | undefined = undefined;
        let action: string | undefined = undefined;

        // Extract campaign ID from URL if possible
        const campaignMatch = response.url.match(/\/campaigns\/(\d+)/);
        if (campaignMatch) {
            campaignId = parseInt(campaignMatch[1], 10);
        }

        // Try to extract entity type from URL
        const entityMatch = response.url.match(/\/campaigns\/\d+\/([a-z-]+)/);
        if (entityMatch) {
            entityType = entityMatch[1];
        }

        // Determine action based on HTTP method
        const method = request?.method || "";
        if (method === "GET") {
            action = "read";
        } else if (method === "POST") {
            action = "create";
        } else if (method === "PUT" || method === "PATCH") {
            action = "update";
        } else if (method === "DELETE") {
            action = "delete";
        }

        return new KankaAuthorizationError({
            message: "You don't have permission to perform this action.",
            code,
            campaignId,
            entityType,
            action,
            request: request || undefined,
            response: responseContext
        });
    }

    if (response.status === 404) {
        // Try to determine resource type from URL
        let resourceType = "resource";
        let resourceId: string | number | undefined = undefined;

        const entityMatch = response.url.match(/\/([a-z-]+)\/(\d+)$/);
        if (entityMatch) {
            resourceType = entityMatch[1];
            resourceId = parseInt(entityMatch[2], 10);
        }

        return new KankaResourceNotFoundError({
            message: `The requested ${resourceType} was not found.`,
            code,
            resourceType,
            resourceId,
            request: request || undefined,
            response: responseContext
        });
    }

    if (response.status === 422) {
        // Handle validation errors
        const errorResponse = body as { message: string; errors?: Record<string, string[]> };
        return new KankaValidationError({
            message: errorResponse.message || "Validation failed.",
            code,
            errors: errorResponse.errors || {},
            request: request || undefined,
            response: responseContext
        });
    }

    if (response.status === 429) {
        // Handle rate limiting
        const retryAfter = response.headers.get("Retry-After");
        return new KankaRateLimitError({
            message: "Rate limit exceeded. Please try again later.",
            code,
            retryAfter: parseInt(retryAfter || "60", 10),
            request: request || undefined,
            response: responseContext
        });
    }

    if (response.status >= 500) {
        // Handle server errors
        return new KankaServerError({
            message: "The server encountered an error. Please try again later.",
            code,
            status: response.status,
            request: request || undefined,
            response: responseContext
        });
    }

    // Default to generic API error for other status codes
    return new KankaApiError({
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body,
        code,
        request: request || undefined,
        response: responseContext
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
