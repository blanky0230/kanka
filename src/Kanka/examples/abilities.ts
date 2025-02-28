import { Effect, pipe } from "effect";
import { getAbility, getAbilities, createAbility, updateAbility, deleteAbility } from "../api/abilities.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all abilities
 */
export const getAllAbilitiesExample = pipe(
    getAbilities(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} abilities`)),
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
 * Example: Get an ability by ID
 */
export const getAbilityExample = (abilityId: number) => pipe(
    getAbility(abilityId),
    Effect.tap((response) => Effect.logInfo(`Ability: ${response.data.name}`)),
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
 * Example: Create a new ability
 */
export const createAbilityExample = pipe(
    createAbility({
        name: "New Ability",
        entry: "This is a test ability created with the Kanka API client",
        type: "3rd level",
        charges: 3,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created ability: ${response.data.name}`)),
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
 * Example: Update an ability
 */
export const updateAbilityExample = (abilityId: number) => pipe(
    updateAbility(abilityId, {
        name: "Updated Ability",
        entry: "This is an updated ability",
        charges: 5,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated ability: ${response.data.name}`)),
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
 * Example: Delete an ability
 */
export const deleteAbilityExample = (abilityId: number) => pipe(
    deleteAbility(abilityId),
    Effect.tap(() => Effect.logInfo(`Deleted ability with ID: ${abilityId}`)),
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
