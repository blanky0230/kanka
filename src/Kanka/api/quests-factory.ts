import { Schema, Effect, pipe } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Quest, QuestSchema, QuestElement, QuestElementSchema, CreateQuestParams, UpdateQuestParams, CreateQuestElementParams, UpdateQuestElementParams } from "../schemas/quests.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { get, post, put, del } from "./client.js";
import { KankaError } from "../errors.js";

/**
 * Quests API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Quest entity type.
 */

// Type assertion to handle schema compatibility
const questSchema = QuestSchema as unknown as Schema.Schema<Quest, unknown>;

// Create the Quests API using the factory
const questApi = createEntityApi<Quest, CreateQuestParams, UpdateQuestParams>({
    basePath: "quests",
    schema: questSchema,
    // Custom query parameter transformer to handle quest-specific parameters
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

        // Quest-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.is_completed === 'boolean') queryParams.is_completed = params.is_completed;
        if (typeof params.quest_id === 'number') queryParams.quest_id = params.quest_id;
        if (typeof params.instigator_id === 'number') queryParams.instigator_id = params.instigator_id;
        if (typeof params.location_id === 'number') queryParams.location_id = params.location_id;

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
export const getQuestsFactory = questApi.getAll;
export const getQuestFactory = questApi.getOne;
export const createQuestFactory = questApi.create;
export const updateQuestFactory = questApi.update;
export const deleteQuestFactory = questApi.delete;

// Custom operations for quest elements

/**
 * Get all elements for a quest
 */
export const getQuestElementsFactory = (questId: number) => {
    return pipe(
        get<PaginatedResponse<QuestElement>>(`quests/${questId}/quest_elements`),
        Effect.catchAll((error) => {
            if (error instanceof KankaError) {
                return Effect.fail(error);
            }
            return Effect.fail(
                new KankaError({
                    message: `API error: ${String(error)}`,
                    cause: error
                })
            );
        })
    );
};

/**
 * Get a specific element from a quest
 */
export const getQuestElementFactory = (questId: number, elementId: number) => {
    return pipe(
        get<SingleResponse<QuestElement>>(`quests/${questId}/quest_elements/${elementId}`),
        Effect.catchAll((error) => {
            if (error instanceof KankaError) {
                return Effect.fail(error);
            }
            return Effect.fail(
                new KankaError({
                    message: `API error: ${String(error)}`,
                    cause: error
                })
            );
        })
    );
};

/**
 * Create a new element for a quest
 */
export const createQuestElementFactory = (questId: number, params: CreateQuestElementParams) => {
    return pipe(
        post<SingleResponse<QuestElement>>(`quests/${questId}/quest_elements`, params),
        Effect.catchAll((error) => {
            if (error instanceof KankaError) {
                return Effect.fail(error);
            }
            return Effect.fail(
                new KankaError({
                    message: `API error: ${String(error)}`,
                    cause: error
                })
            );
        })
    );
};

/**
 * Update an element in a quest
 */
export const updateQuestElementFactory = (questId: number, elementId: number, params: UpdateQuestElementParams) => {
    return pipe(
        put<SingleResponse<QuestElement>>(`quests/${questId}/quest_elements/${elementId}`, params),
        Effect.catchAll((error) => {
            if (error instanceof KankaError) {
                return Effect.fail(error);
            }
            return Effect.fail(
                new KankaError({
                    message: `API error: ${String(error)}`,
                    cause: error
                })
            );
        })
    );
};

/**
 * Delete an element from a quest
 */
export const deleteQuestElementFactory = (questId: number, elementId: number) => {
    return pipe(
        del<void>(`quests/${questId}/quest_elements/${elementId}`),
        Effect.catchAll((error) => {
            if (error instanceof KankaError) {
                return Effect.fail(error);
            }
            return Effect.fail(
                new KankaError({
                    message: `API error: ${String(error)}`,
                    cause: error
                })
            );
        })
    );
};
