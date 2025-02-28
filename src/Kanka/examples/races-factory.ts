import { Effect, pipe } from "effect";
import { getRacesFactory, getRaceFactory, createRaceFactory, updateRaceFactory, deleteRaceFactory } from "../api/races-factory.js";
import { CreateRaceParams, UpdateRaceParams } from "../schemas/races.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all races using the factory API
 */
export const getAllRacesFactoryExample = pipe(
    getRacesFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} races`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all races with filtering
 */
export const getFilteredRacesExample = pipe(
    getRacesFactory({
        name: "Elf",
        is_private: false,
        type: "Humanoid",
        race_id: 1, // Replace with real parent race ID
        is_extinct: false,
        location_id: 2, // Replace with real location ID
        tags: [1, 2, 3], // Replace with real tag IDs
        locations: [4, 5, 6], // Replace with real location IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered races`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a race by ID using the factory API
 */
export const getRaceFactoryExample = (raceId: number) => pipe(
    getRaceFactory(raceId),
    Effect.tap((response) => Effect.logInfo(`Race: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new race using the factory API
 */
export const createRaceFactoryExample = pipe(
    createRaceFactory({
        name: "New Race",
        entry: "This is a test race created with the Kanka API client factory",
        type: "Humanoid",
        is_extinct: false,
        locations: [],
        is_private: false,
    } as CreateRaceParams),
    Effect.tap((response) => Effect.logInfo(`Created race: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a race using the factory API
 */
export const updateRaceFactoryExample = (raceId: number) => pipe(
    updateRaceFactory(raceId, {
        name: "Updated Race",
        entry: "This is an updated race using the factory API",
        is_extinct: true,
    } as UpdateRaceParams),
    Effect.tap((response) => Effect.logInfo(`Updated race: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a race using the factory API
 */
export const deleteRaceFactoryExample = (raceId: number) => pipe(
    deleteRaceFactory(raceId),
    Effect.tap(() => Effect.logInfo(`Deleted race with ID: ${raceId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all race examples
 */
export const runRaceExamples = async () => {
    // Get all races
    await Effect.runPromise(getAllRacesFactoryExample);

    // Get filtered races
    await Effect.runPromise(getFilteredRacesExample);

    // Get a specific race (replace with a real race ID)
    // await Effect.runPromise(getRaceFactoryExample(123));

    // Create a new race
    // await Effect.runPromise(createRaceFactoryExample);

    // Update a race (replace with a real race ID)
    // await Effect.runPromise(updateRaceFactoryExample(123));

    // Delete a race (replace with a real race ID)
    // await Effect.runPromise(deleteRaceFactoryExample(123));
};
