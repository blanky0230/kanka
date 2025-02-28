import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Family, FamilySchema, CreateFamilyParams, UpdateFamilyParams, FamilyTree, FamilyTreeResponse } from "../schemas/families.js";
import { get, post, put, del } from "./client.js";

/**
 * Families API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Family entity type.
 */

// Type assertion to handle schema compatibility
const familySchema = FamilySchema as unknown as Schema.Schema<Family, unknown>;

// Create the Families API using the factory
const familyApi = createEntityApi<Family, CreateFamilyParams, UpdateFamilyParams>({
    basePath: "families",
    schema: familySchema,
    // Custom query parameter transformer to handle family-specific parameters
    transformQueryParams: (params) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        // Standard parameters
        if (typeof params.page === 'number') queryParams.page = params.page;
        if (typeof params.perPage === 'number') queryParams.per_page = params.perPage;
        if (typeof params.name === 'string') queryParams.name = params.name;
        if (typeof params.is_private === 'boolean') queryParams.is_private = params.is_private;
        if (typeof params.created_by === 'number') queryParams.created_by = params.created_by;
        if (typeof params.updated_by === 'number') queryParams.updated_by = params.updated_by;
        if (typeof params.lastSync === 'string') queryParams.lastSync = params.lastSync;

        // Family-specific parameters
        if (typeof params.is_extinct === 'boolean') queryParams.is_extinct = params.is_extinct;
        if (typeof params.family_id === 'number') queryParams.family_id = params.family_id;
        if (typeof params.location_id === 'number') queryParams.location_id = params.location_id;
        if (typeof params.type === 'string') queryParams.type = params.type;

        // Add tags as individual query parameters if present
        const tags = params.tags;
        if (tags && Array.isArray(tags) && tags.length > 0) {
            tags.forEach((tag, index) => {
                if (typeof tag === 'number') {
                    queryParams[`tags[${index}]`] = tag;
                }
            });
        }

        return queryParams;
    }
});

// Export the standard CRUD operations with factory suffix to avoid naming conflicts
export const getFamiliesFactory = familyApi.getAll;
export const getFamilyFactory = familyApi.getOne;
export const createFamilyFactory = familyApi.create;
export const updateFamilyFactory = familyApi.update;
export const deleteFamilyFactory = familyApi.delete;

// Custom operations specific to families that aren't covered by the standard CRUD operations

/**
 * Get a family tree
 */
export const getFamilyTreeFactory = (id: number) => {
    return get<FamilyTreeResponse>(`families/${id}/tree`);
};

/**
 * Create a family tree
 */
export const createFamilyTreeFactory = (id: number, tree: FamilyTree) => {
    return put<FamilyTreeResponse>(`families/${id}/tree`, tree);
};

/**
 * Update a family tree
 */
export const updateFamilyTreeFactory = (id: number, tree: FamilyTree) => {
    return post<FamilyTreeResponse>(`families/${id}/tree`, tree);
};

/**
 * Delete a family tree
 */
export const deleteFamilyTreeFactory = (id: number) => {
    return del<void>(`families/${id}/tree`);
};
