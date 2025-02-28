import {
    KankaEntityAsset,
    CreateEntityAssetParams,
    EntityAssetType
} from "../schemas/entity-assets.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, uploadFile } from "./client.js";

/**
 * Get all assets for an entity
 */
export const getEntityAssets = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaEntityAsset>>(`entities/${entityId}/entity_assets`, queryParams);
};

/**
 * Get an asset by ID for an entity
 */
export const getEntityAsset = (entityId: number, assetId: number) => {
    return get<SingleResponse<KankaEntityAsset>>(`entities/${entityId}/entity_assets/${assetId}`);
};

/**
 * Create a new asset for an entity
 * Note: For file assets, this requires special handling for file uploads
 */
export const createEntityAsset = (entityId: number, params: CreateEntityAssetParams) => {
    // Handle file uploads differently
    if (params.type_id === EntityAssetType.File && 'files' in params) {
        const formData = new FormData();
        formData.append('name', params.name);
        formData.append('type_id', params.type_id.toString());
        formData.append('files', params.files);

        if (params.visibility_id !== undefined) {
            formData.append('visibility_id', params.visibility_id.toString());
        }

        if (params.is_pinned !== undefined) {
            formData.append('is_pinned', params.is_pinned.toString());
        }

        return uploadFile<SingleResponse<KankaEntityAsset>>(`entities/${entityId}/entity_assets`, formData);
    }

    // Regular JSON request for other asset types
    return post<SingleResponse<KankaEntityAsset>>(`entities/${entityId}/entity_assets`, params);
};

/**
 * Delete an asset from an entity
 */
export const deleteEntityAsset = (entityId: number, assetId: number) => {
    return del<void>(`entities/${entityId}/entity_assets/${assetId}`);
};
