import { Schema, Effect, pipe } from "effect";
import { KankaError } from "../errors.js";

/**
 * Validation error details
 */
export interface ValidationErrorDetails {
    path: string;
    message: string;
    expected: string;
    received: unknown;
}

/**
 * Validation error severity levels
 */
export enum ValidationErrorSeverity {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}

/**
 * Base error thrown when schema validation fails
 */
export class KankaSchemaValidationError extends KankaError {
    constructor(params: {
        message: string;
        cause?: unknown;
        schema?: string | undefined;
        value?: unknown;
        details?: ValidationErrorDetails[] | undefined;
        severity?: ValidationErrorSeverity;
    }) {
        super(params);
        this.details = params.details || [];
        this.severity = params.severity || ValidationErrorSeverity.ERROR;
        this.schema = params.schema;
        this.value = params.value;
    }

    details: ValidationErrorDetails[];
    severity: ValidationErrorSeverity;
    schema?: string | undefined;
    value?: unknown;

    /**
     * Format error details as a string
     */
    formatDetails(): string {
        if (this.details.length === 0) {
            return "No validation details available";
        }

        return this.details.map(detail =>
            `- Path: ${detail.path}, Expected: ${detail.expected}, Received: ${JSON.stringify(detail.received)}, Message: ${detail.message}`
        ).join("\n");
    }

    /**
     * Get a human-readable summary of the validation error
     */
    getSummary(): string {
        return `Validation ${this.severity}: ${this.message}\n${this.formatDetails()}`;
    }
}

/**
 * Error thrown when a required field is missing
 */
export class KankaMissingFieldError extends KankaSchemaValidationError {
    constructor(params: {
        fieldName: string;
        schema?: string | undefined;
        value?: unknown;
        details?: ValidationErrorDetails[] | undefined;
    }) {
        super({
            message: `Required field '${params.fieldName}' is missing`,
            schema: params.schema,
            value: params.value,
            details: params.details,
            severity: ValidationErrorSeverity.ERROR
        });
        this.fieldName = params.fieldName;
    }

    fieldName: string;
}

/**
 * Error thrown when a field has an invalid type
 */
export class KankaInvalidTypeError extends KankaSchemaValidationError {
    constructor(params: {
        fieldName: string;
        expectedType: string;
        receivedType: string;
        schema?: string | undefined;
        value?: unknown;
        details?: ValidationErrorDetails[] | undefined;
    }) {
        super({
            message: `Field '${params.fieldName}' has invalid type: expected ${params.expectedType}, received ${params.receivedType}`,
            schema: params.schema,
            value: params.value,
            details: params.details,
            severity: ValidationErrorSeverity.ERROR
        });
        this.fieldName = params.fieldName;
        this.expectedType = params.expectedType;
        this.receivedType = params.receivedType;
    }

    fieldName: string;
    expectedType: string;
    receivedType: string;
}

/**
 * Error thrown when a field value is invalid
 */
export class KankaInvalidValueError extends KankaSchemaValidationError {
    constructor(params: {
        fieldName: string;
        reason: string;
        schema?: string | undefined;
        value?: unknown;
        details?: ValidationErrorDetails[] | undefined;
    }) {
        super({
            message: `Field '${params.fieldName}' has invalid value: ${params.reason}`,
            schema: params.schema,
            value: params.value,
            details: params.details,
            severity: ValidationErrorSeverity.ERROR
        });
        this.fieldName = params.fieldName;
        this.reason = params.reason;
    }

    fieldName: string;
    reason: string;
}

/**
 * Configuration options for validation
 */
export interface ValidationOptions {
    /**
     * Whether to use caching for validation results
     */
    useCache?: boolean;

    /**
     * Whether to throw errors for validation warnings
     */
    strictMode?: boolean;

    /**
     * Custom error handler for validation errors
     */
    errorHandler?: (error: KankaSchemaValidationError) => KankaSchemaValidationError;
}

/**
 * Default validation options
 */
export const defaultValidationOptions: ValidationOptions = {
    useCache: true,
    strictMode: false,
    errorHandler: (error) => error
};

/**
 * Extract validation error details from a Schema validation error
 */
