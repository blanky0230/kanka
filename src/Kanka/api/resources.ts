import { Effect, Stream, pipe } from "effect";
import { KankaError } from "../errors.js";
import { KankaConfigTag } from "../config.js";
import { createErrorHandler } from "./errorHandlers.js";
import { Middleware, combineMiddlewares } from "./middleware.js";
import { fetchAllPages, fetchPageRange, streamAllPages, PaginationOptions, PaginatedResponse } from "./pagination.js";

/**
 * Base interface for all resource APIs
 */
export interface ResourceApi<Resource, CreateParams, UpdateParams, QueryParams, R = never> {
    /**
     * Get a single resource by ID
     */
    get: (id: number, params?: QueryParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;

    /**
     * Get all resources (paginated)
     */
    getAll: (params?: QueryParams & { page?: number }) => Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;

    /**
     * Get all resources as a stream (for processing large datasets)
     */
    getAllAsStream: (params?: QueryParams, paginationOptions?: PaginationOptions) => Stream.Stream<Resource, KankaError, R | KankaConfigTag>;

    /**
     * Collect all resources from a stream into an array
     */
    getAllAsArray: (params?: QueryParams, paginationOptions?: PaginationOptions) => Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;

    /**
     * Create a new resource
     */
    create: (params: CreateParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;

    /**
     * Update an existing resource
     */
    update: (id: number, params: UpdateParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;

    /**
     * Delete a resource
     */
    delete: (id: number) => Effect.Effect<void, KankaError, R | KankaConfigTag>;

    /**
     * Get a specific page of resources
     */
    getPage: (page: number, params?: QueryParams) => Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;

    /**
     * Get a range of pages
     */
    getPageRange: (startPage: number, endPage: number, params?: QueryParams) => Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;

    /**
     * Apply middleware to this resource API
     */
    withMiddleware: (middlewares: ReadonlyArray<Middleware<R>>) => ResourceApi<Resource, CreateParams, UpdateParams, QueryParams, R>;

    /**
     * Apply error handling to this resource API
     */
    withErrorHandler: (options: {
        retry?: { maxRetries?: number } | false;
        timeout?: number | false;
        logging?: { logLevel?: 'debug' | 'info' | 'warn' | 'error' } | false;
        fallback?: Resource | Resource[] | void | ((error: KankaError) => Effect.Effect<Resource | Resource[] | void, never, never>) | false;
    }) => ResourceApi<Resource, CreateParams, UpdateParams, QueryParams, R>;
}

/**
 * Create a resource API for a specific entity type
 * 
 * @param resourceName The name of the resource (e.g., "characters", "locations")
 * @param baseApi The base API functions for the resource
 * @returns A ResourceApi instance for the specified resource
 */
export const createResourceApi = <Resource, CreateParams, UpdateParams, QueryParams, R = never>(
    resourceName: string,
    baseApi: {
        get: (id: number, params?: QueryParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
        getAll: (params?: QueryParams & { page?: number }) => Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;
        create: (params: CreateParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
        update: (id: number, params: UpdateParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
        delete: (id: number) => Effect.Effect<void, KankaError, R | KankaConfigTag>;
    }
): ResourceApi<Resource, CreateParams, UpdateParams, QueryParams, R> => {
    // Create the base resource API
    const api: ResourceApi<Resource, CreateParams, UpdateParams, QueryParams, R> = {
        // Pass through the base API functions
        get: baseApi.get,
        getAll: baseApi.getAll,
        create: baseApi.create,
        update: baseApi.update,
        delete: baseApi.delete,

        // Add pagination helpers
        getAllAsStream: (params?: QueryParams, paginationOptions?: PaginationOptions) => {
            // Create a function that converts the array response to a paginated response
            const getPageAsPaginated = (page: number): Effect.Effect<PaginatedResponse<Resource>, KankaError, R | KankaConfigTag> => {
                return pipe(
                    baseApi.getAll({ ...params, page } as QueryParams & { page: number }),
                    Effect.map(resources => ({
                        data: resources,
                        meta: {
                            current_page: page,
                            from: 1,
                            last_page: 1, // This will be updated by the actual response
                            path: "",
                            per_page: resources.length,
                            to: resources.length,
                            total: resources.length
                        },
                        links: {
                            first: "",
                            last: "",
                            prev: null,
                            next: null
                        },
                        sync: new Date().toISOString()
                    } as PaginatedResponse<Resource>))
                );
            };

            return streamAllPages<Resource, R | KankaConfigTag>(getPageAsPaginated, paginationOptions);
        },

        getAllAsArray: (params?: QueryParams, paginationOptions?: PaginationOptions) => {
            return pipe(
                api.getAllAsStream(params, paginationOptions),
                Stream.runCollect,
                Effect.map(chunk => Array.from(chunk))
            );
        },

        getPage: (page: number, params?: QueryParams) => {
            return baseApi.getAll({ ...params, page } as QueryParams & { page: number });
        },

        getPageRange: (startPage: number, endPage: number, params?: QueryParams) => {
            // Create a function that converts the array response to a paginated response
            const getPageAsPaginated = (page: number): Effect.Effect<PaginatedResponse<Resource>, KankaError, R | KankaConfigTag> => {
                return pipe(
                    baseApi.getAll({ ...params, page } as QueryParams & { page: number }),
                    Effect.map(resources => ({
                        data: resources,
                        meta: {
                            current_page: page,
                            from: 1,
                            last_page: endPage, // We know the last page from the parameters
                            path: "",
                            per_page: resources.length,
                            to: resources.length,
                            total: resources.length * (endPage - startPage + 1) // Estimate total
                        },
                        links: {
                            first: "",
                            last: "",
                            prev: null,
                            next: null
                        },
                        sync: new Date().toISOString()
                    } as PaginatedResponse<Resource>))
                );
            };

            return fetchPageRange(getPageAsPaginated, startPage, endPage);
        },

        // Add middleware support
        withMiddleware: (middlewares: ReadonlyArray<Middleware<R>>) => {
            // Combine middlewares into a single middleware
            const combinedMiddleware = combineMiddlewares(middlewares);

            // Create a new API instance with middleware applied
            return createResourceApi(resourceName, {
                get: (id, params) => {
                    // Apply middleware to the get function
                    return combinedMiddleware(baseApi.get(id, params));
                },
                getAll: (params) => {
                    // Apply middleware to the getAll function
                    return combinedMiddleware(baseApi.getAll(params));
                },
                create: (params) => {
                    // Apply middleware to the create function
                    return combinedMiddleware(baseApi.create(params));
                },
                update: (id, params) => {
                    // Apply middleware to the update function
                    return combinedMiddleware(baseApi.update(id, params));
                },
                delete: (id) => {
                    // Apply middleware to the delete function
                    return combinedMiddleware(baseApi.delete(id));
                }
            });
        },

        // Add error handling
        withErrorHandler: (options) => {
            // Create a new API instance with error handling applied
            return createResourceApi<Resource, CreateParams, UpdateParams, QueryParams, R>(resourceName, {
                get: (id, params) => {
                    // Use type assertion to handle the error handler
                    const handler = createErrorHandler(options);
                    return handler(baseApi.get(id, params)) as Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
                },
                getAll: (params) => {
                    const handler = createErrorHandler(options);
                    return handler(baseApi.getAll(params)) as Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;
                },
                create: (params) => {
                    const handler = createErrorHandler(options);
                    return handler(baseApi.create(params)) as Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
                },
                update: (id, params) => {
                    const handler = createErrorHandler(options);
                    return handler(baseApi.update(id, params)) as Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
                },
                delete: (id) => {
                    const handler = createErrorHandler(options);
                    return handler(baseApi.delete(id)) as Effect.Effect<void, KankaError, R | KankaConfigTag>;
                }
            });
        }
    };

    return api;
};

/**
 * Create a resource API for a specific entity type with validation
 * 
 * @param resourceName The name of the resource (e.g., "characters", "locations")
 * @param baseApi The base API functions for the resource
 * @param validators Validation functions for create and update operations
 * @returns A ResourceApi instance for the specified resource with validation
 */
export const createValidatedResourceApi = <Resource, CreateParams, UpdateParams, QueryParams, R = never>(
    resourceName: string,
    baseApi: {
        get: (id: number, params?: QueryParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
        getAll: (params?: QueryParams & { page?: number }) => Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;
        create: (params: CreateParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
        update: (id: number, params: UpdateParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
        delete: (id: number) => Effect.Effect<void, KankaError, R | KankaConfigTag>;
    },
    validators: {
        validateCreate?: (params: CreateParams) => Effect.Effect<CreateParams, KankaError, never>;
        validateUpdate?: (params: UpdateParams) => Effect.Effect<UpdateParams, KankaError, never>;
    }
): ResourceApi<Resource, CreateParams, UpdateParams, QueryParams, R> => {
    // Create a new API with validation
    return createResourceApi(resourceName, {
        get: baseApi.get,
        getAll: baseApi.getAll,
        create: (params: CreateParams) => {
            // Apply validation if provided
            if (validators.validateCreate) {
                return pipe(
                    validators.validateCreate(params),
                    Effect.flatMap(validatedParams => baseApi.create(validatedParams))
                );
            }
            return baseApi.create(params);
        },
        update: (id: number, params: UpdateParams) => {
            // Apply validation if provided
            if (validators.validateUpdate) {
                return pipe(
                    validators.validateUpdate(params),
                    Effect.flatMap(validatedParams => baseApi.update(id, validatedParams))
                );
            }
            return baseApi.update(id, params);
        },
        delete: baseApi.delete
    });
};

/**
 * Create a read-only resource API for a specific entity type
 * 
 * @param resourceName The name of the resource (e.g., "characters", "locations")
 * @param baseApi The base API functions for the resource
 * @returns A read-only ResourceApi instance for the specified resource
 */
export const createReadOnlyResourceApi = <Resource, QueryParams, R = never>(
    resourceName: string,
    baseApi: {
        get: (id: number, params?: QueryParams) => Effect.Effect<Resource, KankaError, R | KankaConfigTag>;
        getAll: (params?: QueryParams & { page?: number }) => Effect.Effect<Resource[], KankaError, R | KankaConfigTag>;
    }
): Omit<ResourceApi<Resource, never, never, QueryParams, R>, 'create' | 'update' | 'delete'> & {
    create: never;
    update: never;
    delete: never;
} => {
    // Create a base resource API with unsupported write operations
    const api = createResourceApi(resourceName, {
        get: baseApi.get,
        getAll: baseApi.getAll,
        create: (_params: never) => {
            return Effect.fail(new KankaError({
                message: `Create operation not supported for read-only resource: ${resourceName}`
            }));
        },
        update: (_id: number, _params: never) => {
            return Effect.fail(new KankaError({
                message: `Update operation not supported for read-only resource: ${resourceName}`
            }));
        },
        delete: (_id: number) => {
            return Effect.fail(new KankaError({
                message: `Delete operation not supported for read-only resource: ${resourceName}`
            }));
        }
    });

    // Remove the write operations from the type
    return api as Omit<ResourceApi<Resource, never, never, QueryParams, R>, 'create' | 'update' | 'delete'> & {
        create: never;
        update: never;
        delete: never;
    };
};
