import { Effect, pipe } from "effect";
import { getLocations, getLocation, createLocation, updateLocation, deleteLocation } from "../api/locations-factory.js";
import { CreateLocationParams, UpdateLocationParams } from "../schemas/locations.js";
import { configFromEnv } from "../config.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { Location } from "../schemas/locations.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all locations
 */
export const getAllLocationsExample = pipe(
    getLocations(),
    Effect.tap((response: PaginatedResponse<Location>) => Effect.logInfo(`Found ${response.data.length} locations`)),
    Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all locations with filtering
 */
export const getFilteredLocationsExample = pipe(
    getLocations({
        name: "Mordor",
        is_private: false,
        is_destroyed: false,
        type: "Region",
        tags: [1, 2, 3], // Replace with real tag IDs
        location_id: 4, // Replace with real parent location ID
    }),
    Effect.tap((response: PaginatedResponse<Location>) => Effect.logInfo(`Found ${response.data.length} filtered locations`)),
    Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a location by ID
 */
export const getLocationExample = (locationId: number) => pipe(
    getLocation(locationId),
    Effect.tap((response: SingleResponse<Location>) => Effect.logInfo(`Location: ${response.data.name}`)),
    Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new location
 */
export const createLocationExample = pipe(
    createLocation({
        name: "Rivendell",
        entry: "<p>The Last Homely House East of the Sea</p>",
        type: "Settlement",
        is_private: false,
        is_destroyed: false,
    } as CreateLocationParams),
    Effect.tap((response: SingleResponse<Location>) => Effect.logInfo(`Created location: ${response.data.name}`)),
    Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a location
 */
export const updateLocationExample = (locationId: number) => pipe(
    updateLocation(locationId, {
        entry: "<p>The Last Homely House East of the Sea, home of Elrond</p>",
        is_destroyed: false,
    } as UpdateLocationParams),
    Effect.tap((response: SingleResponse<Location>) => Effect.logInfo(`Updated location: ${response.data.name}`)),
    Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a location
 */
export const deleteLocationExample = (locationId: number) => pipe(
    deleteLocation(locationId),
    Effect.tap(() => Effect.logInfo(`Deleted location with ID: ${locationId}`)),
    Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all location examples
 */
export const runLocationExamples = async () => {
    // Get all locations
    await Effect.runPromise(getAllLocationsExample);

    // Get filtered locations
    await Effect.runPromise(getFilteredLocationsExample);

    // Get a specific location (replace with a real location ID)
    // await Effect.runPromise(getLocationExample(123));

    // Create a new location
    // await Effect.runPromise(createLocationExample);

    // Update a location (replace with a real location ID)
    // await Effect.runPromise(updateLocationExample(123));

    // Delete a location (replace with a real location ID)
    // await Effect.runPromise(deleteLocationExample(123));
};
