import {
    MapMarker,
    CreateMapMarkerParams,
    UpdateMapMarkerParams,
} from "../schemas/map-markers.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all map markers for a map with optional filtering
 */
export const getMapMarkers = (mapId: number, params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    entity_id?: number;
    shape_id?: number;
    group_id?: number;
}) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        name: params?.name,
        is_private: params?.is_private,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        entity_id: params?.entity_id,
        shape_id: params?.shape_id,
        group_id: params?.group_id,
    };

    return get<PaginatedResponse<MapMarker>>(`maps/${mapId}/map_markers`, queryParams);
};

/**
 * Get a map marker by ID
 */
export const getMapMarker = (mapId: number, markerId: number) => {
    return get<SingleResponse<MapMarker>>(`maps/${mapId}/map_markers/${markerId}`);
};

/**
 * Create a new map marker
 */
export const createMapMarker = (mapId: number, params: CreateMapMarkerParams) => {
    return post<SingleResponse<MapMarker>>(`maps/${mapId}/map_markers`, params);
};

/**
 * Update a map marker
 */
export const updateMapMarker = (mapId: number, markerId: number, params: UpdateMapMarkerParams) => {
    return put<SingleResponse<MapMarker>>(`maps/${mapId}/map_markers/${markerId}`, params);
};

/**
 * Delete a map marker
 */
export const deleteMapMarker = (mapId: number, markerId: number) => {
    return del<void>(`maps/${mapId}/map_markers/${markerId}`);
};
