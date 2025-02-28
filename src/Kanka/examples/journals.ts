import { Effect, pipe } from "effect";
import { getJournal, getJournals, createJournal, updateJournal, deleteJournal } from "../api/journals.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all journals
 */
export const getAllJournalsExample = pipe(
    getJournals(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} journals`)),
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
 * Example: Get a journal by ID
 */
export const getJournalExample = (journalId: number) => pipe(
    getJournal(journalId),
    Effect.tap((response) => Effect.logInfo(`Journal: ${response.data.name}`)),
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
 * Example: Create a new journal
 */
export const createJournalExample = pipe(
    createJournal({
        name: "New Journal",
        entry: "This is a test journal created with the Kanka API client",
        type: "Session",
        date: "2025-02-28",
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created journal: ${response.data.name}`)),
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
 * Example: Update a journal
 */
export const updateJournalExample = (journalId: number) => pipe(
    updateJournal(journalId, {
        name: "Updated Journal",
        entry: "This is an updated journal",
        type: "Lore",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated journal: ${response.data.name}`)),
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
 * Example: Delete a journal
 */
export const deleteJournalExample = (journalId: number) => pipe(
    deleteJournal(journalId),
    Effect.tap(() => Effect.logInfo(`Deleted journal with ID: ${journalId}`)),
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
