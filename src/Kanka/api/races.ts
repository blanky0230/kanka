import {
    Race,
    CreateRaceParams,
    UpdateRaceParams,
} from "../schemas/races.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all races with optional filtering
 */
export const getRaces = (params?: {
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
        location_id: params?.location_id,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Race>>("races", queryParams);
};

/**
 * Get a race by ID
 */
export const getRace = (id: number) => {
    return get<SingleResponse<Race>>(`races/${id}`);
};

/**
 * Create a new race
 */
export const createRace = (params: CreateRaceParams) => {
    return post<SingleResponse<Race>>("races", params);
};

/**
 * Update a race
 */
export const updateRace = (id: number, params: UpdateRaceParams) => {
    return put<SingleResponse<Race>>(`races/${id}`, params);
};

/**
 * Delete a race
 */
export const deleteRace = (id: number) => {
    return del<void>(`races/${id}`);
};
