import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Race, RaceSchema, CreateRaceParams, UpdateRaceParams } from "../schemas/races.js";

/**
 * Races API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Race entity type.
 */

// Type assertion to handle schema compatibility
// We need to use 'unknown' as an intermediate type to avoid TypeScript errors
// with array types like locations which is defined as number[] but Schema.Array creates readonly arrays
const raceSchema = RaceSchema as unknown as Schema.Schema<Race, unknown>;

// Create the Races API using the factory
const raceApi = createEntityApi<Race, CreateRaceParams, UpdateRaceParams>({
    basePath: "races",
    schema: raceSchema,
    // Custom query parameter transformer to handle race-specific parameters
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

        // Race-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.race_id === 'number') queryParams.race_id = params.race_id;
        if (typeof params.is_extinct === 'boolean') queryParams.is_extinct = params.is_extinct;
        if (typeof params.location_id === 'number') queryParams.location_id = params.location_id;

        // Add tags as individual query parameters if present
        const tags = params.tags;
        if (tags && Array.isArray(tags) && tags.length > 0) {
            tags.forEach((tag, index) => {
                if (typeof tag === 'number') {
                    queryParams[`tags[${index}]`] = tag;
                }
            });
        }

        // Add locations as individual query parameters if present
        const locations = params.locations;
        if (locations && Array.isArray(locations) && locations.length > 0) {
            locations.forEach((location, index) => {
                if (typeof location === 'number') {
                    queryParams[`locations[${index}]`] = location;
                }
            });
        }

        return queryParams;
    }
});

// Export the standard CRUD operations with factory suffix to avoid naming conflicts
export const getRacesFactory = raceApi.getAll;
export const getRaceFactory = raceApi.getOne;
export const createRaceFactory = raceApi.create;
export const updateRaceFactory = raceApi.update;
export const deleteRaceFactory = raceApi.delete;

// You can also add custom operations specific to races
// that aren't covered by the standard CRUD operations
