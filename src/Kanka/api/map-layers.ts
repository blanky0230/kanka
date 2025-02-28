import {
    KankaMapLayer,
    CreateMapLayerParams,
    UpdateMapLayerParams,
} from "../schemas/map-layers.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all map layers for a map
 */
export const getMapLayers = (mapId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaMapLayer>>(`maps/${mapId}/map_layers`, queryParams);
};

/**
 * Get a map layer by ID
 */
export const getMapLayer = (mapId: number, layerId: number) => {
    return get<SingleResponse<KankaMapLayer>>(`maps/${mapId}/map_layers/${layerId}`);
};

/**
 * Create a new map layer
 */
export const createMapLayer = (mapId: number, params: CreateMapLayerParams) => {
    return post<SingleResponse<KankaMapLayer>>(`maps/${mapId}/map-layers`, params);
};

/**
 * Update a map layer
 */
export const updateMapLayer = (mapId: number, layerId: number, params: UpdateMapLayerParams) => {
    return put<SingleResponse<KankaMapLayer>>(`maps/${mapId}/map-layers/${layerId}`, params);
};

/**
 * Delete a map layer
 */
export const deleteMapLayer = (mapId: number, layerId: number) => {
    return del<void>(`maps/${mapId}/map-layers/${layerId}`);
};
