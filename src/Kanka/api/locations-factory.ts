import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Location, LocationSchema, CreateLocationParams, UpdateLocationParams } from "../schemas/locations.js";

/**
 * Locations API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Location entity type.
 */

// Type assertion to handle schema compatibility
const locationSchema = LocationSchema as Schema.Schema<Location, unknown>;

// Create the Locations API using the factory
const locationApi = createEntityApi<Location, CreateLocationParams, UpdateLocationParams>({
    basePath: "locations",
    schema: locationSchema,
    // Custom query parameter transformer to handle location-specific parameters
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

        // Location-specific parameters
        if (typeof params.is_destroyed === 'boolean') queryParams.is_destroyed = params.is_destroyed;
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

// Export the standard CRUD operations
export const getLocations = locationApi.getAll;
export const getLocation = locationApi.getOne;
export const createLocation = locationApi.create;
export const updateLocation = locationApi.update;
export const deleteLocation = locationApi.delete;

// You can also add custom operations specific to locations
// that aren't covered by the standard CRUD operations
