import {
    KankaAttribute,
    CreateAttributeParams,
    UpdateAttributeParams,
} from "../schemas/attributes.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all attributes for an entity
 */
export const getEntityAttributes = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaAttribute>>(`entities/${entityId}/attributes`, queryParams);
};

/**
 * Get a attribute by ID for an entity
 */
export const getEntityAttribute = (entityId: number, attributeId: number) => {
    return get<SingleResponse<KankaAttribute>>(`entities/${entityId}/attributes/${attributeId}`);
};

/**
 * Create a new attribute for an entity
 */
export const createEntityAttribute = (entityId: number, params: CreateAttributeParams) => {
    return post<SingleResponse<KankaAttribute>>(`entities/${entityId}/attributes`, params);
};

/**
 * Update an attribute for an entity
 */
export const updateEntityAttribute = (entityId: number, attributeId: number, params: UpdateAttributeParams) => {
    return put<SingleResponse<KankaAttribute>>(`entities/${entityId}/attributes/${attributeId}`, params);
};

/**
 * Delete an attribute from an entity
 */
export const deleteEntityAttribute = (entityId: number, attributeId: number) => {
    return del<void>(`entities/${entityId}/attributes/${attributeId}`);
};
