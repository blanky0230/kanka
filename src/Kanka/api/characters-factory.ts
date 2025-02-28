import { createEntityApi } from "./createEntityApi.js";
import { Character, CharacterSchema, CreateCharacterParams, UpdateCharacterParams } from "../schemas/characters.js";

/**
 * Characters API using the Generic Entity API Factory
 * 
 * This is an example of how to use the Generic Entity API Factory to create
 * a fully functional API for a specific entity type.
 */

// Create the Characters API using the factory
const characterApi = createEntityApi<Character, CreateCharacterParams, UpdateCharacterParams>({
    basePath: "characters",
    schema: CharacterSchema,
    // Custom query parameter transformer to handle character-specific parameters
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

        // Character-specific parameters
        if (typeof params.is_template === 'boolean') queryParams.is_template = params.is_template;
        if (typeof params.location_id === 'number') queryParams.location_id = params.location_id;
        if (typeof params.is_dead === 'boolean') queryParams.is_dead = params.is_dead;
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

        // Add races as individual query parameters if present
        const races = params.races;
        if (races && Array.isArray(races) && races.length > 0) {
            races.forEach((race, index) => {
                if (typeof race === 'number') {
                    queryParams[`races[${index}]`] = race;
                }
            });
        }

        // Add families as individual query parameters if present
        const families = params.families;
        if (families && Array.isArray(families) && families.length > 0) {
            families.forEach((family, index) => {
                if (typeof family === 'number') {
                    queryParams[`families[${index}]`] = family;
                }
            });
        }

        return queryParams;
    }
});

// Export the standard CRUD operations with factory suffix to avoid naming conflicts
export const getCharactersFactory = characterApi.getAll;
export const getCharacterFactory = characterApi.getOne;
export const createCharacterFactory = characterApi.create;
export const updateCharacterFactory = characterApi.update;
export const deleteCharacterFactory = characterApi.delete;

// You can also add custom operations specific to characters
// that aren't covered by the standard CRUD operations
