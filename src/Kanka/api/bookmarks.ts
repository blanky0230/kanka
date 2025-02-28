import {
    Bookmark,
    CreateBookmarkParams,
    UpdateBookmarkParams,
} from "../schemas/bookmarks.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all bookmarks with optional filtering
 */
export const getBookmarks = (params?: {
    page?: number;
    perPage?: number;
    lastSync?: string;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        lastSync: params?.lastSync,
    };

    return get<PaginatedResponse<Bookmark>>("bookmarks", queryParams);
};

/**
 * Get a bookmark by ID
 */
export const getBookmark = (id: number) => {
    return get<SingleResponse<Bookmark>>(`bookmarks/${id}`);
};

/**
 * Create a new bookmark
 */
export const createBookmark = (params: CreateBookmarkParams) => {
    return post<SingleResponse<Bookmark>>("bookmarks", params);
};

/**
 * Update a bookmark
 */
export const updateBookmark = (id: number, params: UpdateBookmarkParams) => {
    return put<SingleResponse<Bookmark>>(`bookmarks/${id}`, params);
};

/**
 * Delete a bookmark
 */
export const deleteBookmark = (id: number) => {
    return del<void>(`bookmarks/${id}`);
};
