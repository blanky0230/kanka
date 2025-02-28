import {
    Creature,
    CreateCreatureParams,
    UpdateCreatureParams,
} from "../schemas/creatures.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all creatures with optional filtering
 */
export const getCreatures = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    type?: string;
    is_extinct?: boolean;
    is_dead?: boolean;
    location_id?: number;
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
        is_extinct: params?.is_extinct,
        is_dead: params?.is_dead,
        location_id: params?.location_id,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Creature>>("creatures", queryParams);
};

/**
 * Get a creature by ID
 */
export const getCreature = (id: number) => {
    return get<SingleResponse<Creature>>(`creatures/${id}`);
};

/**
 * Create a new creature
 */
export const createCreature = (params: CreateCreatureParams) => {
    return post<SingleResponse<Creature>>("creatures", params);
};

/**
 * Update a creature
 */
export const updateCreature = (id: number, params: UpdateCreatureParams) => {
    return put<SingleResponse<Creature>>(`creatures/${id}`, params);
};

/**
 * Delete a creature
 */
export const deleteCreature = (id: number) => {
    return del<void>(`creatures/${id}`);
};
