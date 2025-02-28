import { Effect, pipe } from "effect";
import { getMapsFactory, getMapFactory, createMapFactory, updateMapFactory, deleteMapFactory } from "../api/maps-factory.js";
import { CreateMapParams, UpdateMapParams } from "../schemas/maps.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all maps using the factory API
 */
export const getAllMapsFactoryExample = pipe(
    getMapsFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} maps`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all maps with filtering
 */
export const getFilteredMapsExample = pipe(
    getMapsFactory({
        name: "World Map",
        is_private: false,
        type: "Continent",
        is_real: false,
        location_id: 1, // Replace with real location ID
        map_id: 2, // Replace with real parent map ID
        tags: [1, 2, 3], // Replace with real tag IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered maps`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a map by ID using the factory API
 */
export const getMapFactoryExample = (mapId: number) => pipe(
    getMapFactory(mapId),
    Effect.tap((response) => Effect.logInfo(`Map: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new map using the factory API
 */
export const createMapFactoryExample = pipe(
    createMapFactory({
        name: "New Map",
        entry: "This is a test map created with the Kanka API client factory",
        type: "Continent",
        is_real: false,
        is_private: false,
    } as CreateMapParams),
    Effect.tap((response) => Effect.logInfo(`Created map: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a map using the factory API
 */
export const updateMapFactoryExample = (mapId: number) => pipe(
    updateMapFactory(mapId, {
        name: "Updated Map",
        entry: "This is an updated map using the factory API",
        type: "City",
    } as UpdateMapParams),
    Effect.tap((response) => Effect.logInfo(`Updated map: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a map using the factory API
 */
export const deleteMapFactoryExample = (mapId: number) => pipe(
    deleteMapFactory(mapId),
    Effect.tap(() => Effect.logInfo(`Deleted map with ID: ${mapId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all map examples
 */
export const runMapExamples = async () => {
    // Get all maps
    await Effect.runPromise(getAllMapsFactoryExample);

    // Get filtered maps
    await Effect.runPromise(getFilteredMapsExample);

    // Get a specific map (replace with a real map ID)
    // await Effect.runPromise(getMapFactoryExample(123));

    // Create a new map
    // await Effect.runPromise(createMapFactoryExample);

    // Update a map (replace with a real map ID)
    // await Effect.runPromise(updateMapFactoryExample(123));

    // Delete a map (replace with a real map ID)
    // await Effect.runPromise(deleteMapFactoryExample(123));
};
