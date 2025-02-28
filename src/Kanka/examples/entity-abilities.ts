import { Effect, pipe } from "effect";
import {
    getEntityAbilities,
    getEntityAbility,
    createEntityAbility,
    updateEntityAbility,
    deleteEntityAbility
} from "../api/entity-abilities.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all abilities for an entity
 */
export const getEntityAbilitiesExample = (entityId: number) => pipe(
    getEntityAbilities(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entity abilities for entity ${entityId}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Get an ability by ID for an entity
 */
export const getEntityAbilityExample = (entityId: number, abilityId: number) => pipe(
    getEntityAbility(entityId, abilityId),
    Effect.tap((response) => Effect.logInfo(`Entity Ability: ${response.data.ability_id} with ${response.data.charges} charges`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a new ability for an entity
 */
export const createEntityAbilityExample = (entityId: number, abilityId: number) => pipe(
    createEntityAbility(entityId, {
        ability_id: abilityId,
        visibility_id: 1, // 'all'
        charges: 3,
        position: 0,
        note: "Example ability note"
    }),
    Effect.tap((response) => Effect.logInfo(`Created entity ability with ID: ${response.data.id}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Update an ability for an entity
 */
export const updateEntityAbilityExample = (entityId: number, abilityId: number) => pipe(
    updateEntityAbility(entityId, abilityId, {
        charges: 5,
        note: "Updated ability note"
    }),
    Effect.tap((response) => Effect.logInfo(`Updated entity ability with ID: ${response.data.id}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Delete an ability from an entity
 */
export const deleteEntityAbilityExample = (entityId: number, abilityId: number) => pipe(
    deleteEntityAbility(entityId, abilityId),
    Effect.tap(() => Effect.logInfo(`Deleted entity ability with ID: ${abilityId}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);
