import {
    KankaEntityAbility,
    CreateEntityAbilityParams,
    UpdateEntityAbilityParams,
} from "../schemas/entity-abilities.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all abilities for an entity
 */
export const getEntityAbilities = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaEntityAbility>>(`entities/${entityId}/entity_abilities`, queryParams);
};

/**
 * Get an ability by ID for an entity
 */
export const getEntityAbility = (entityId: number, abilityId: number) => {
    return get<SingleResponse<KankaEntityAbility>>(`entities/${entityId}/entity_abilities/${abilityId}`);
};

/**
 * Create a new ability for an entity
 */
export const createEntityAbility = (entityId: number, params: CreateEntityAbilityParams) => {
    return post<SingleResponse<KankaEntityAbility>>(`entities/${entityId}/entity_abilities`, params);
};

/**
 * Update an ability for an entity
 */
export const updateEntityAbility = (entityId: number, abilityId: number, params: UpdateEntityAbilityParams) => {
    return put<SingleResponse<KankaEntityAbility>>(`entities/${entityId}/entity_abilities/${abilityId}`, params);
};

/**
 * Delete an ability from an entity
 */
export const deleteEntityAbility = (entityId: number, abilityId: number) => {
    return del<void>(`entities/${entityId}/entity_abilities/${abilityId}`);
};
