import { KankaRelation, CreateRelationParams, UpdateRelationParams } from "../schemas/relations.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { get, post, put, del } from "./client.js";

/**
 * Get all relations of an entity
 */
export const getEntityRelations = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaRelation>>(`entities/${entityId}/relations`, queryParams);
};

/**
 * Get a specific relation of an entity
 */
export const getEntityRelation = (entityId: number, relationId: number) => {
    return get<SingleResponse<KankaRelation>>(`entities/${entityId}/relations/${relationId}`);
};

/**
 * Create a relation for an entity
 */
export const createEntityRelation = (entityId: number, params: CreateRelationParams) => {
    return post<SingleResponse<KankaRelation>>(`entities/${entityId}/relations`, params);
};

/**
 * Update a relation
 */
export const updateEntityRelation = (entityId: number, relationId: number, params: UpdateRelationParams) => {
    return put<SingleResponse<KankaRelation>>(`entities/${entityId}/relations/${relationId}`, params);
};

/**
 * Delete a relation
 */
export const deleteEntityRelation = (entityId: number, relationId: number) => {
    return del<void>(`entities/${entityId}/relations/${relationId}`);
};

/**
 * Get all relations in a campaign
 */
export const getCampaignRelations = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaRelation>>('relations', queryParams);
};
