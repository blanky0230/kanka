import { Effect, pipe } from "effect";
import {
    getInventories,
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory
} from "../api/inventory.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all inventory items for an entity
 */
export const getInventoriesExample = (entityId: number) => pipe(
    getInventories(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} inventory items for entity ${entityId}`)),
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
 * Example: Get an inventory item by ID for an entity
 */
export const getInventoryExample = (entityId: number, inventoryId: number) => pipe(
    getInventory(entityId, inventoryId),
    Effect.tap((response) => Effect.logInfo(`Inventory Item: ${response.data.amount} of item ${response.data.item_id}`)),
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
 * Example: Create a new inventory item for an entity
 */
export const createInventoryExample = (entityId: number, itemId: number) => pipe(
    createInventory(entityId, {
        item_id: itemId,
        entity_id: entityId,
        amount: "1",
        position: "Backpack",
        visibility_id: 1, // Visible to all
    }),
    Effect.tap((response) => Effect.logInfo(`Created inventory item with ID: ${response.data.id}`)),
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
 * Example: Update an inventory item for an entity
 */
export const updateInventoryExample = (entityId: number, inventoryId: number) => pipe(
    updateInventory(entityId, inventoryId, {
        amount: "2",
        position: "Belt Pouch",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated inventory item with ID: ${response.data.id}`)),
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
 * Example: Delete an inventory item from an entity
 */
export const deleteInventoryExample = (entityId: number, inventoryId: number) => pipe(
    deleteInventory(entityId, inventoryId),
    Effect.tap(() => Effect.logInfo(`Deleted inventory item with ID: ${inventoryId}`)),
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
