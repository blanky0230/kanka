import { Effect, pipe } from "effect";
import { getCreaturesFactory, getCreatureFactory, createCreatureFactory, updateCreatureFactory, deleteCreatureFactory } from "../api/creatures-factory.js";
import { CreateCreatureParams, UpdateCreatureParams } from "../schemas/creatures.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all creatures using the factory API
 */
export const getAllCreaturesFactoryExample = pipe(
    getCreaturesFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} creatures`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all creatures with filtering
 */
export const getFilteredCreaturesExample = pipe(
    getCreaturesFactory({
        name: "Dragon",
        is_private: false,
        type: "Beast",
        creature_id: 1, // Replace with real parent creature ID
        is_extinct: false,
        is_dead: false,
        location_id: 2, // Replace with real location ID
        tags: [1, 2, 3], // Replace with real tag IDs
        locations: [4, 5, 6], // Replace with real location IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered creatures`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a creature by ID using the factory API
 */
export const getCreatureFactoryExample = (creatureId: number) => pipe(
    getCreatureFactory(creatureId),
    Effect.tap((response) => Effect.logInfo(`Creature: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new creature using the factory API
 */
export const createCreatureFactoryExample = pipe(
    createCreatureFactory({
        name: "New Creature",
        entry: "This is a test creature created with the Kanka API client factory",
        type: "Beast",
        is_extinct: false,
        is_dead: false,
        locations: [],
        is_private: false,
    } as CreateCreatureParams),
    Effect.tap((response) => Effect.logInfo(`Created creature: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a creature using the factory API
 */
export const updateCreatureFactoryExample = (creatureId: number) => pipe(
    updateCreatureFactory(creatureId, {
        name: "Updated Creature",
        entry: "This is an updated creature using the factory API",
        is_extinct: true,
    } as UpdateCreatureParams),
    Effect.tap((response) => Effect.logInfo(`Updated creature: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a creature using the factory API
 */
export const deleteCreatureFactoryExample = (creatureId: number) => pipe(
    deleteCreatureFactory(creatureId),
    Effect.tap(() => Effect.logInfo(`Deleted creature with ID: ${creatureId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all creature examples
 */
export const runCreatureExamples = async () => {
    // Get all creatures
    await Effect.runPromise(getAllCreaturesFactoryExample);

    // Get filtered creatures
    await Effect.runPromise(getFilteredCreaturesExample);

    // Get a specific creature (replace with a real creature ID)
    // await Effect.runPromise(getCreatureFactoryExample(123));

    // Create a new creature
    // await Effect.runPromise(createCreatureFactoryExample);

    // Update a creature (replace with a real creature ID)
    // await Effect.runPromise(updateCreatureFactoryExample(123));

    // Delete a creature (replace with a real creature ID)
    // await Effect.runPromise(deleteCreatureFactoryExample(123));
};
