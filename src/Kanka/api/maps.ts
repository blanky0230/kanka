import {
    KankaMap,
    CreateMapParams,
    UpdateMapParams,
} from "../schemas/maps.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all maps with optional filtering
 */
export const getMaps = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    type?: string;
    is_real?: boolean;
    location_id?: number;
    map_id?: number;
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
        is_real: params?.is_real,
        location_id: params?.location_id,
        map_id: params?.map_id,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<KankaMap>>("maps", queryParams);
};

/**
 * Get a map by ID
 */
export const getMap = (id: number) => {
    return get<SingleResponse<KankaMap>>(`maps/${id}`);
};

/**
 * Create a new map
 */
export const createMap = (params: CreateMapParams) => {
    return post<SingleResponse<KankaMap>>("maps", params);
};

/**
 * Update a map
 */
export const updateMap = (id: number, params: UpdateMapParams) => {
    return put<SingleResponse<KankaMap>>(`maps/${id}`, params);
};

/**
 * Delete a map
 */
export const deleteMap = (id: number) => {
    return del<void>(`maps/${id}`);
};
