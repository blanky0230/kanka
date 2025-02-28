import {
    Character,
    CreateCharacterParams,
    UpdateCharacterParams,
} from "../schemas/characters.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { LastSyncParams } from "../schemas/last-sync.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all characters with optional filtering
 */
export const getCharacters = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    is_template?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    lastSync?: string; // Last sync timestamp
}) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        name: params?.name,
        is_private: params?.is_private,
        is_template: params?.is_template,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        lastSync: params?.lastSync,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Character>>("characters", queryParams);
};

/**
 * Get a character by ID
 */
export const getCharacter = (id: number) => {
    return get<SingleResponse<Character>>(`characters/${id}`);
};

/**
 * Create a new character
 */
export const createCharacter = (params: CreateCharacterParams) => {
    return post<SingleResponse<Character>>("characters", params);
};

/**
 * Update a character
 */
export const updateCharacter = (id: number, params: UpdateCharacterParams) => {
    return put<SingleResponse<Character>>(`characters/${id}`, params);
};

/**
 * Delete a character
 */
export const deleteCharacter = (id: number) => {
    return del<void>(`characters/${id}`);
};
