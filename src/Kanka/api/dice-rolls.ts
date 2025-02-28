import {
    KankaDiceRoll,
    CreateDiceRollParams,
    UpdateDiceRollParams,
} from "../schemas/dice-rolls.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all dice rolls with optional filtering
 */
export const getDiceRolls = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaDiceRoll>>("dice_rolls", queryParams);
};

/**
 * Get a dice roll by ID
 */
export const getDiceRoll = (id: number) => {
    return get<SingleResponse<KankaDiceRoll>>(`dice_rolls/${id}`);
};

/**
 * Create a new dice roll
 */
export const createDiceRoll = (params: CreateDiceRollParams) => {
    return post<SingleResponse<KankaDiceRoll>>("dice_rolls", params);
};

/**
 * Update a dice roll
 */
export const updateDiceRoll = (id: number, params: UpdateDiceRollParams) => {
    return put<SingleResponse<KankaDiceRoll>>(`dice_rolls/${id}`, params);
};

/**
 * Delete a dice roll
 */
export const deleteDiceRoll = (id: number) => {
    return del<void>(`dice_rolls/${id}`);
};
