import {
    Family,
    CreateFamilyParams,
    UpdateFamilyParams,
    FamilyTree,
    FamilyTreeResponse,
} from "../schemas/families.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * @deprecated Use getFamiliesFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */

/**
 * Get all families with optional filtering
 * @deprecated Use getFamiliesFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const getFamilies = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    is_extinct?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    family_id?: number;
    location_id?: number;
    type?: string;
}) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        name: params?.name,
        is_private: params?.is_private,
        is_extinct: params?.is_extinct,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        family_id: params?.family_id,
        location_id: params?.location_id,
        type: params?.type,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Family>>("families", queryParams);
};

/**
 * Get a family by ID
 * @deprecated Use getFamilyFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const getFamily = (id: number) => {
    return get<SingleResponse<Family>>(`families/${id}`);
};

/**
 * Create a new family
 * @deprecated Use createFamilyFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const createFamily = (params: CreateFamilyParams) => {
    return post<SingleResponse<Family>>("families", params);
};

/**
 * Update a family
 * @deprecated Use updateFamilyFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const updateFamily = (id: number, params: UpdateFamilyParams) => {
    return put<SingleResponse<Family>>(`families/${id}`, params);
};

/**
 * Delete a family
 * @deprecated Use deleteFamilyFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const deleteFamily = (id: number) => {
    return del<void>(`families/${id}`);
};

/**
 * Get a family tree
 * @deprecated Use getFamilyTreeFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const getFamilyTree = (id: number) => {
    return get<FamilyTreeResponse>(`families/${id}/tree`);
};

/**
 * Create a family tree
 * @deprecated Use createFamilyTreeFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const createFamilyTree = (id: number, tree: FamilyTree) => {
    return put<FamilyTreeResponse>(`families/${id}/tree`, tree);
};

/**
 * Update a family tree
 * @deprecated Use updateFamilyTreeFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const updateFamilyTree = (id: number, tree: FamilyTree) => {
    return post<FamilyTreeResponse>(`families/${id}/tree`, tree);
};

/**
 * Delete a family tree
 * @deprecated Use deleteFamilyTreeFactory from families-factory.js instead.
 * This implementation will be removed in a future release.
 */
export const deleteFamilyTree = (id: number) => {
    return del<void>(`families/${id}/tree`);
};
