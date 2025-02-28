import { Effect, pipe } from "effect";
import { getCreature, getCreatures, createCreature, updateCreature, deleteCreature } from "../api/creatures.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all creatures
 */
export const getAllCreaturesExample = pipe(
    getCreatures(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} creatures`)),
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
 * Example: Get a creature by ID
 */
export const getCreatureExample = (creatureId: number) => pipe(
    getCreature(creatureId),
    Effect.tap((response) => Effect.logInfo(`Creature: ${response.data.name}`)),
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
 * Example: Create a new creature
 */
export const createCreatureExample = pipe(
    createCreature({
        name: "New Creature",
        entry: "This is a test creature created with the Kanka API client",
        type: "Beast",
        is_extinct: false,
        is_dead: false,
        locations: [],
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created creature: ${response.data.name}`)),
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
 * Example: Update a creature
 */
export const updateCreatureExample = (creatureId: number) => pipe(
    updateCreature(creatureId, {
        name: "Updated Creature",
        entry: "This is an updated creature",
        is_extinct: true,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated creature: ${response.data.name}`)),
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
 * Example: Delete a creature
 */
export const deleteCreatureExample = (creatureId: number) => pipe(
    deleteCreature(creatureId),
    Effect.tap(() => Effect.logInfo(`Deleted creature with ID: ${creatureId}`)),
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
