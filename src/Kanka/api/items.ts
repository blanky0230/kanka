import {
    Item,
    CreateItemParams,
    UpdateItemParams,
} from "../schemas/items.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { LastSyncParams } from "../schemas/last-sync.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all items with optional filtering
 */
export const getItems = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    type?: string;
    location_id?: number;
    character_id?: number;
    item_id?: number;
    lastSync?: string; // Last sync timestamp
}) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        name: params?.name,
        is_private: params?.is_private,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        type: params?.type,
        location_id: params?.location_id,
        character_id: params?.character_id,
        item_id: params?.item_id,
        lastSync: params?.lastSync,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Item>>("items", queryParams);
};

/**
 * Get an item by ID
 */
export const getItem = (id: number) => {
    return get<SingleResponse<Item>>(`items/${id}`);
};

/**
 * Create a new item
 */
export const createItem = (params: CreateItemParams) => {
    return post<SingleResponse<Item>>("items", params);
};

/**
 * Update an item
 */
export const updateItem = (id: number, params: UpdateItemParams) => {
    return put<SingleResponse<Item>>(`items/${id}`, params);
};

/**
 * Delete an item
 */
export const deleteItem = (id: number) => {
    return del<void>(`items/${id}`);
};
