import { Effect, pipe } from "effect";
import { getDiceRoll, getDiceRolls, createDiceRoll, updateDiceRoll, deleteDiceRoll } from "../api/dice-rolls.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all dice rolls
 */
export const getAllDiceRollsExample = pipe(
    getDiceRolls(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} dice rolls`)),
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
 * Example: Get a dice roll by ID
 */
export const getDiceRollExample = (diceRollId: number) => pipe(
    getDiceRoll(diceRollId),
    Effect.tap((response) => Effect.logInfo(`Dice Roll: ${response.data.name}`)),
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
 * Example: Create a new dice roll
 */
export const createDiceRollExample = pipe(
    createDiceRoll({
        name: "New Dice Roll",
        entry: "This is a test dice roll created with the Kanka API client",
        parameters: "2d6+3",
        system: "standard",
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created dice roll: ${response.data.name}`)),
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
 * Example: Update a dice roll
 */
export const updateDiceRollExample = (diceRollId: number) => pipe(
    updateDiceRoll(diceRollId, {
        name: "Updated Dice Roll",
        entry: "This is an updated dice roll",
        parameters: "3d8+5",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated dice roll: ${response.data.name}`)),
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
 * Example: Delete a dice roll
 */
export const deleteDiceRollExample = (diceRollId: number) => pipe(
    deleteDiceRoll(diceRollId),
    Effect.tap(() => Effect.logInfo(`Deleted dice roll with ID: ${diceRollId}`)),
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
