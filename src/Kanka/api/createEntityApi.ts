import { Schema, Effect, pipe } from "effect";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";
import { KankaError } from "../errors.js";
import { KankaConfigTag } from "../config.js";
import { validateWithSchema, KankaSchemaValidationError } from "./validation.js";

/**
 * Common parameters for listing entities
 */
export interface EntityListParams {
    /**
     * Page number for pagination
     */
    page?: number;

    /**
     * Number of items per page
     */
    perPage?: number;

    /**
     * Filter by name
     */
    name?: string;

    /**
     * Filter by privacy status
     */
    is_private?: boolean;

    /**
     * Filter by creator
     */
    created_by?: number;

    /**
     * Filter by last updater
     */
    updated_by?: number;

    /**
     * Filter by tags
     */
    tags?: number[];

    /**
     * Last sync timestamp for efficient data synchronization
     */
    lastSync?: string;
}

/**
 * Options for creating an entity API
 */
export interface EntityApiOptions<T, CreateParams = unknown, UpdateParams = unknown> {
    /**
     * Base path for API requests (e.g., "characters")
     */
    basePath: string;

    /**
     * Schema for validation (optional)
     */
    schema?: Schema.Schema<T, unknown>;

    /**
     * Schema for validating create parameters (optional)
     */
    createParamsSchema?: Schema.Schema<CreateParams, unknown>;

    /**
     * Schema for validating update parameters (optional)
     */
    updateParamsSchema?: Schema.Schema<UpdateParams, unknown>;

    /**
     * Custom query parameter transformer (optional)
     */
    transformQueryParams?: (params: Record<string, unknown>) => Record<string, string | number | boolean | undefined>;

    /**
     * Whether to enable schema validation (default: true)
     */
    enableValidation?: boolean;
}

/**
 * Entity API interface with standard CRUD operations
 */
export interface EntityApi<T, CreateParams, UpdateParams> {
    /**
     * Get all entities with pagination and filtering
     */
    getAll: (params?: EntityListParams & Record<string, unknown>) => Effect.Effect<PaginatedResponse<T>, KankaError, KankaConfigTag>;

    /**
     * Get a single entity by ID
     */
    getOne: (id: number) => Effect.Effect<SingleResponse<T>, KankaError, KankaConfigTag>;

    /**
     * Create a new entity
     */
    create: (params: CreateParams) => Effect.Effect<SingleResponse<T>, KankaError, KankaConfigTag>;

    /**
     * Update an existing entity
     */
    update: (id: number, params: UpdateParams) => Effect.Effect<SingleResponse<T>, KankaError, KankaConfigTag>;

    /**
     * Delete an entity
     */
    delete: (id: number) => Effect.Effect<void, KankaError, KankaConfigTag>;
}

/**
 * Default query parameter transformer
 * Converts common parameters to the format expected by the API
 */
const defaultTransformQueryParams = (params?: Record<string, unknown>): Record<string, string | number | boolean | undefined> => {
    if (!params) return {};

    const queryParams: Record<string, string | number | boolean | undefined> = {};

    // Handle standard parameters
    if (typeof params.page === 'number') queryParams.page = params.page;
    if (typeof params.perPage === 'number') queryParams.per_page = params.perPage;
    if (typeof params.name === 'string') queryParams.name = params.name;
    if (typeof params.is_private === 'boolean') queryParams.is_private = params.is_private;
    if (typeof params.created_by === 'number') queryParams.created_by = params.created_by;
    if (typeof params.updated_by === 'number') queryParams.updated_by = params.updated_by;
    if (typeof params.lastSync === 'string') queryParams.lastSync = params.lastSync;

    // Add any other properties that aren't specially handled
    Object.entries(params).forEach(([key, value]) => {
        if (
            key !== 'page' &&
            key !== 'perPage' &&
            key !== 'name' &&
            key !== 'is_private' &&
            key !== 'created_by' &&
            key !== 'updated_by' &&
            key !== 'tags' &&
            key !== 'lastSync'
        ) {
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === undefined) {
                queryParams[key] = value;
            }
        }
    });

    // Add tags as individual query parameters if present
    const tags = params.tags;
    if (tags && Array.isArray(tags) && tags.length > 0) {
        tags.forEach((tag, index) => {
            if (typeof tag === 'number') {
                queryParams[`tags[${index}]`] = tag;
            }
        });
    }

    return queryParams;
};

/**
 * Creates a standard API interface for an entity type
 * 
 * @param options Configuration options for the entity API
 * @returns An object with standard CRUD operations for the entity type
 * 
 * @example
 * ```typescript
 * const characterApi = createEntityApi<Character, CreateCharacterParams, UpdateCharacterParams>({
 *   basePath: "characters",
 *   schema: CharacterSchema,
 *   createParamsSchema: CreateCharacterParamsSchema,
 *   updateParamsSchema: UpdateCharacterParamsSchema,
 *   enableValidation: true,
 * });
 * 
 * export const getCharacters = characterApi.getAll;
 * export const getCharacter = characterApi.getOne;
 * export const createCharacter = characterApi.create;
 * export const updateCharacter = characterApi.update;
 * export const deleteCharacter = characterApi.delete;
 * ```
 */
