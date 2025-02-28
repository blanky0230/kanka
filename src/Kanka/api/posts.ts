import {
    KankaPost,
    CreatePostParams,
    UpdatePostParams,
} from "../schemas/posts.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all posts for an entity
 */
export const getEntityPosts = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaPost>>(`entities/${entityId}/posts`, queryParams);
};

/**
 * Get a post by ID for an entity
 */
export const getEntityPost = (entityId: number, postId: number) => {
    return get<SingleResponse<KankaPost>>(`entities/${entityId}/posts/${postId}`);
};

/**
 * Create a new post for an entity
 */
export const createEntityPost = (entityId: number, params: CreatePostParams) => {
    return post<SingleResponse<KankaPost>>(`entities/${entityId}/posts`, params);
};

/**
 * Update a post for an entity
 */
export const updateEntityPost = (entityId: number, postId: number, params: UpdatePostParams) => {
    return put<SingleResponse<KankaPost>>(`entities/${entityId}/posts/${postId}`, params);
};

/**
 * Delete a post from an entity
 */
export const deleteEntityPost = (entityId: number, postId: number) => {
    return del<void>(`entities/${entityId}/posts/${postId}`);
};

/**
 * Get deleted posts that can be recovered
 */
export const getDeletedPosts = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaPost>>(`recovery/posts`, queryParams);
};

/**
 * Recover deleted posts (premium only feature)
 */
export const recoverPosts = (postIds: number[]) => {
    return post<void>(`recover/posts`, { posts: postIds });
};
