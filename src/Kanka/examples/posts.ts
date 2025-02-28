import { Effect, pipe } from "effect";
import {
    getEntityPosts,
    getEntityPost,
    createEntityPost,
    updateEntityPost,
    deleteEntityPost,
    getDeletedPosts,
    recoverPosts
} from "../api/posts.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all posts for an entity
 */
export const getEntityPostsExample = (entityId: number) => pipe(
    getEntityPosts(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} posts for entity ${entityId}`)),
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
 * Example: Get a post by ID for an entity
 */
export const getEntityPostExample = (entityId: number, postId: number) => pipe(
    getEntityPost(entityId, postId),
    Effect.tap((response) => Effect.logInfo(`Post: ${response.data.name}`)),
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
 * Example: Create a new post for an entity
 */
export const createEntityPostExample = (entityId: number) => pipe(
    createEntityPost(entityId, {
        name: "New Post",
        entry: "This is a test post created with the Kanka API client",
        entity_id: entityId,
        visibility_id: 1, // Visible to all
    }),
    Effect.tap((response) => Effect.logInfo(`Created post: ${response.data.name}`)),
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
 * Example: Update a post for an entity
 */
export const updateEntityPostExample = (entityId: number, postId: number) => pipe(
    updateEntityPost(entityId, postId, {
        name: "Updated Post",
        entry: "This is an updated post",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated post: ${response.data.name}`)),
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
 * Example: Delete a post from an entity
 */
export const deleteEntityPostExample = (entityId: number, postId: number) => pipe(
    deleteEntityPost(entityId, postId),
    Effect.tap(() => Effect.logInfo(`Deleted post with ID: ${postId}`)),
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
 * Example: Get all deleted posts
 */
export const getDeletedPostsExample = pipe(
    getDeletedPosts(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} deleted posts`)),
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
 * Example: Recover deleted posts
 */
export const recoverPostsExample = (postIds: number[]) => pipe(
    recoverPosts(postIds),
    Effect.tap(() => Effect.logInfo(`Recovered posts with IDs: ${postIds.join(', ')}`)),
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
