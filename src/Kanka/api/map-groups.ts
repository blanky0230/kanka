import {
    KankaMapGroup,
    CreateMapGroupParams,
    UpdateMapGroupParams,
} from "../schemas/map-groups.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all map groups for a map
 */
export const getMapGroups = (mapId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaMapGroup>>(`maps/${mapId}/map_groups`, queryParams);
};

/**
 * Get a map group by ID
 */
export const getMapGroup = (mapId: number, groupId: number) => {
    return get<SingleResponse<KankaMapGroup>>(`maps/${mapId}/map_groups/${groupId}`);
};

/**
 * Create a new map group
 */
export const createMapGroup = (mapId: number, params: CreateMapGroupParams) => {
    return post<SingleResponse<KankaMapGroup>>(`maps/${mapId}/map-groups`, params);
};

/**
 * Update a map group
 */
export const updateMapGroup = (mapId: number, groupId: number, params: UpdateMapGroupParams) => {
    return put<SingleResponse<KankaMapGroup>>(`maps/${mapId}/map-groups/${groupId}`, params);
};

/**
 * Delete a map group
 */
export const deleteMapGroup = (mapId: number, groupId: number) => {
    return del<void>(`maps/${mapId}/map-groups/${groupId}`);
};
