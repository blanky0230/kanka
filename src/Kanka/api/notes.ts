import {
    Note,
    CreateNoteParams,
    UpdateNoteParams,
} from "../schemas/notes.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all notes with optional filtering
 */
export const getNotes = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    type?: string;
    note_id?: number;
    is_pinned?: number;
}) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        name: params?.name,
        is_private: params?.is_private,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        type: params?.type,
        note_id: params?.note_id,
        is_pinned: params?.is_pinned,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Note>>("notes", queryParams);
};

/**
 * Get a note by ID
 */
export const getNote = (id: number) => {
    return get<SingleResponse<Note>>(`notes/${id}`);
};

/**
 * Create a new note
 */
export const createNote = (params: CreateNoteParams) => {
    return post<SingleResponse<Note>>("notes", params);
};

/**
 * Update a note
 */
export const updateNote = (id: number, params: UpdateNoteParams) => {
    return put<SingleResponse<Note>>(`notes/${id}`, params);
};

/**
 * Delete a note
 */
export const deleteNote = (id: number) => {
    return del<void>(`notes/${id}`);
};
