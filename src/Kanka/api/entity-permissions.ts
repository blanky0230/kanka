import { KankaEntityPermission, CreateEntityPermissionParams } from "../schemas/entity-permissions.js";
import { PaginatedResponse } from "../schemas/common.js";
import { get, post } from "./client.js";

/**
 * Get all permissions of an entity
 */
export const getEntityPermissions = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaEntityPermission>>(`entities/${entityId}/entity_permissions`, queryParams);
};

/**
 * Create entity permissions
 * 
 * Note: This API returns an array of created permissions, unlike most other APIs
 * which return a single object wrapped in a data property.
 */
export const createEntityPermission = (entityId: number, params: CreateEntityPermissionParams) => {
    return post<{ data: KankaEntityPermission[] }>(`entities/${entityId}/entity_permissions`, params);
};
