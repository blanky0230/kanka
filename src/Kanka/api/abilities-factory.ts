import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { KankaAbility, KankaAbilitySchema, CreateAbilityParams, UpdateAbilityParams } from "../schemas/abilities.js";

/**
 * Abilities API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Ability entity type.
 */

// Type assertion to handle schema compatibility
// We need to use 'unknown' as an intermediate type to avoid TypeScript errors
// with recursive types like KankaAbility which contains an array of KankaAbility
const abilitySchema = KankaAbilitySchema as unknown as Schema.Schema<KankaAbility, unknown>;

// Create the Abilities API using the factory
const abilityApi = createEntityApi<KankaAbility, CreateAbilityParams, UpdateAbilityParams>({
    basePath: "abilities",
    schema: abilitySchema,
    // Custom query parameter transformer to handle ability-specific parameters
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

        // Ability-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.ability_id === 'number') queryParams.ability_id = params.ability_id;
        if (typeof params.charges === 'number') queryParams.charges = params.charges;

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
export const getAbilitiesFactory = abilityApi.getAll;
export const getAbilityFactory = abilityApi.getOne;
export const createAbilityFactory = abilityApi.create;
export const updateAbilityFactory = abilityApi.update;
export const deleteAbilityFactory = abilityApi.delete;

// You can also add custom operations specific to abilities
// that aren't covered by the standard CRUD operations
