import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { KankaTag, KankaTagSchema, CreateTagParams, UpdateTagParams } from "../schemas/tags.js";

/**
 * Tags API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Tag entity type.
 */

// Type assertion to handle schema compatibility
// We need to use 'unknown' as an intermediate type to avoid TypeScript errors
// with array types like entities which is defined as an array but Schema.Array creates readonly arrays
const tagSchema = KankaTagSchema as unknown as Schema.Schema<KankaTag, unknown>;

// Create the Tags API using the factory
const tagApi = createEntityApi<KankaTag, CreateTagParams, UpdateTagParams>({
    basePath: "tags",
    schema: tagSchema,
    // Custom query parameter transformer to handle tag-specific parameters
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

        // Tag-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.tag_id === 'number') queryParams.tag_id = params.tag_id;
        if (typeof params.colour === 'string') queryParams.colour = params.colour;
        if (typeof params.is_auto_applied === 'boolean') queryParams.is_auto_applied = params.is_auto_applied;
        if (typeof params.is_hidden === 'boolean') queryParams.is_hidden = params.is_hidden;

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
export const getTagsFactory = tagApi.getAll;
export const getTagFactory = tagApi.getOne;
export const createTagFactory = tagApi.create;
export const updateTagFactory = tagApi.update;
export const deleteTagFactory = tagApi.delete;

// You can also add custom operations specific to tags
// that aren't covered by the standard CRUD operations
