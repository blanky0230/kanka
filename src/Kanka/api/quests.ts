import {
    Quest,
    QuestElement,
    CreateQuestParams,
    UpdateQuestParams,
    CreateQuestElementParams,
    UpdateQuestElementParams,
} from "../schemas/quests.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all quests with optional filtering
 */
export const getQuests = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    type?: string;
    is_completed?: boolean;
    quest_id?: number;
    instigator_id?: number;
    location_id?: number;
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
        is_completed: params?.is_completed,
        quest_id: params?.quest_id,
        instigator_id: params?.instigator_id,
        location_id: params?.location_id,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Quest>>("quests", queryParams);
};

/**
 * Get a quest by ID
 */
export const getQuest = (id: number) => {
    return get<SingleResponse<Quest>>(`quests/${id}`);
};

/**
 * Create a new quest
 */
export const createQuest = (params: CreateQuestParams) => {
    return post<SingleResponse<Quest>>("quests", params);
};

/**
 * Update a quest
 */
export const updateQuest = (id: number, params: UpdateQuestParams) => {
    return put<SingleResponse<Quest>>(`quests/${id}`, params);
};

/**
 * Delete a quest
 */
export const deleteQuest = (id: number) => {
    return del<void>(`quests/${id}`);
};

/**
 * Get all elements for a quest
 */
export const getQuestElements = (questId: number) => {
    return get<PaginatedResponse<QuestElement>>(`quests/${questId}/quest_elements`);
};

/**
 * Get a specific element from a quest
 */
export const getQuestElement = (questId: number, elementId: number) => {
    return get<SingleResponse<QuestElement>>(`quests/${questId}/quest_elements/${elementId}`);
};

/**
 * Create a new element for a quest
 */
export const createQuestElement = (questId: number, params: CreateQuestElementParams) => {
    return post<SingleResponse<QuestElement>>(`quests/${questId}/quest_elements`, params);
};

/**
 * Update an element in a quest
 */
export const updateQuestElement = (questId: number, elementId: number, params: UpdateQuestElementParams) => {
    return put<SingleResponse<QuestElement>>(`quests/${questId}/quest_elements/${elementId}`, params);
};

/**
 * Delete an element from a quest
 */
export const deleteQuestElement = (questId: number, elementId: number) => {
    return del<void>(`quests/${questId}/quest_elements/${elementId}`);
};
