import { KankaEntityImageResponse } from "../schemas/entity-image.js";
import { SingleResponse } from "../schemas/common.js";
import { del, uploadFile } from "./client.js";

/**
 * Upload an image for an entity
 */
export const uploadEntityImage = (entityId: number, imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return uploadFile<SingleResponse<KankaEntityImageResponse>>(`entities/${entityId}/image`, formData);
};

/**
 * Remove an image from an entity
 */
export const removeEntityImage = (entityId: number) => {
    return del<SingleResponse<KankaEntityImageResponse>>(`entities/${entityId}/image`);
};