const extractValidationDetails = (error: unknown): ValidationErrorDetails[] => {
    if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors)) {
        return error.errors.map(err => ({
            path: Array.isArray(err.path) ? err.path.join('.') : String(err.path || ''),
            message: String(err.message || 'Validation error'),
            expected: String(err.expected || 'unknown'),
            received: err.actual || 'unknown'
        }));
    }
    return [{
        path: '',
        message: String(error),
        expected: 'valid data',
        received: 'invalid data'
    }];
};

/**
 * Create a specific validation error based on the error details
 */
const createSpecificValidationError = <T>(
    error: unknown,
    schema: Schema.Schema<T, unknown>,
    data: unknown
): KankaSchemaValidationError => {
    const details = extractValidationDetails(error);

    // If there are no details, return a generic error
    if (details.length === 0) {
        return new KankaSchemaValidationError({
            message: `Schema validation failed: ${String(error)}`,
            cause: error,
            schema: schema.toString(),
            value: data,
            details
        });
    }

    // Check for specific error types
    const firstDetail = details[0];

    // Check for missing field errors
    if (firstDetail.message.includes('required') || firstDetail.message.includes('missing')) {
        const fieldName = firstDetail.path || 'unknown';
        return new KankaMissingFieldError({
            fieldName,
            schema: schema.toString(),
            value: data,
            details
        });
    }

    // Check for invalid type errors
    if (firstDetail.message.includes('type') || firstDetail.message.includes('expected')) {
        const fieldName = firstDetail.path || 'unknown';
        const expectedType = firstDetail.expected || 'unknown';
        const receivedType = typeof firstDetail.received === 'object'
            ? (firstDetail.received === null ? 'null' : 'object')
            : typeof firstDetail.received;

        return new KankaInvalidTypeError({
            fieldName,
            expectedType,
            receivedType,
            schema: schema.toString(),
            value: data,
            details
        });
    }

    // Default to invalid value error
    const fieldName = firstDetail.path || 'unknown';
    return new KankaInvalidValueError({
        fieldName,
        reason: firstDetail.message,
        schema: schema.toString(),
        value: data,
        details
    });
};

/**
 * Validate data against a schema
 * 
 * @param schema The schema to validate against
 * @param data The data to validate
 * @param options Validation options
 * @returns An Effect that succeeds with the validated data or fails with a KankaSchemaValidationError
 * 
 * @example
 * ```typescript
 * const validatedData = pipe(
 *   validateWithSchema(CharacterSchema, responseData),
 *   Effect.getOrElse(() => defaultValue)
 * );
 * ```
 */
export const validateWithSchema = <A>(
    schema: Schema.Schema<A, unknown>,
    data: unknown,
    options: ValidationOptions = defaultValidationOptions
): Effect.Effect<A, KankaSchemaValidationError> => {
    const { useCache = true, strictMode = false, errorHandler } = { ...defaultValidationOptions, ...options };

    // If caching is enabled, use the cached version
    if (useCache) {
        return validateWithSchemaAndCache(schema, data, options);
    }

    return pipe(
        Effect.tryPromise({
            try: async () => {
                try {
                    // Use Schema.decode to validate the data
                    return await Effect.runPromise(Schema.decode(schema)(data));
                } catch (decodeError) {
                    // Create a specific error based on the details
                    const specificError = createSpecificValidationError<A>(decodeError, schema, data);

                    // Apply custom error handler if provided
                    const finalError = errorHandler ? errorHandler(specificError) : specificError;

                    // In non-strict mode, warnings don't cause failures
                    if (!strictMode && finalError.severity === ValidationErrorSeverity.WARNING) {
                        console.warn(finalError.getSummary());
                        // Try to return the data anyway, even though it didn't fully validate
                        return data as A;
                    }

                    throw finalError;
                }
            },
            catch: (error) => {
                if (error instanceof KankaSchemaValidationError) {
                    return error;
                }

                // Create a specific error based on the details
                const specificError = createSpecificValidationError<A>(error, schema, data);

                // Apply custom error handler if provided
                return errorHandler ? errorHandler(specificError) : specificError;
            }
        }),
        Effect.catchAll((error) => {
            if (error instanceof KankaSchemaValidationError) {
                return Effect.fail(error);
            }

            // Create a specific error based on the details
            const specificError = createSpecificValidationError<A>(error, schema, data);

            // Apply custom error handler if provided
            const finalError = errorHandler ? errorHandler(specificError) : specificError;

            return Effect.fail(finalError);
        })
    );
};

