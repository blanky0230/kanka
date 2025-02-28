import { Effect, pipe } from "effect";
import { getQuestsFactory, getQuestFactory, createQuestFactory, updateQuestFactory, deleteQuestFactory, getQuestElementsFactory, getQuestElementFactory, createQuestElementFactory, updateQuestElementFactory, deleteQuestElementFactory } from "../api/quests-factory.js";
import { CreateQuestParams, UpdateQuestParams, CreateQuestElementParams, UpdateQuestElementParams } from "../schemas/quests.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all quests using the factory API
 */
export const getAllQuestsFactoryExample = pipe(
    getQuestsFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} quests`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all quests with filtering
 */
export const getFilteredQuestsExample = pipe(
    getQuestsFactory({
        name: "The Ring Bearer's Quest",
        is_private: false,
        type: "Main",
        is_completed: false,
        quest_id: 1, // Replace with real parent quest ID
        instigator_id: 2, // Replace with real instigator entity ID
        location_id: 3, // Replace with real location ID
        tags: [1, 2, 3], // Replace with real tag IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered quests`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a quest by ID using the factory API
 */
export const getQuestFactoryExample = (questId: number) => pipe(
    getQuestFactory(questId),
    Effect.tap((response) => Effect.logInfo(`Quest: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new quest using the factory API
 */
export const createQuestFactoryExample = pipe(
    createQuestFactory({
        name: "Destroy the One Ring",
        entry: "<p>A quest to destroy the One Ring in the fires of Mount Doom.</p>",
        type: "Main",
        is_completed: false,
        instigator_id: 2, // Replace with real instigator entity ID
        location_id: 3, // Replace with real location ID
        is_private: false,
    } as CreateQuestParams),
    Effect.tap((response) => Effect.logInfo(`Created quest: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a quest using the factory API
 */
export const updateQuestFactoryExample = (questId: number) => pipe(
    updateQuestFactory(questId, {
        entry: "<p>A quest to destroy the One Ring in the fires of Mount Doom. Assigned to Frodo Baggins.</p>",
        is_completed: true,
    } as UpdateQuestParams),
    Effect.tap((response) => Effect.logInfo(`Updated quest: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a quest using the factory API
 */
export const deleteQuestFactoryExample = (questId: number) => pipe(
    deleteQuestFactory(questId),
    Effect.tap(() => Effect.logInfo(`Deleted quest with ID: ${questId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all elements for a quest
 */
export const getQuestElementsFactoryExample = (questId: number) => pipe(
    getQuestElementsFactory(questId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} quest elements`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a specific element from a quest
 */
export const getQuestElementFactoryExample = (questId: number, elementId: number) => pipe(
    getQuestElementFactory(questId, elementId),
    Effect.tap((response) => Effect.logInfo(`Quest element: ${response.data.name || response.data.entity_id}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new element for a quest
 */
export const createQuestElementFactoryExample = (questId: number) => pipe(
    createQuestElementFactory(questId, {
        entity_id: 4, // Replace with real entity ID
        role: "Character",
        description: "The ring bearer who must carry the One Ring to Mount Doom.",
    } as CreateQuestElementParams),
    Effect.tap((response) => Effect.logInfo(`Created quest element with ID: ${response.data.id}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update an element in a quest
 */
export const updateQuestElementFactoryExample = (questId: number, elementId: number) => pipe(
    updateQuestElementFactory(questId, elementId, {
        description: "The ring bearer who must carry the One Ring to Mount Doom. Accompanied by Samwise Gamgee.",
    } as UpdateQuestElementParams),
    Effect.tap((response) => Effect.logInfo(`Updated quest element with ID: ${response.data.id}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete an element from a quest
 */
export const deleteQuestElementFactoryExample = (questId: number, elementId: number) => pipe(
    deleteQuestElementFactory(questId, elementId),
    Effect.tap(() => Effect.logInfo(`Deleted quest element with ID: ${elementId} from quest ID: ${questId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all quest examples
 */
export const runQuestExamples = async () => {
    // Get all quests
    await Effect.runPromise(getAllQuestsFactoryExample);

    // Get filtered quests
    await Effect.runPromise(getFilteredQuestsExample);

    // Get a specific quest (replace with a real quest ID)
    // await Effect.runPromise(getQuestFactoryExample(123));

    // Create a new quest
    // await Effect.runPromise(createQuestFactoryExample);

    // Update a quest (replace with a real quest ID)
    // await Effect.runPromise(updateQuestFactoryExample(123));

    // Delete a quest (replace with a real quest ID)
    // await Effect.runPromise(deleteQuestFactoryExample(123));

    // Get all elements for a quest (replace with a real quest ID)
    // await Effect.runPromise(getQuestElementsFactoryExample(123));

    // Get a specific element from a quest (replace with real quest and element IDs)
    // await Effect.runPromise(getQuestElementFactoryExample(123, 456));

    // Create a new element for a quest (replace with a real quest ID)
    // await Effect.runPromise(createQuestElementFactoryExample(123));

    // Update an element in a quest (replace with real quest and element IDs)
    // await Effect.runPromise(updateQuestElementFactoryExample(123, 456));

    // Delete an element from a quest (replace with real quest and element IDs)
    // await Effect.runPromise(deleteQuestElementFactoryExample(123, 456));
};
