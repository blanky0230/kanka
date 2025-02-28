import { Effect, pipe } from "effect";
import { getLocation, getLocations, createLocation, updateLocation, deleteLocation } from "../api/locations.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all locations
 */
export const getAllLocationsExample = pipe(
    getLocations(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} locations`)),
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
 * Example: Get a location by ID
 */
export const getLocationExample = (locationId: number) => pipe(
    getLocation(locationId),
    Effect.tap((response) => Effect.logInfo(`Location: ${response.data.name}`)),
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
 * Example: Create a new location
 */
export const createLocationExample = pipe(
    createLocation({
        name: "New Location",
        entry: "This is a test location created with the Kanka API client",
        type: "City",
        is_destroyed: false,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created location: ${response.data.name}`)),
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
 * Example: Update a location
 */
export const updateLocationExample = (locationId: number) => pipe(
    updateLocation(locationId, {
        name: "Updated Location",
        entry: "This is an updated location",
        type: "Town",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated location: ${response.data.name}`)),
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
 * Example: Delete a location
 */
export const deleteLocationExample = (locationId: number) => pipe(
    deleteLocation(locationId),
    Effect.tap(() => Effect.logInfo(`Deleted location with ID: ${locationId}`)),
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
