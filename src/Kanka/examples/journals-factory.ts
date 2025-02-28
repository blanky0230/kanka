import { Effect, pipe } from "effect";
import { getJournalsFactory, getJournalFactory, createJournalFactory, updateJournalFactory, deleteJournalFactory } from "../api/journals-factory.js";
import { CreateJournalParams, UpdateJournalParams } from "../schemas/journals.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all journals using the factory API
 */
export const getAllJournalsFactoryExample = pipe(
    getJournalsFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} journals`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all journals with filtering
 */
export const getFilteredJournalsExample = pipe(
    getJournalsFactory({
        name: "Campaign Notes",
        is_private: false,
        type: "Session",
        date: "2023-01-01",
        journal_id: 1, // Replace with real parent journal ID
        author_id: 2, // Replace with real author entity ID
        tags: [1, 2, 3], // Replace with real tag IDs
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered journals`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get a journal by ID using the factory API
 */
export const getJournalFactoryExample = (journalId: number) => pipe(
    getJournalFactory(journalId),
    Effect.tap((response) => Effect.logInfo(`Journal: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new journal using the factory API
 */
export const createJournalFactoryExample = pipe(
    createJournalFactory({
        name: "Session 1: The Adventure Begins",
        entry: "<p>Our heroes met in a tavern and decided to embark on a quest together.</p>",
        type: "Session",
        date: "2023-01-01",
        author_id: 2, // Replace with real author entity ID
        is_private: false,
    } as CreateJournalParams),
    Effect.tap((response) => Effect.logInfo(`Created journal: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update a journal using the factory API
 */
export const updateJournalFactoryExample = (journalId: number) => pipe(
    updateJournalFactory(journalId, {
        entry: "<p>Our heroes met in a tavern and decided to embark on a quest together. They fought goblins and found a mysterious artifact.</p>",
        journal_id: 3, // Replace with real parent journal ID
    } as UpdateJournalParams),
    Effect.tap((response) => Effect.logInfo(`Updated journal: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete a journal using the factory API
 */
export const deleteJournalFactoryExample = (journalId: number) => pipe(
    deleteJournalFactory(journalId),
    Effect.tap(() => Effect.logInfo(`Deleted journal with ID: ${journalId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all journal examples
 */
export const runJournalExamples = async () => {
    // Get all journals
    await Effect.runPromise(getAllJournalsFactoryExample);

    // Get filtered journals
    await Effect.runPromise(getFilteredJournalsExample);

    // Get a specific journal (replace with a real journal ID)
    // await Effect.runPromise(getJournalFactoryExample(123));

    // Create a new journal
    // await Effect.runPromise(createJournalFactoryExample);

    // Update a journal (replace with a real journal ID)
    // await Effect.runPromise(updateJournalFactoryExample(123));

    // Delete a journal (replace with a real journal ID)
    // await Effect.runPromise(deleteJournalFactoryExample(123));
};
