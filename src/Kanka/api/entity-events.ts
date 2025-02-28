import {
    KankaEntityEvent,
    CreateEntityEventParams,
    UpdateEntityEventParams,
} from "../schemas/entity-events.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all entity events for an entity
 */
export const getEntityEvents = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaEntityEvent>>(`entities/${entityId}/entity_events`, queryParams);
};

/**
 * Get an entity event by ID for an entity
 */
export const getEntityEvent = (entityId: number, entityEventId: number) => {
    return get<SingleResponse<KankaEntityEvent>>(`entities/${entityId}/entity_events/${entityEventId}`);
};

/**
 * Create a new entity event for an entity
 */
export const createEntityEvent = (entityId: number, params: CreateEntityEventParams) => {
    return post<SingleResponse<KankaEntityEvent>>(`entities/${entityId}/entity_events`, params);
};

/**
 * Update an entity event for an entity
 */
export const updateEntityEvent = (entityId: number, entityEventId: number, params: UpdateEntityEventParams) => {
    return put<SingleResponse<KankaEntityEvent>>(`entities/${entityId}/entity_events/${entityEventId}`, params);
};

/**
 * Delete an entity event from an entity
 */
export const deleteEntityEvent = (entityId: number, entityEventId: number) => {
    return del<void>(`entities/${entityId}/entity_events/${entityEventId}`);
};
