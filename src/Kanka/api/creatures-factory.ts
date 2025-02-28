import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Creature, CreatureSchema, CreateCreatureParams, UpdateCreatureParams } from "../schemas/creatures.js";

/**
 * Creatures API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Creature entity type.
 */

// Type assertion to handle schema compatibility
// We need to use 'unknown' as an intermediate type to avoid TypeScript errors
// with array types like locations which is defined as number[] but Schema.Array creates readonly arrays
const creatureSchema = CreatureSchema as unknown as Schema.Schema<Creature, unknown>;

// Create the Creatures API using the factory
const creatureApi = createEntityApi<Creature, CreateCreatureParams, UpdateCreatureParams>({
    basePath: "creatures",
    schema: creatureSchema,
    // Custom query parameter transformer to handle creature-specific parameters
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

        // Creature-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.creature_id === 'number') queryParams.creature_id = params.creature_id;
        if (typeof params.is_extinct === 'boolean') queryParams.is_extinct = params.is_extinct;
        if (typeof params.is_dead === 'boolean') queryParams.is_dead = params.is_dead;
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
export const getCreaturesFactory = creatureApi.getAll;
export const getCreatureFactory = creatureApi.getOne;
export const createCreatureFactory = creatureApi.create;
export const updateCreatureFactory = creatureApi.update;
export const deleteCreatureFactory = creatureApi.delete;

// You can also add custom operations specific to creatures
// that aren't covered by the standard CRUD operations
