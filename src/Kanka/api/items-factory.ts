import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Item, ItemSchema, CreateItemParams, UpdateItemParams } from "../schemas/items.js";

/**
 * Items API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Item entity type.
 */

// Type assertion to handle schema compatibility
const itemSchema = ItemSchema as unknown as Schema.Schema<Item, unknown>;

// Create the Items API using the factory
const itemApi = createEntityApi<Item, CreateItemParams, UpdateItemParams>({
    basePath: "items",
    schema: itemSchema,
    // Custom query parameter transformer to handle item-specific parameters
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

        // Item-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.location_id === 'number') queryParams.location_id = params.location_id;
        if (typeof params.character_id === 'number') queryParams.character_id = params.character_id;
        if (typeof params.item_id === 'number') queryParams.item_id = params.item_id;

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
export const getItemsFactory = itemApi.getAll;
export const getItemFactory = itemApi.getOne;
export const createItemFactory = itemApi.create;
export const updateItemFactory = itemApi.update;
export const deleteItemFactory = itemApi.delete;

// Note: We're not adding deprecated exports here to avoid naming conflicts
// with the original implementation in items.js
