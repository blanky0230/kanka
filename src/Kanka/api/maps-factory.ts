import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { KankaMap, KankaMapSchema, CreateMapParams, UpdateMapParams } from "../schemas/maps.js";

/**
 * Maps API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Map entity type.
 */

// Type assertion to handle schema compatibility
// We need to use 'unknown' as an intermediate type to avoid TypeScript errors
// with array types like layers and groups which are defined as arrays but Schema.Array creates readonly arrays
const mapSchema = KankaMapSchema as unknown as Schema.Schema<KankaMap, unknown>;

// Create the Maps API using the factory
const mapApi = createEntityApi<KankaMap, CreateMapParams, UpdateMapParams>({
    basePath: "maps",
    schema: mapSchema,
    // Custom query parameter transformer to handle map-specific parameters
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

        // Map-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.is_real === 'boolean') queryParams.is_real = params.is_real;
        if (typeof params.location_id === 'number') queryParams.location_id = params.location_id;
        if (typeof params.map_id === 'number') queryParams.map_id = params.map_id;
        if (typeof params.center_marker_id === 'number') queryParams.center_marker_id = params.center_marker_id;
        if (typeof params.center_x === 'number') queryParams.center_x = params.center_x;
        if (typeof params.center_y === 'number') queryParams.center_y = params.center_y;

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
export const getMapsFactory = mapApi.getAll;
export const getMapFactory = mapApi.getOne;
export const createMapFactory = mapApi.create;
export const updateMapFactory = mapApi.update;
export const deleteMapFactory = mapApi.delete;

// You can also add custom operations specific to maps
// that aren't covered by the standard CRUD operations
