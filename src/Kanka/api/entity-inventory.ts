import {
    KankaEntityInventory,
    CreateEntityInventoryParams,
    UpdateEntityInventoryParams,
} from "../schemas/entity-inventory.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all inventory items for an entity
 */
export const getEntityInventories = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaEntityInventory>>(`entities/${entityId}/inventory`, queryParams);
};

/**
 * Get an inventory item by ID for an entity
 */
export const getEntityInventory = (entityId: number, inventoryId: number) => {
    return get<SingleResponse<KankaEntityInventory>>(`entities/${entityId}/inventory/${inventoryId}`);
};

/**
 * Create a new inventory item for an entity
 */
export const createEntityInventory = (entityId: number, params: CreateEntityInventoryParams) => {
    return post<SingleResponse<KankaEntityInventory>>(`entities/${entityId}/inventory`, params);
};

/**
 * Update an inventory item for an entity
 */
export const updateEntityInventory = (entityId: number, inventoryId: number, params: UpdateEntityInventoryParams) => {
    return put<SingleResponse<KankaEntityInventory>>(`entities/${entityId}/inventory/${inventoryId}`, params);
};

/**
 * Delete an inventory item from an entity
 */
export const deleteEntityInventory = (entityId: number, inventoryId: number) => {
    return del<void>(`entities/${entityId}/entity_inventory/${inventoryId}`);
};
