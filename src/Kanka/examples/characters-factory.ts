import { Effect, pipe } from "effect";
import { getCharactersFactory, getCharacterFactory, createCharacterFactory, updateCharacterFactory, deleteCharacterFactory } from "../api/characters-factory.js";
import { CreateCharacterParams, UpdateCharacterParams } from "../schemas/characters.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all characters using the factory API
 */
export const getAllCharactersFactoryExample = pipe(
    getCharactersFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all characters with filtering
 */
export const getFilteredCharactersExample = pipe(
    getCharactersFactory({
        name: "Gandalf",
        is_template: false,
        is_dead: false,
        type: "NPC",
        tags: [1, 2, 3], // Replace with real tag IDs
        races: [4, 5], // Replace with real race IDs
        families: [6, 7], // Replace with real family IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered characters`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a character by ID using the factory API
 */
export const getCharacterFactoryExample = (characterId: number) => pipe(
    getCharacterFactory(characterId),
    Effect.tap((response) => Effect.logInfo(`Character: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new character using the factory API
 */
export const createCharacterFactoryExample = pipe(
    createCharacterFactory({
        name: "Aragorn",
        entry: "<p>Heir of Isildur, rightful King of Gondor</p>",
        title: "Strider",
        type: "PC",
        is_private: false,
    } as CreateCharacterParams),
    Effect.tap((response) => Effect.logInfo(`Created character: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a character using the factory API
 */
export const updateCharacterFactoryExample = (characterId: number) => pipe(
    updateCharacterFactory(characterId, {
        title: "King of Gondor",
        is_dead: false,
    } as UpdateCharacterParams),
    Effect.tap((response) => Effect.logInfo(`Updated character: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a character using the factory API
 */
export const deleteCharacterFactoryExample = (characterId: number) => pipe(
    deleteCharacterFactory(characterId),
    Effect.tap(() => Effect.logInfo(`Deleted character with ID: ${characterId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all character examples
 */
export const runCharacterExamples = async () => {
    // Get all characters
    await Effect.runPromise(getAllCharactersFactoryExample);

    // Get filtered characters
    await Effect.runPromise(getFilteredCharactersExample);

    // Get a specific character (replace with a real character ID)
    // await Effect.runPromise(getCharacterFactoryExample(123));

    // Create a new character
    // await Effect.runPromise(createCharacterFactoryExample);

    // Update a character (replace with a real character ID)
    // await Effect.runPromise(updateCharacterFactoryExample(123));

    // Delete a character (replace with a real character ID)
    // await Effect.runPromise(deleteCharacterFactoryExample(123));
};
