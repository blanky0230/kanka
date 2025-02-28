import {
    Image,
    CreateImageParams,
    UpdateImageParams,
} from "../schemas/images.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, put, uploadFile } from "./client.js";

/**
 * Get all images
 */
export const getImages = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<Image>>("images", queryParams);
};

/**
 * Get a single image by ID
 */
export const getImage = (id: string) => {
    return get<SingleResponse<Image>>(`images/${id}`);
};

/**
 * Create a new image
 */
export const createImage = (params: CreateImageParams) => {
    const formData = new FormData();

    if (params.folder_id) {
        formData.append('folder_id', params.folder_id.toString());
    }

    formData.append('file[]', params.file);

    if (params.visibility_id) {
        formData.append('visibility_id', params.visibility_id.toString());
    }

    return uploadFile<SingleResponse<Image>>("images", formData);
};

/**
 * Update an image
 */
export const updateImage = (id: string, params: UpdateImageParams) => {
    return put<SingleResponse<Image>>(`images/${id}`, params);
};

/**
 * Delete an image
 */
export const deleteImage = (id: string) => {
    return del<void>(`images/${id}`);
};

/**
 * Create a folder (Note: Currently not supported by the Kanka API)
 */
export const createImageFolder = () => {
    throw new Error("Creating image folders is not currently supported by the Kanka API");
};
