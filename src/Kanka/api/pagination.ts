import { Effect, Stream, pipe } from "effect";
import { PaginatedResponse } from "../schemas/common.js";
import { KankaError } from "../errors.js";
import { KankaConfigTag } from "../config.js";

// Re-export the PaginatedResponse type for use in other modules
export type { PaginatedResponse };

/**
 * Options for pagination
 */
export interface PaginationOptions {
    /**
     * Starting page number (default: 1)
     */
    startPage?: number;

    /**
     * Maximum number of pages to fetch (default: unlimited)
     */
    maxPages?: number;

    /**
     * Whether to log progress (default: false)
     */
    logProgress?: boolean;
}

/**
 * Fetch all pages of a paginated response
 * 
 * @param getPage Function that fetches a page of results
 * @param options Pagination options
 * @returns An Effect that resolves to an array of all items
 * 
 * @example
 * ```typescript
 * const allCharacters = await pipe(
 *   fetchAllPages((page) => getCharacters({ page })),
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const fetchAllPages = <T, R = never>(
    getPage: (page: number) => Effect.Effect<PaginatedResponse<T>, KankaError, R>,
    options: PaginationOptions = {}
): Effect.Effect<T[], KankaError, R | KankaConfigTag> => {
    const { startPage = 1, maxPages = Number.MAX_SAFE_INTEGER, logProgress = false } = options;

    // Recursive function to fetch pages
    const fetchPage = (
        page: number,
        acc: T[] = [],
        pagesProcessed = 0
    ): Effect.Effect<T[], KankaError, R | KankaConfigTag> =>
        pipe(
            getPage(page),
            Effect.tap(response =>
                logProgress
                    ? Effect.logInfo(`Fetched page ${page}/${response.meta.last_page} (${response.data.length} items)`)
                    : Effect.succeed(undefined)
            ),
            Effect.flatMap(response => {
                const newAcc = [...acc, ...response.data];
                const newPagesProcessed = pagesProcessed + 1;

                // Check if we should continue fetching
                const hasMorePages = page < response.meta.last_page;
                const underMaxPages = newPagesProcessed < maxPages;

                if (hasMorePages && underMaxPages) {
                    return fetchPage(page + 1, newAcc, newPagesProcessed);
                }

                return Effect.succeed(newAcc);
            })
        );

    return fetchPage(startPage);
};

/**
 * Stream all pages of a paginated response
 * 
 * @param getPage Function that fetches a page of results
 * @param options Pagination options
 * @returns A Stream of all items
 * 
 * @example
 * ```typescript
 * const characterStream = streamAllPages((page) => getCharacters({ page }));
 * 
 * // Process items one by one
 * await pipe(
 *   characterStream,
 *   Stream.tap(character => Effect.logInfo(`Processing ${character.name}`)),
 *   Stream.runDrain,
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const streamAllPages = <T, R = never>(
    getPage: (page: number) => Effect.Effect<PaginatedResponse<T>, KankaError, R>,
    options: PaginationOptions = {}
): Stream.Stream<T, KankaError, R | KankaConfigTag> => {
    const { startPage = 1, maxPages = Number.MAX_SAFE_INTEGER, logProgress = false } = options;

    // Create a recursive function to generate the stream of pages
    const fetchPageStream = (
        page: number,
        pagesProcessed: number
    ): Stream.Stream<T, KankaError, R | KankaConfigTag> => {
        // Check if we've reached the maximum number of pages
        if (pagesProcessed >= maxPages) {
            return Stream.empty;
        }

        return pipe(
            // Fetch the current page
            getPage(page),
            // Convert to a stream
            Stream.fromEffect,
            // Log progress if enabled
            Stream.tap(response =>
                logProgress
                    ? Effect.logInfo(`Fetched page ${page}/${response.meta.last_page} (${response.data.length} items)`)
                    : Effect.succeed(undefined)
            ),
            // Process the response
            Stream.flatMap(response => {
                // Extract the items from the current page
                const items = response.data;
                const currentPage = response.meta.current_page;
                const lastPage = response.meta.last_page;

                // Create a stream of the current page's items
                const currentPageStream = Stream.fromIterable(items);

                // Check if there are more pages to fetch
                const hasMorePages = currentPage < lastPage;

                if (hasMorePages && pagesProcessed + 1 < maxPages) {
                    // Concatenate with the stream of the next page
                    return Stream.concat(
                        currentPageStream,
                        fetchPageStream(page + 1, pagesProcessed + 1)
                    );
                }

                // Return just the current page's items
                return currentPageStream;
            })
        );
    };

    // Start fetching from the specified page
    return fetchPageStream(startPage, 0);
};

/**
 * Fetch a specific range of pages
 * 
 * @param getPage Function that fetches a page of results
 * @param startPage First page to fetch
 * @param endPage Last page to fetch (inclusive)
 * @returns An Effect that resolves to an array of items from the specified pages
 * 
 * @example
 * ```typescript
 * const charactersPage2to5 = await pipe(
 *   fetchPageRange((page) => getCharacters({ page }), 2, 5),
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const fetchPageRange = <T, R = never>(
    getPage: (page: number) => Effect.Effect<PaginatedResponse<T>, KankaError, R>,
    startPage: number,
    endPage: number
): Effect.Effect<T[], KankaError, R | KankaConfigTag> => {
    return fetchAllPages(getPage, { startPage, maxPages: endPage - startPage + 1 });
};

/**
 * Create a paginator for navigating through paginated results
 * 
 * @param getPage Function that fetches a page of results
 * @returns A paginator object with methods for navigating through pages
 * 
 * @example
 * ```typescript
 * const paginator = createPaginator((page) => getCharacters({ page }));
 * 
 * // Get the first page
 * const firstPage = await pipe(
 *   paginator.first(),
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * 
 * // Get the next page
 * const nextPage = await pipe(
 *   paginator.next(),
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const createPaginator = <T, R = never>(
    getPage: (page: number) => Effect.Effect<PaginatedResponse<T>, KankaError, R>
) => {
    // State to track current page and pagination metadata
    let currentPage = 0;
    let lastPage = 0;
    let totalItems = 0;

    // Get the current state
    const getState = () => ({
        currentPage,
        lastPage,
        totalItems,
        hasNext: currentPage < lastPage,
        hasPrevious: currentPage > 1
    });

    // Update state from response
    const updateState = (response: PaginatedResponse<T>) => {
        currentPage = response.meta.current_page;
        lastPage = response.meta.last_page;
        totalItems = response.meta.total;
        return response;
    };

    return {
        /**
         * Get the current pagination state
         */
        getState,

        /**
         * Get the first page
         */
        first: (): Effect.Effect<PaginatedResponse<T>, KankaError, R> =>
            pipe(
                getPage(1),
                Effect.map(updateState)
            ),

        /**
         * Get the last page
         */
        last: (): Effect.Effect<PaginatedResponse<T>, KankaError, R> =>
            pipe(
                // First get page 1 to determine the last page number
                getPage(1),
                Effect.tap(updateState),
                Effect.flatMap(response => {
                    if (response.meta.last_page === 1) {
                        return Effect.succeed(response);
                    }
                    return pipe(
                        getPage(response.meta.last_page),
                        Effect.map(updateState)
                    );
                })
            ),

        /**
         * Get the next page
         */
        next: (): Effect.Effect<PaginatedResponse<T>, KankaError, R> =>
            pipe(
                Effect.succeed(getState()),
                Effect.flatMap(state => {
                    if (state.currentPage === 0) {
                        // If we haven't fetched any pages yet, get the first page
                        return pipe(
                            getPage(1),
                            Effect.map(updateState)
                        );
                    }

                    if (!state.hasNext) {
                        return Effect.fail(new KankaError({
                            message: `Already at the last page (${state.lastPage})`
                        }));
                    }

                    return pipe(
                        getPage(state.currentPage + 1),
                        Effect.map(updateState)
                    );
                })
            ),

        /**
         * Get the previous page
         */
        previous: (): Effect.Effect<PaginatedResponse<T>, KankaError, R> =>
            pipe(
                Effect.succeed(getState()),
                Effect.flatMap(state => {
                    if (state.currentPage <= 1) {
                        return Effect.fail(new KankaError({
                            message: "Already at the first page"
                        }));
                    }

                    return pipe(
                        getPage(state.currentPage - 1),
                        Effect.map(updateState)
                    );
                })
            ),

        /**
         * Go to a specific page
         */
        goToPage: (page: number): Effect.Effect<PaginatedResponse<T>, KankaError, R> =>
            pipe(
                getPage(page),
                Effect.map(updateState)
            ),

        /**
         * Fetch all remaining pages starting from the current page
         */
        fetchRemaining: (): Effect.Effect<T[], KankaError, R | KankaConfigTag> =>
            pipe(
                Effect.succeed(getState()),
                Effect.flatMap(state => {
                    const startPage = state.currentPage > 0 ? state.currentPage + 1 : 1;
                    return fetchAllPages(getPage, { startPage });
                })
            ),

        /**
         * Stream all remaining pages starting from the current page
         */
        streamRemaining: (): Stream.Stream<T, KankaError, R | KankaConfigTag> => {
            const state = getState();
            const startPage = state.currentPage > 0 ? state.currentPage + 1 : 1;
            return streamAllPages(getPage, { startPage });
        }
    };
};

