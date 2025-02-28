import {
    KankaTag,
    CreateTagParams,
    UpdateTagParams,
} from "../schemas/tags.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all tags with optional filtering
 */
export const getTags = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaTag>>("tags", queryParams);
};

/**
 * Get a tag by ID
 */
export const getTag = (id: number) => {
    return get<SingleResponse<KankaTag>>(`tags/${id}`);
};

/**
 * Create a new tag
 */
export const createTag = (params: CreateTagParams) => {
    return post<SingleResponse<KankaTag>>("tags", params);
};

/**
 * Update a tag
 */
export const updateTag = (id: number, params: UpdateTagParams) => {
    return put<SingleResponse<KankaTag>>(`tags/${id}`, params);
};

/**
 * Delete a tag
 */
export const deleteTag = (id: number) => {
    return del<void>(`tags/${id}`);
};
