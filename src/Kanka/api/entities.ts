import {
    Entity,
    FilterEntitiesParams,
    CreateEntityParams,
    TransformEntitiesParams,
    TransferEntitiesParams,
    RecoverEntitiesParams,
} from "../schemas/entities.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post } from "./client.js";

/**
 * Get all entities with optional filtering
 */
export const getEntities = (params?: FilterEntitiesParams) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        types: params?.types,
        name: params?.name,
        is_private: params?.is_private,
        is_template: params?.is_template,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        page: params?.page,
        per_page: params?.perPage,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Entity>>("entities", queryParams);
};

/**
 * Get a single entity by ID
 */
export const getEntity = (id: number) => {
    return get<SingleResponse<Entity>>(`entities/${id}`);
};

/**
 * Get a single entity by ID with related objects
 */
export const getEntityWithRelated = (id: number) => {
    return get<SingleResponse<Entity>>(`entities/${id}`, { related: 1 });
};

/**
 * Get recently modified entities
 */
export const getRecentEntities = (amount: number = 1) => {
    // Ensure amount is between 1 and 10
    const validAmount = Math.min(Math.max(amount, 1), 10);
    return get<PaginatedResponse<Entity>>("entities/recent", { amount: validAmount });
};

/**
 * Create multiple entities at once (up to 20)
 */
export const createEntities = (entities: CreateEntityParams[]) => {
    // Ensure we don't exceed the limit of 20 entities
    const validEntities = entities.slice(0, 20);
    return post<PaginatedResponse<Entity>>("entities", { entities: validEntities });
};

/**
 * Transform entities to a different type
 */
export const transformEntities = (params: TransformEntitiesParams) => {
    return post<void>("transform", params);
};

/**
 * Transfer or copy entities to another campaign
 */
export const transferEntities = (params: TransferEntitiesParams) => {
    return post<PaginatedResponse<Entity>>("transfer", params);
};

/**
 * Get recoverable deleted entities
 */
export const getDeletedEntities = () => {
    return get<PaginatedResponse<Entity>>("recovery");
};

/**
 * Recover deleted entities
 */
export const recoverEntities = (params: RecoverEntitiesParams) => {
    return post<void>("recover", params);
};
