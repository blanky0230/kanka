import { Effect, pipe } from "effect";
import { getBookmarks, getBookmark, createBookmark, updateBookmark, deleteBookmark } from "../api/bookmarks.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all bookmarks
 */
export const getAllBookmarksExample = pipe(
    getBookmarks(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} bookmarks`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Get a bookmark by ID
 */
export const getBookmarkExample = (bookmarkId: number) => pipe(
    getBookmark(bookmarkId),
    Effect.tap((response) => Effect.logInfo(`Bookmark: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a bookmark for an entity
 */
export const createEntityBookmarkExample = (entityId: number, name: string) => pipe(
    createBookmark({
        name,
        entity_id: entityId,
    }),
    Effect.tap((response) => Effect.logInfo(`Created bookmark: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a random entity bookmark
 */
export const createRandomEntityBookmarkExample = (entityType: string, name: string) => pipe(
    createBookmark({
        name,
        random_entity_type: entityType,
    }),
    Effect.tap((response) => Effect.logInfo(`Created random ${entityType} bookmark: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Update a bookmark
 */
export const updateBookmarkExample = (bookmarkId: number, name: string) => pipe(
    updateBookmark(bookmarkId, {
        name,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated bookmark: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Delete a bookmark
 */
export const deleteBookmarkExample = (bookmarkId: number) => pipe(
    deleteBookmark(bookmarkId),
    Effect.tap(() => Effect.logInfo(`Deleted bookmark with ID: ${bookmarkId}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);
