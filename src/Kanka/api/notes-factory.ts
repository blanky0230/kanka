import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Note, NoteSchema, CreateNoteParams, UpdateNoteParams } from "../schemas/notes.js";

/**
 * Notes API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Note entity type.
 */

// Type assertion to handle schema compatibility
const noteSchema = NoteSchema as unknown as Schema.Schema<Note, unknown>;

// Create the Notes API using the factory
const noteApi = createEntityApi<Note, CreateNoteParams, UpdateNoteParams>({
    basePath: "notes",
    schema: noteSchema,
    // Custom query parameter transformer to handle note-specific parameters
    transformQueryParams: (params) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        // Standard parameters
        if (typeof params.page === 'number') queryParams.page = params.page;
        if (typeof params.perPage === 'number') queryParams.per_page = params.perPage;
        if (typeof params.name === 'string') queryParams.name = params.name;
        if (typeof params.is_private === 'boolean') queryParams.is_private = params.is_private;
        if (typeof params.created_by === 'number') queryParams.created_by = params.created_by;
        if (typeof params.updated_by === 'number') queryParams.updated_by = params.updated_by;
        if (typeof params.lastSync === 'string') queryParams.lastSync = params.lastSync;

        // Note-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.note_id === 'number') queryParams.note_id = params.note_id;
        if (typeof params.is_pinned === 'number') queryParams.is_pinned = params.is_pinned;

        // Add tags as individual query parameters if present
        const tags = params.tags;
        if (tags && Array.isArray(tags) && tags.length > 0) {
            tags.forEach((tag, index) => {
                if (typeof tag === 'number') {
                    queryParams[`tags[${index}]`] = tag;
                }
            });
        }

        return queryParams;
    }
});

// Export the standard CRUD operations with factory suffix to avoid naming conflicts
export const getNotesFactory = noteApi.getAll;
export const getNoteFactory = noteApi.getOne;
export const createNoteFactory = noteApi.create;
export const updateNoteFactory = noteApi.update;
export const deleteNoteFactory = noteApi.delete;

// Note: We're not adding deprecated exports here to avoid naming conflicts
// with the original implementation in notes.js
