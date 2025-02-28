import { Effect, pipe } from "effect";
import { getQuest, getQuests, createQuest, updateQuest, deleteQuest, getQuestElements, getQuestElement, createQuestElement, updateQuestElement, deleteQuestElement } from "../api/quests.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all quests
 */
export const getAllQuestsExample = pipe(
    getQuests(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} quests`)),
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
 * Example: Get a quest by ID
 */
export const getQuestExample = (questId: number) => pipe(
    getQuest(questId),
    Effect.tap((response) => Effect.logInfo(`Quest: ${response.data.name}`)),
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
 * Example: Create a new quest
 */
export const createQuestExample = pipe(
    createQuest({
        name: "New Quest",
        entry: "This is a test quest created with the Kanka API client",
        type: "Main",
        date: "2025-02-28",
        is_completed: false,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created quest: ${response.data.name}`)),
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
 * Example: Update a quest
 */
export const updateQuestExample = (questId: number) => pipe(
    updateQuest(questId, {
        name: "Updated Quest",
        entry: "This is an updated quest",
        is_completed: true,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated quest: ${response.data.name}`)),
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
 * Example: Delete a quest
 */
export const deleteQuestExample = (questId: number) => pipe(
    deleteQuest(questId),
    Effect.tap(() => Effect.logInfo(`Deleted quest with ID: ${questId}`)),
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
 * Example: Get all elements for a quest
 */
export const getQuestElementsExample = (questId: number) => pipe(
    getQuestElements(questId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} quest elements`)),
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
 * Example: Get a specific element from a quest
 */
export const getQuestElementExample = (questId: number, elementId: number) => pipe(
    getQuestElement(questId, elementId),
    Effect.tap((response) => Effect.logInfo(`Element: ${response.data.name || response.data.entity_id}`)),
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
 * Example: Create a new element for a quest
 */
export const createQuestElementExample = (questId: number) => pipe(
    createQuestElement(questId, {
        name: "New Quest Element",
        role: "Target",
        description: "This is a test quest element created with the Kanka API client",
    }),
    Effect.tap((response) => Effect.logInfo(`Created quest element with ID: ${response.data.id}`)),
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
 * Example: Update an element in a quest
 */
export const updateQuestElementExample = (questId: number, elementId: number) => pipe(
    updateQuestElement(questId, elementId, {
        name: "Updated Quest Element",
        role: "Ally",
        description: "This is an updated quest element",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated quest element with ID: ${response.data.id}`)),
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
 * Example: Delete an element from a quest
 */
export const deleteQuestElementExample = (questId: number, elementId: number) => pipe(
    deleteQuestElement(questId, elementId),
    Effect.tap(() => Effect.logInfo(`Deleted quest element with ID: ${elementId}`)),
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
