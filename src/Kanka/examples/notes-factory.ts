import { Effect, pipe } from "effect";
import { getNotesFactory, getNoteFactory, createNoteFactory, updateNoteFactory, deleteNoteFactory } from "../api/notes-factory.js";
import { CreateNoteParams, UpdateNoteParams } from "../schemas/notes.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all notes using the factory API
 */
export const getAllNotesFactoryExample = pipe(
    getNotesFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} notes`)),
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
 * Example: Get all notes with filtering
 */
export const getFilteredNotesExample = pipe(
    getNotesFactory({
        name: "Important Lore",
        is_private: false,
        type: "Lore",
        tags: [1, 2, 3], // Replace with real tag IDs
        note_id: 4, // Replace with real parent note ID
        is_pinned: 1,
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered notes`)),
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
 * Example: Get a note by ID using the factory API
 */
export const getNoteFactoryExample = (noteId: number) => pipe(
    getNoteFactory(noteId),
    Effect.tap((response) => Effect.logInfo(`Note: ${response.data.name}`)),
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
 * Example: Create a new note using the factory API
 */
export const createNoteFactoryExample = pipe(
    createNoteFactory({
        name: "New Note",
        entry: "This is a test note created with the Kanka API client factory",
        type: "Lore",
        is_private: false,
    } as CreateNoteParams),
    Effect.tap((response) => Effect.logInfo(`Created note: ${response.data.name}`)),
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
 * Example: Update a note using the factory API
 */
export const updateNoteFactoryExample = (noteId: number) => pipe(
    updateNoteFactory(noteId, {
        name: "Updated Note",
        entry: "This is an updated note using the factory API",
        type: "History",
    } as UpdateNoteParams),
    Effect.tap((response) => Effect.logInfo(`Updated note: ${response.data.name}`)),
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
 * Example: Delete a note using the factory API
 */
export const deleteNoteFactoryExample = (noteId: number) => pipe(
    deleteNoteFactory(noteId),
    Effect.tap(() => Effect.logInfo(`Deleted note with ID: ${noteId}`)),
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
 * Run all note examples
 */
export const runNoteExamples = async () => {
    // Get all notes
    await Effect.runPromise(getAllNotesFactoryExample);

    // Get filtered notes
    await Effect.runPromise(getFilteredNotesExample);

    // Get a specific note (replace with a real note ID)
    // await Effect.runPromise(getNoteFactoryExample(123));

    // Create a new note
    // await Effect.runPromise(createNoteFactoryExample);

    // Update a note (replace with a real note ID)
    // await Effect.runPromise(updateNoteFactoryExample(123));

    // Delete a note (replace with a real note ID)
    // await Effect.runPromise(deleteNoteFactoryExample(123));
};
