import { Effect, pipe } from "effect";
import { getTagsFactory, getTagFactory, createTagFactory, updateTagFactory, deleteTagFactory } from "../api/tags-factory.js";
import { CreateTagParams, UpdateTagParams } from "../schemas/tags.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all tags using the factory API
 */
export const getAllTagsFactoryExample = pipe(
    getTagsFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} tags`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all tags with filtering
 */
export const getFilteredTagsExample = pipe(
    getTagsFactory({
        name: "Important",
        is_private: false,
        type: "Lore",
        tag_id: 1, // Replace with real parent tag ID
        colour: "blue",
        is_auto_applied: false,
        is_hidden: false,
        tags: [1, 2, 3], // Replace with real tag IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered tags`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a tag by ID using the factory API
 */
export const getTagFactoryExample = (tagId: number) => pipe(
    getTagFactory(tagId),
    Effect.tap((response) => Effect.logInfo(`Tag: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new tag using the factory API
 */
export const createTagFactoryExample = pipe(
    createTagFactory({
        name: "New Tag",
        entry: "This is a test tag created with the Kanka API client factory",
        type: "Lore",
        colour: "green",
        is_private: false,
        is_auto_applied: false,
        is_hidden: false,
    } as CreateTagParams),
    Effect.tap((response) => Effect.logInfo(`Created tag: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a tag using the factory API
 */
export const updateTagFactoryExample = (tagId: number) => pipe(
    updateTagFactory(tagId, {
        name: "Updated Tag",
        entry: "This is an updated tag using the factory API",
        colour: "blue",
    } as UpdateTagParams),
    Effect.tap((response) => Effect.logInfo(`Updated tag: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a tag using the factory API
 */
export const deleteTagFactoryExample = (tagId: number) => pipe(
    deleteTagFactory(tagId),
    Effect.tap(() => Effect.logInfo(`Deleted tag with ID: ${tagId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all tag examples
 */
export const runTagExamples = async () => {
    // Get all tags
    await Effect.runPromise(getAllTagsFactoryExample);

    // Get filtered tags
    await Effect.runPromise(getFilteredTagsExample);

    // Get a specific tag (replace with a real tag ID)
    // await Effect.runPromise(getTagFactoryExample(123));

    // Create a new tag
    // await Effect.runPromise(createTagFactoryExample);

    // Update a tag (replace with a real tag ID)
    // await Effect.runPromise(updateTagFactoryExample(123));

    // Delete a tag (replace with a real tag ID)
    // await Effect.runPromise(deleteTagFactoryExample(123));
};
