import { Effect, pipe } from "effect";
import { getItemsFactory, getItemFactory, createItemFactory, updateItemFactory, deleteItemFactory } from "../api/items-factory.js";
import { CreateItemParams, UpdateItemParams } from "../schemas/items.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all items using the factory API
 */
export const getAllItemsFactoryExample = pipe(
    getItemsFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} items`)),
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
 * Example: Get all items with filtering
 */
export const getFilteredItemsExample = pipe(
    getItemsFactory({
        name: "Excalibur",
        is_private: false,
        type: "Weapon",
        tags: [1, 2, 3], // Replace with real tag IDs
        location_id: 4, // Replace with real location ID
        character_id: 5, // Replace with real character ID
        item_id: 6, // Replace with real parent item ID
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered items`)),
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
 * Example: Get an item by ID using the factory API
 */
export const getItemFactoryExample = (itemId: number) => pipe(
    getItemFactory(itemId),
    Effect.tap((response) => Effect.logInfo(`Item: ${response.data.name}`)),
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
 * Example: Create a new item using the factory API
 */
export const createItemFactoryExample = pipe(
    createItemFactory({
        name: "New Item",
        entry: "This is a test item created with the Kanka API client factory",
        type: "Weapon",
        price: "25 gp",
        size: "30 in.",
        weight: "1 lb.",
        is_private: false,
    } as CreateItemParams),
    Effect.tap((response) => Effect.logInfo(`Created item: ${response.data.name}`)),
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
 * Example: Update an item using the factory API
 */
export const updateItemFactoryExample = (itemId: number) => pipe(
    updateItemFactory(itemId, {
        name: "Updated Item",
        entry: "This is an updated item using the factory API",
        price: "30 gp",
    } as UpdateItemParams),
    Effect.tap((response) => Effect.logInfo(`Updated item: ${response.data.name}`)),
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
 * Example: Delete an item using the factory API
 */
export const deleteItemFactoryExample = (itemId: number) => pipe(
    deleteItemFactory(itemId),
    Effect.tap(() => Effect.logInfo(`Deleted item with ID: ${itemId}`)),
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
 * Run all item examples
 */
export const runItemExamples = async () => {
    // Get all items
    await Effect.runPromise(getAllItemsFactoryExample);

    // Get filtered items
    await Effect.runPromise(getFilteredItemsExample);

    // Get a specific item (replace with a real item ID)
    // await Effect.runPromise(getItemFactoryExample(123));

    // Create a new item
    // await Effect.runPromise(createItemFactoryExample);

    // Update an item (replace with a real item ID)
    // await Effect.runPromise(updateItemFactoryExample(123));

    // Delete an item (replace with a real item ID)
    // await Effect.runPromise(deleteItemFactoryExample(123));
};
