import { Effect, pipe } from "effect";
import { getMapLayer, getMapLayers, createMapLayer, updateMapLayer, deleteMapLayer } from "../api/map-layers.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all map layers for a map
 */
export const getMapLayersExample = (mapId: number) => pipe(
    getMapLayers(mapId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} map layers`)),
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
 * Example: Get a map layer by ID
 */
export const getMapLayerExample = (mapId: number, layerId: number) => pipe(
    getMapLayer(mapId, layerId),
    Effect.tap((response) => Effect.logInfo(`Map Layer: ${response.data.name}`)),
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
 * Example: Create a new map layer
 */
export const createMapLayerExample = (mapId: number) => pipe(
    createMapLayer(mapId, {
        name: "New Map Layer",
        map_id: mapId,
        entry: "This is a test map layer created with the Kanka API client",
        type_id: 0, // Standard layer
        position: 1,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created map layer with ID: ${response.data.id}`)),
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
 * Example: Update a map layer
 */
export const updateMapLayerExample = (mapId: number, layerId: number) => pipe(
    updateMapLayer(mapId, layerId, {
        name: "Updated Map Layer",
        entry: "This is an updated map layer",
        type_id: 1, // Overlay layer
    }),
    Effect.tap((response) => Effect.logInfo(`Updated map layer with ID: ${response.data.id}`)),
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
 * Example: Delete a map layer
 */
export const deleteMapLayerExample = (mapId: number, layerId: number) => pipe(
    deleteMapLayer(mapId, layerId),
    Effect.tap(() => Effect.logInfo(`Deleted map layer with ID: ${layerId}`)),
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
