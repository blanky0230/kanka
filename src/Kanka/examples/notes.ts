import { Effect, pipe } from "effect";
import { getNote, getNotes, createNote, updateNote, deleteNote } from "../api/notes.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all notes
 */
export const getAllNotesExample = pipe(
    getNotes(),
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
 * Example: Get a note by ID
 */
export const getNoteExample = (noteId: number) => pipe(
    getNote(noteId),
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
 * Example: Create a new note
 */
export const createNoteExample = pipe(
    createNote({
        name: "New Note",
        entry: "This is a test note created with the Kanka API client",
        type: "Lore",
        is_private: false,
    }),
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
 * Example: Update a note
 */
export const updateNoteExample = (noteId: number) => pipe(
    updateNote(noteId, {
        name: "Updated Note",
        entry: "This is an updated note",
        type: "History",
    }),
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
 * Example: Delete a note
 */
export const deleteNoteExample = (noteId: number) => pipe(
    deleteNote(noteId),
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
