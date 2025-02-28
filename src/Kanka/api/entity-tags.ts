import { KankaEntityTag, CreateEntityTagParams, UpdateEntityTagParams } from "../schemas/entity-tags.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all tags of an entity
 */
export const getEntityTags = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaEntityTag>>(`entities/${entityId}/entity_tags`, queryParams);
};

/**
 * Get a specific entity tag
 */
export const getEntityTag = (entityId: number, entityTagId: number) => {
    return get<SingleResponse<KankaEntityTag>>(`entities/${entityId}/entity_tags/${entityTagId}`);
};

/**
 * Create an entity tag
 */
export const createEntityTag = (entityId: number, params: CreateEntityTagParams) => {
    return post<SingleResponse<KankaEntityTag>>(`entities/${entityId}/entity_tags`, params);
};

/**
 * Update an entity tag
 */
export const updateEntityTag = (entityId: number, entityTagId: number, params: UpdateEntityTagParams) => {
    return put<SingleResponse<KankaEntityTag>>(`entities/${entityId}/entity_tags/${entityTagId}`, params);
};

/**
 * Delete an entity tag
 */
export const deleteEntityTag = (entityId: number, entityTagId: number) => {
    return del<void>(`entities/${entityId}/entity_tags/${entityTagId}`);
};
