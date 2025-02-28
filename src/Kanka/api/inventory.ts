import {
    KankaInventory,
    CreateInventoryParams,
    UpdateInventoryParams,
} from "../schemas/inventory.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all inventory items for an entity
 */
export const getInventories = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaInventory>>(`entities/${entityId}/inventories`, queryParams);
};

/**
 * Get an inventory item by ID for an entity
 */
export const getInventory = (entityId: number, inventoryId: number) => {
    return get<SingleResponse<KankaInventory>>(`entities/${entityId}/inventories/${inventoryId}`);
};

/**
 * Create a new inventory item for an entity
 */
export const createInventory = (entityId: number, params: CreateInventoryParams) => {
    return post<SingleResponse<KankaInventory>>(`entities/${entityId}/inventories`, params);
};

/**
 * Update an inventory item for an entity
 */
export const updateInventory = (entityId: number, inventoryId: number, params: UpdateInventoryParams) => {
    return put<SingleResponse<KankaInventory>>(`entities/${entityId}/inventories/${inventoryId}`, params);
};

/**
 * Delete an inventory item from an entity
 */
export const deleteInventory = (entityId: number, inventoryId: number) => {
    return del<void>(`entities/${entityId}/inventories/${inventoryId}`);
};
