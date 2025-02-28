import { Effect, pipe } from "effect";
import { getCharacter, getCharacters, createCharacter, updateCharacter, deleteCharacter } from "../api/characters.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all characters
 */
export const getAllCharactersExample = pipe(
    getCharacters(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters`)),
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
 * Example: Get a character by ID
 */
export const getCharacterExample = (characterId: number) => pipe(
    getCharacter(characterId),
    Effect.tap((response) => Effect.logInfo(`Character: ${response.data.name}`)),
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
 * Example: Create a new character
 */
export const createCharacterExample = pipe(
    createCharacter({
        name: "New Character",
        entry: "This is a test character created with the Kanka API client",
        age: "30",
        sex: "Female",
        is_dead: false,
        is_private: false,
        personality_name: ["Goals", "Fears"],
        personality_entry: ["To become a hero", "Spiders"],
    }),
    Effect.tap((response) => Effect.logInfo(`Created character: ${response.data.name}`)),
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
 * Example: Update a character
 */
export const updateCharacterExample = (characterId: number) => pipe(
    updateCharacter(characterId, {
        name: "Updated Character",
        entry: "This is an updated character",
        age: "32",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated character: ${response.data.name}`)),
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
 * Example: Delete a character
 */
export const deleteCharacterExample = (characterId: number) => pipe(
    deleteCharacter(characterId),
    Effect.tap(() => Effect.logInfo(`Deleted character with ID: ${characterId}`)),
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