/**
 * Fetch all pages of a paginated response with automatic retries for failed pages
 * 
 * @param getPage Function that fetches a page of results
 * @param options Pagination options
 * @returns An Effect that resolves to an array of all items
 * 
 * @example
 * ```typescript
 * const allCharacters = await pipe(
 *   fetchAllPagesWithRetry((page) => getCharacters({ page })),
 *   Effect.provide(configFromEnv),
 *   Effect.runPromise
 * );
 * ```
 */
export const fetchAllPagesWithRetry = <T, R = never>(
    getPage: (page: number) => Effect.Effect<PaginatedResponse<T>, KankaError, R>,
    options: PaginationOptions & { maxRetries?: number; retryDelay?: number } = {}
): Effect.Effect<T[], KankaError, R | KankaConfigTag> => {
    const {
        startPage = 1,
        maxPages = Number.MAX_SAFE_INTEGER,
        logProgress = false,
        maxRetries = 3,
        retryDelay = 1000
    } = options;

    // Function to fetch a single page with retries
    const fetchPageWithRetry = (page: number, retries = 0): Effect.Effect<PaginatedResponse<T>, KankaError, R> =>
        pipe(
            getPage(page),
            Effect.catchAll(error => {
                if (retries < maxRetries) {
                    return pipe(
                        Effect.logWarning(`Error fetching page ${page}, retrying (${retries + 1}/${maxRetries}): ${error.message}`),
                        Effect.flatMap(() => Effect.sleep(retryDelay)),
                        Effect.flatMap(() => fetchPageWithRetry(page, retries + 1))
                    );
                }
                return Effect.fail(error);
            })
        );

    // Recursive function to fetch pages
    const fetchPages = (
        page: number,
        acc: T[] = [],
        pagesProcessed = 0
    ): Effect.Effect<T[], KankaError, R | KankaConfigTag> =>
        pipe(
            fetchPageWithRetry(page),
            Effect.tap(response =>
                logProgress
                    ? Effect.logInfo(`Fetched page ${page}/${response.meta.last_page} (${response.data.length} items)`)
                    : Effect.succeed(undefined)
            ),
            Effect.flatMap(response => {
                const newAcc = [...acc, ...response.data];
                const newPagesProcessed = pagesProcessed + 1;

                // Check if we should continue fetching
                const hasMorePages = page < response.meta.last_page;
                const underMaxPages = newPagesProcessed < maxPages;

                if (hasMorePages && underMaxPages) {
                    return fetchPages(page + 1, newAcc, newPagesProcessed);
                }

                return Effect.succeed(newAcc);
            })
        );

    return fetchPages(startPage);
};