/**
 * Validate a response against a schema
 * 
 * @param schema The schema to validate against
 * @param options Validation options
 * @returns A function that takes a response and returns an Effect that succeeds with the validated response
 * 
 * @example
 * ```typescript
 * const getCharacter = (id: number) => pipe(
 *   get<SingleResponse<Character>>(`characters/${id}`),
 *   Effect.flatMap(validateResponse(CharacterSchema)),
 *   Effect.catchAll(handleError)
 * );
 * ```
 */
export const validateResponse = <A>(
    schema: Schema.Schema<A, unknown>,
    options: ValidationOptions = defaultValidationOptions
) => (response: unknown): Effect.Effect<A, KankaSchemaValidationError> => {
    return validateWithSchema(schema, response, options);
};

/**
 * Validate a request against a schema
 * 
 * @param schema The schema to validate against
 * @param options Validation options
 * @returns A function that takes a request and returns an Effect that succeeds with the validated request
 * 
 * @example
 * ```typescript
 * const createCharacter = (params: CreateCharacterParams) => pipe(
 *   validateRequest(CreateCharacterParamsSchema)(params),
 *   Effect.flatMap((validatedParams) => post<SingleResponse<Character>>("characters", validatedParams)),
 *   Effect.catchAll(handleError)
 * );
 * ```
 */
export const validateRequest = <A>(
    schema: Schema.Schema<A, unknown>,
    options: ValidationOptions = defaultValidationOptions
) => (request: unknown): Effect.Effect<A, KankaSchemaValidationError> => {
    return validateWithSchema(schema, request, options);
};

/**
 * Create a partial validator that allows missing fields
 * 
 * @param schema The schema to validate against
 * @param options Validation options
 * @returns A function that takes data and returns an Effect that succeeds with the validated data
 * 
 * @example
 * ```typescript
 * const validatePartialCharacter = createPartialValidator(CharacterSchema);
 * const validatedData = pipe(
 *   validatePartialCharacter(partialData),
 *   Effect.getOrElse(() => defaultValue)
 * );
 * ```
 */
export const createPartialValidator = <A>(
    schema: Schema.Schema<A, unknown>,
    options: ValidationOptions = defaultValidationOptions
) => (data: unknown): Effect.Effect<Partial<A>, KankaSchemaValidationError> => {
    // Create a custom error handler that downgrades missing field errors to warnings
    const errorHandler = (error: KankaSchemaValidationError): KankaSchemaValidationError => {
        if (error instanceof KankaMissingFieldError) {
            return new KankaSchemaValidationError({
                message: `Optional field '${error.fieldName}' is missing`,
                schema: error.schema,
                value: error.value,
                details: error.details,
                severity: ValidationErrorSeverity.WARNING
            });
        }
        return error;
    };

    // Use the custom error handler with the schema validation
    return validateWithSchema(schema, data, {
        ...options,
        errorHandler: options.errorHandler
            ? (error) => options.errorHandler!(errorHandler(error))
            : errorHandler
    }) as Effect.Effect<Partial<A>, KankaSchemaValidationError>;
};

/**
 * Cache for schema validation results to improve performance
 * The key is a combination of the schema identifier and a hash of the data
 */
const validationCache = new Map<string, unknown>();

/**
 * Cache statistics for monitoring performance
 */
export interface ValidationCacheStats {
    hits: number;
    misses: number;
    size: number;
}

/**
 * Current cache statistics
 */
const cacheStats: ValidationCacheStats = {
    hits: 0,
    misses: 0,
    size: 0
};

/**
 * Get current validation cache statistics
 */
export const getValidationCacheStats = (): ValidationCacheStats => ({
    ...cacheStats
});

/**
 * Generate a cache key for schema validation
 */
const generateCacheKey = <A>(schema: Schema.Schema<A, unknown>, data: unknown): string => {
    const schemaId = schema.toString();
    const dataHash = JSON.stringify(data);
    return `${schemaId}:${dataHash}`;
};

/**
 * Validate data against a schema with caching
 * 
 * @param schema The schema to validate against
 * @param data The data to validate
 * @param options Validation options
 * @returns An Effect that succeeds with the validated data or fails with a KankaSchemaValidationError
 */