export const createEntityApi = <T, CreateParams = unknown, UpdateParams = unknown>(
    options: EntityApiOptions<T, CreateParams, UpdateParams>
): EntityApi<T, CreateParams, UpdateParams> => {
    const {
        basePath,
        schema,
        createParamsSchema,
        updateParamsSchema,
        transformQueryParams = defaultTransformQueryParams,
        enableValidation = true
    } = options;


    /**
     * Validate data with schema if provided and validation is enabled
     * Uses the enhanced validation functions from validation.ts
     */
    const validateData = <D>(data: D, validationSchema?: unknown): Effect.Effect<D, KankaError> => {
        if (!validationSchema || !enableValidation) {
            return Effect.succeed(data);
        }

        // Use type assertion to handle schema type compatibility
        const schema = validationSchema as Schema.Schema<unknown, unknown>;

        return pipe(
            // Use the enhanced validateWithSchema function with caching
            validateWithSchema(schema, data, {
                useCache: true,
                strictMode: false,
                errorHandler: (error) => error
            }),
            // Map the validated data back to the original data to preserve type information
            Effect.map(() => data),
            // Convert validation errors to KankaError
            Effect.catchAll((error) => {
                if (error instanceof KankaSchemaValidationError) {
                    return Effect.fail(error);
                }
                return Effect.fail(new KankaError({
                    message: `Schema validation failed: ${String(error)}`,
                    cause: error
                }));
            })
        );
    };

    /**
     * Convert specific errors to KankaError
     */
    const wrapWithKankaError = <E, A, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, KankaError, R> => {
        return pipe(
            effect,
            Effect.catchAll((error) => {
                if (error instanceof KankaError) {
                    return Effect.fail(error);
                }
                return Effect.fail(
                    new KankaError({
                        message: `API error: ${String(error)}`,
                        cause: error
                    })
                );
            })
        );
    };

    /**
     * Get all entities with optional filtering
     */
    const getAll = (params?: EntityListParams & Record<string, unknown>) => {
        const queryParams = transformQueryParams(params || {});
        return pipe(
            get<PaginatedResponse<T>>(basePath, queryParams),
            Effect.flatMap(response => {
                // Validate response data if schema is provided and validation is enabled
                if (schema && enableValidation) {
                    return pipe(
                        validateData(response.data, Schema.Array(schema)),
                        Effect.map(() => response)
                    );
                }
                return Effect.succeed(response);
            }),
            wrapWithKankaError
        );
    };

    /**
     * Get a single entity by ID
     */
    const getOne = (id: number) => {
        return pipe(
            get<SingleResponse<T>>(`${basePath}/${id}`),
            Effect.flatMap(response => {
                // Validate response data if schema is provided and validation is enabled
                if (schema && enableValidation) {
                    return pipe(
                        validateData(response.data, schema),
                        Effect.map(() => response)
                    );
                }
                return Effect.succeed(response);
            }),
            wrapWithKankaError
        );
    };

    /**
     * Create a new entity
     */
    const create = (params: CreateParams) => {
        return pipe(
            // Validate request parameters if schema is provided and validation is enabled
            createParamsSchema && enableValidation
                ? validateData(params, createParamsSchema)
                : Effect.succeed(params),
            Effect.flatMap(validatedParams =>
                post<SingleResponse<T>>(basePath, validatedParams)
            ),
            Effect.flatMap(response => {
                // Validate response data if schema is provided and validation is enabled
                if (schema && enableValidation) {
                    return pipe(
                        validateData(response.data, schema),
                        Effect.map(() => response)
                    );
                }
                return Effect.succeed(response);
            }),
            wrapWithKankaError
        );
    };

    /**
     * Update an existing entity
     */
    const update = (id: number, params: UpdateParams) => {
        return pipe(
            // Validate request parameters if schema is provided and validation is enabled
            updateParamsSchema && enableValidation
                ? validateData(params, updateParamsSchema)
                : Effect.succeed(params),
            Effect.flatMap(validatedParams =>
                put<SingleResponse<T>>(`${basePath}/${id}`, validatedParams)
            ),
            Effect.flatMap(response => {
                // Validate response data if schema is provided and validation is enabled
                if (schema && enableValidation) {
                    return pipe(
                        validateData(response.data, schema),
                        Effect.map(() => response)
                    );
                }
                return Effect.succeed(response);
            }),
            wrapWithKankaError
        );
    };

    /**
     * Delete an entity
     */
    const deleteEntity = (id: number) => {
        return pipe(
            del<void>(`${basePath}/${id}`),
            wrapWithKankaError
        );
    };

    return {
        getAll,
        getOne,
        create,
        update,
        delete: deleteEntity,
    };
};
