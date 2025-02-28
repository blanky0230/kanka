import {
    DefaultThumbnail,
    CreateDefaultThumbnailParams,
    DeleteDefaultThumbnailParams,
} from "../schemas/default-thumbnails.js";
import { PaginatedResponse } from "../schemas/common.js";
import { del, get, uploadFile } from "./client.js";

/**
 * Get all default thumbnails
 * Note: This is a premium campaign feature. If the campaign isn't premium, this API endpoint will result in a 404.
 */
export const getDefaultThumbnails = (params?: {
    page?: number;
    perPage?: number;
    lastSync?: string;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        lastSync: params?.lastSync,
    };

    return get<PaginatedResponse<DefaultThumbnail>>("default-thumbnails", queryParams);
};

/**
 * Create a default thumbnail
 */
export const createDefaultThumbnail = (params: CreateDefaultThumbnailParams) => {
    const formData = new FormData();
    formData.append('entity_type', params.entity_type.toString());

    if (params.default_entity_image) {
        formData.append('default_entity_image', params.default_entity_image);
    }

    return uploadFile<void>("default-thumbnails", formData);
};

/**
 * Delete a default thumbnail
 */
export const deleteDefaultThumbnail = (params: DeleteDefaultThumbnailParams) => {
    // The API expects the entity_type in the body for DELETE requests
    // We need to use a custom implementation since del() doesn't support body
    const formData = new FormData();
    formData.append('entity_type', params.entity_type.toString());

    return uploadFile<void>("default-thumbnails", formData, {
        method: 'DELETE'
    });
};