export const validateWithSchemaAndCache = <A>(
    schema: Schema.Schema<A, unknown>,
    data: unknown,
    options: ValidationOptions = defaultValidationOptions
): Effect.Effect<A, KankaSchemaValidationError> => {
    const { useCache = true, strictMode = false, errorHandler } = { ...defaultValidationOptions, ...options };

    if (!useCache) {
        return validateWithSchema(schema, data, options);
    }

    return pipe(
        Effect.tryPromise({
            try: async () => {
                const cacheKey = generateCacheKey(schema, data);

                // Check if we have a cached result
                if (validationCache.has(cacheKey)) {
                    cacheStats.hits++;
                    return validationCache.get(cacheKey) as A;
                }

                cacheStats.misses++;

                try {
                    // Validate the data
                    const result = await Effect.runPromise(Schema.decode(schema)(data));

                    // Cache the result
                    validationCache.set(cacheKey, result);
                    cacheStats.size = validationCache.size;

                    return result;
                } catch (decodeError) {
                    // Create a specific error based on the details
                    const specificError = createSpecificValidationError<A>(decodeError, schema, data);

                    // Apply custom error handler if provided
                    const finalError = errorHandler ? errorHandler(specificError) : specificError;

                    // In non-strict mode, warnings don't cause failures
                    if (!strictMode && finalError.severity === ValidationErrorSeverity.WARNING) {
                        console.warn(finalError.getSummary());
                        // Try to return the data anyway, even though it didn't fully validate
                        return data as A;
                    }

                    throw finalError;
                }
            },
            catch: (error) => {
                if (error instanceof KankaSchemaValidationError) {
                    return error;
                }

                // Create a specific error based on the details
                const specificError = createSpecificValidationError<A>(error, schema, data);

                // Apply custom error handler if provided
                return errorHandler ? errorHandler(specificError) : specificError;
            }
        }),
        Effect.catchAll((error) => {
            if (error instanceof KankaSchemaValidationError) {
                return Effect.fail(error);
            }

            // Create a specific error based on the details
            const specificError = createSpecificValidationError<A>(error, schema, data);

            // Apply custom error handler if provided
            const finalError = errorHandler ? errorHandler(specificError) : specificError;

            return Effect.fail(finalError);
        })
    );
};

/**
 * Clear the validation cache
 */
export const clearValidationCache = (): void => {
    validationCache.clear();
    cacheStats.size = 0;
    cacheStats.hits = 0;
    cacheStats.misses = 0;
};

/**
 * Set the maximum size of the validation cache
 * When the cache exceeds this size, the least recently used items will be removed
 * 
 * @param maxSize Maximum number of items to keep in the cache
 */
export const setValidationCacheMaxSize = (maxSize: number): void => {
    if (validationCache.size > maxSize) {
        // Get all entries and sort by last access time
        const entries = Array.from(validationCache.entries());

        // Remove oldest entries until we're under the max size
        const entriesToRemove = entries.length - maxSize;
        if (entriesToRemove > 0) {
            for (let i = 0; i < entriesToRemove; i++) {
                validationCache.delete(entries[i][0]);
            }
            cacheStats.size = validationCache.size;
        }
    }
};

/**
 * Create a schema validator with custom options
 * 
 * @param options Default validation options to use
 * @returns A validator function with the specified options
 * 
 * @example
 * ```typescript
 * const strictValidator = createValidator({ strictMode: true });
 * const validatedData = pipe(
 *   strictValidator(CharacterSchema, data),
 *   Effect.getOrElse(() => defaultValue)
 * );
 * ```
 */
export const createValidator = (options: ValidationOptions = defaultValidationOptions) => {
    return <A>(
        schema: Schema.Schema<A, unknown>,
        data: unknown,
        overrideOptions?: ValidationOptions
    ): Effect.Effect<A, KankaSchemaValidationError> => {
        return validateWithSchema(schema, data, { ...options, ...overrideOptions });
    };
};

/**
 * Create a schema validator that logs validation errors but doesn't fail
 * 
 * @param schema The schema to validate against
 * @returns A function that takes data and returns the data, logging any validation errors
 * 
 * @example
 * ```typescript
 * const logValidationErrors = createLoggingValidator(CharacterSchema);
 * const data = logValidationErrors(responseData);
 * ```
 */
export const createLoggingValidator = <A>(schema: Schema.Schema<A, unknown>) => {
    return (data: unknown): unknown => {
        pipe(
            validateWithSchema(schema, data, { strictMode: false }),
            Effect.catchAll((error) => {
                console.warn(`Validation warning: ${error.getSummary()}`);
                return Effect.succeed(data);
            })
        );
        return data;
    };
};
