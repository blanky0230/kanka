import { Effect, pipe } from "effect";
import { getItem, getItems, createItem, updateItem, deleteItem } from "../api/items.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all items
 */
export const getAllItemsExample = pipe(
    getItems(),
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
 * Example: Get an item by ID
 */
export const getItemExample = (itemId: number) => pipe(
    getItem(itemId),
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
 * Example: Create a new item
 */
export const createItemExample = pipe(
    createItem({
        name: "New Item",
        entry: "This is a test item created with the Kanka API client",
        type: "Weapon",
        price: "25 gp",
        size: "30 in.",
        weight: "1 lb.",
        is_private: false,
    }),
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
 * Example: Update an item
 */
export const updateItemExample = (itemId: number) => pipe(
    updateItem(itemId, {
        name: "Updated Item",
        entry: "This is an updated item",
        price: "30 gp",
    }),
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
 * Example: Delete an item
 */
export const deleteItemExample = (itemId: number) => pipe(
    deleteItem(itemId),
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
