import {
    KankaAbility,
    CreateAbilityParams,
    UpdateAbilityParams,
} from "../schemas/abilities.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all abilities with optional filtering
 */
export const getAbilities = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaAbility>>("abilities", queryParams);
};

/**
 * Get an ability by ID
 */
export const getAbility = (id: number) => {
    return get<SingleResponse<KankaAbility>>(`abilities/${id}`);
};

/**
 * Create a new ability
 */
export const createAbility = (params: CreateAbilityParams) => {
    return post<SingleResponse<KankaAbility>>("abilities", params);
};

/**
 * Update an ability
 */
export const updateAbility = (id: number, params: UpdateAbilityParams) => {
    return put<SingleResponse<KankaAbility>>(`abilities/${id}`, params);
};

/**
 * Delete an ability
 */
export const deleteAbility = (id: number) => {
    return del<void>(`abilities/${id}`);
};
