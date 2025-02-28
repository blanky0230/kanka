import { Effect, pipe } from "effect";
import { getMap, getMaps, createMap, updateMap, deleteMap } from "../api/maps.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all maps
 */
export const getAllMapsExample = pipe(
    getMaps(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} maps`)),
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
 * Example: Get a map by ID
 */
export const getMapExample = (mapId: number) => pipe(
    getMap(mapId),
    Effect.tap((response) => Effect.logInfo(`Map: ${response.data.name}`)),
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
 * Example: Create a new map
 */
export const createMapExample = pipe(
    createMap({
        name: "New Map",
        entry: "This is a test map created with the Kanka API client",
        type: "Continent",
        is_real: false,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created map: ${response.data.name}`)),
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
 * Example: Update a map
 */
export const updateMapExample = (mapId: number) => pipe(
    updateMap(mapId, {
        name: "Updated Map",
        entry: "This is an updated map",
        type: "City",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated map: ${response.data.name}`)),
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
 * Example: Delete a map
 */
export const deleteMapExample = (mapId: number) => pipe(
    deleteMap(mapId),
    Effect.tap(() => Effect.logInfo(`Deleted map with ID: ${mapId}`)),
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
