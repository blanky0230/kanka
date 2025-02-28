import { Effect, pipe } from "effect";
import { getAbilitiesFactory, getAbilityFactory, createAbilityFactory, updateAbilityFactory, deleteAbilityFactory } from "../api/abilities-factory.js";
import { CreateAbilityParams, UpdateAbilityParams } from "../schemas/abilities.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all abilities using the factory API
 */
export const getAllAbilitiesFactoryExample = pipe(
    getAbilitiesFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} abilities`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all abilities with filtering
 */
export const getFilteredAbilitiesExample = pipe(
    getAbilitiesFactory({
        name: "Fireball",
        is_private: false,
        type: "Spell",
        ability_id: 1, // Replace with real parent ability ID
        charges: 3,
        tags: [1, 2, 3], // Replace with real tag IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered abilities`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get an ability by ID using the factory API
 */
export const getAbilityFactoryExample = (abilityId: number) => pipe(
    getAbilityFactory(abilityId),
    Effect.tap((response) => Effect.logInfo(`Ability: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new ability using the factory API
 */
export const createAbilityFactoryExample = pipe(
    createAbilityFactory({
        name: "New Ability",
        entry: "This is a test ability created with the Kanka API client factory",
        type: "3rd level",
        charges: 3,
        is_private: false,
    } as CreateAbilityParams),
    Effect.tap((response) => Effect.logInfo(`Created ability: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update an ability using the factory API
 */
export const updateAbilityFactoryExample = (abilityId: number) => pipe(
    updateAbilityFactory(abilityId, {
        name: "Updated Ability",
        entry: "This is an updated ability using the factory API",
        charges: 5,
    } as UpdateAbilityParams),
    Effect.tap((response) => Effect.logInfo(`Updated ability: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete an ability using the factory API
 */
export const deleteAbilityFactoryExample = (abilityId: number) => pipe(
    deleteAbilityFactory(abilityId),
    Effect.tap(() => Effect.logInfo(`Deleted ability with ID: ${abilityId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all ability examples
 */
export const runAbilityExamples = async () => {
    // Get all abilities
    await Effect.runPromise(getAllAbilitiesFactoryExample);

    // Get filtered abilities
    await Effect.runPromise(getFilteredAbilitiesExample);

    // Get a specific ability (replace with a real ability ID)
    // await Effect.runPromise(getAbilityFactoryExample(123));

    // Create a new ability
    // await Effect.runPromise(createAbilityFactoryExample);

    // Update an ability (replace with a real ability ID)
    // await Effect.runPromise(updateAbilityFactoryExample(123));

    // Delete an ability (replace with a real ability ID)
    // await Effect.runPromise(deleteAbilityFactoryExample(123));
};
