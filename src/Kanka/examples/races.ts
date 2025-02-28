import { Effect, pipe } from "effect";
import { getRace, getRaces, createRace, updateRace, deleteRace } from "../api/races.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all races
 */
export const getAllRacesExample = pipe(
    getRaces(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} races`)),
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
 * Example: Get a race by ID
 */
export const getRaceExample = (raceId: number) => pipe(
    getRace(raceId),
    Effect.tap((response) => Effect.logInfo(`Race: ${response.data.name}`)),
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
 * Example: Create a new race
 */
export const createRaceExample = pipe(
    createRace({
        name: "New Race",
        entry: "This is a test race created with the Kanka API client",
        type: "Humanoid",
        is_extinct: false,
        locations: [],
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created race: ${response.data.name}`)),
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
 * Example: Update a race
 */
export const updateRaceExample = (raceId: number) => pipe(
    updateRace(raceId, {
        name: "Updated Race",
        entry: "This is an updated race",
        is_extinct: true,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated race: ${response.data.name}`)),
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
 * Example: Delete a race
 */
export const deleteRaceExample = (raceId: number) => pipe(
    deleteRace(raceId),
    Effect.tap(() => Effect.logInfo(`Deleted race with ID: ${raceId}`)),
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
