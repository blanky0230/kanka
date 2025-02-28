import {
    KankaJournal,
    CreateJournalParams,
    UpdateJournalParams,
} from "../schemas/journals.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all journals with optional filtering
 */
export const getJournals = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaJournal>>("journals", queryParams);
};

/**
 * Get a journal by ID
 */
export const getJournal = (id: number) => {
    return get<SingleResponse<KankaJournal>>(`journals/${id}`);
};

/**
 * Create a new journal
 */
export const createJournal = (params: CreateJournalParams) => {
    return post<SingleResponse<KankaJournal>>("journals", params);
};

/**
 * Update a journal
 */
export const updateJournal = (id: number, params: UpdateJournalParams) => {
    return put<SingleResponse<KankaJournal>>(`journals/${id}`, params);
};

/**
 * Delete a journal
 */
export const deleteJournal = (id: number) => {
    return del<void>(`journals/${id}`);
};
