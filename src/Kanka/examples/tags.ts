import { Effect, pipe } from "effect";
import { getTag, getTags, createTag, updateTag, deleteTag } from "../api/tags.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all tags
 */
export const getAllTagsExample = pipe(
    getTags(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} tags`)),
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
 * Example: Get a tag by ID
 */
export const getTagExample = (tagId: number) => pipe(
    getTag(tagId),
    Effect.tap((response) => Effect.logInfo(`Tag: ${response.data.name}`)),
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
 * Example: Create a new tag
 */
export const createTagExample = pipe(
    createTag({
        name: "New Tag",
        entry: "This is a test tag created with the Kanka API client",
        type: "Lore",
        colour: "green",
        is_private: false,
        is_auto_applied: false,
        is_hidden: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created tag: ${response.data.name}`)),
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
 * Example: Update a tag
 */
export const updateTagExample = (tagId: number) => pipe(
    updateTag(tagId, {
        name: "Updated Tag",
        entry: "This is an updated tag",
        colour: "blue",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated tag: ${response.data.name}`)),
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
 * Example: Delete a tag
 */
export const deleteTagExample = (tagId: number) => pipe(
    deleteTag(tagId),
    Effect.tap(() => Effect.logInfo(`Deleted tag with ID: ${tagId}`)),
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
