import { Effect, pipe } from "effect";
import {
    getEntityInventories,
    getEntityInventory,
    createEntityInventory,
    updateEntityInventory,
    deleteEntityInventory
} from "../api/entity-inventory.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all inventory items for an entity
 */
export const getEntityInventoriesExample = (entityId: number) => pipe(
    getEntityInventories(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entity inventory items for entity ${entityId}`)),
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
export const getEntityInventoryExample = (entityId: number, inventoryId: number) => pipe(
    getEntityInventory(entityId, inventoryId),
    Effect.tap((response) => Effect.logInfo(`Entity Inventory Item: ${response.data.amount} of item ${response.data.item_id}`)),
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
export const createEntityInventoryExample = (entityId: number, itemId: number) => pipe(
    createEntityInventory(entityId, {
        item_id: itemId,
        entity_id: entityId,
        amount: "1",
        position: "Backpack",
        visibility: "all",
        is_equipped: false
    }),
    Effect.tap((response) => Effect.logInfo(`Created entity inventory item with ID: ${response.data.id}`)),
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
 * Example: Create a new inventory item with a custom name for an entity
 */
export const createEntityInventoryWithNameExample = (entityId: number) => pipe(
    createEntityInventory(entityId, {
        name: "Custom Item",
        entity_id: entityId,
        amount: "1",
        position: "Belt Pouch",
        visibility: "all",
        is_equipped: true
    }),
    Effect.tap((response) => Effect.logInfo(`Created custom entity inventory item with ID: ${response.data.id}`)),
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
export const updateEntityInventoryExample = (entityId: number, inventoryId: number) => pipe(
    updateEntityInventory(entityId, inventoryId, {
        amount: "2",
        position: "Belt Pouch",
        is_equipped: true
    }),
    Effect.tap((response) => Effect.logInfo(`Updated entity inventory item with ID: ${response.data.id}`)),
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
export const deleteEntityInventoryExample = (entityId: number, inventoryId: number) => pipe(
    deleteEntityInventory(entityId, inventoryId),
    Effect.tap(() => Effect.logInfo(`Deleted entity inventory item with ID: ${inventoryId}`)),
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
