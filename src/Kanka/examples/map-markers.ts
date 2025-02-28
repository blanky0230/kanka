import { Effect, pipe } from "effect";
import { getMapMarker, getMapMarkers, createMapMarker, updateMapMarker, deleteMapMarker } from "../api/map-markers.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all map markers for a map
 */
export const getMapMarkersExample = (mapId: number) => pipe(
    getMapMarkers(mapId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} map markers`)),
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
 * Example: Get a map marker by ID
 */
export const getMapMarkerExample = (mapId: number, markerId: number) => pipe(
    getMapMarker(mapId, markerId),
    Effect.tap((response) => Effect.logInfo(`Map Marker: ${response.data.name || response.data.entity_id}`)),
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
 * Example: Create a new map marker
 */
export const createMapMarkerExample = (mapId: number) => pipe(
    createMapMarker(mapId, {
        name: "New Map Marker",
        map_id: mapId,
        latitude: "500",
        longitude: "500",
        shape_id: 1, // Marker
        icon: "1", // Marker
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created map marker with ID: ${response.data.id}`)),
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
 * Example: Update a map marker
 */
export const updateMapMarkerExample = (mapId: number, markerId: number) => pipe(
    updateMapMarker(mapId, markerId, {
        name: "Updated Map Marker",
        colour: "#FF5733",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated map marker with ID: ${response.data.id}`)),
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
 * Example: Delete a map marker
 */
export const deleteMapMarkerExample = (mapId: number, markerId: number) => pipe(
    deleteMapMarker(mapId, markerId),
    Effect.tap(() => Effect.logInfo(`Deleted map marker with ID: ${markerId}`)),
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
