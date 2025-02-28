import { Effect, pipe } from "effect";
import { getImages, getImage, createImage, updateImage, deleteImage } from "../api/images.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all images
 */
export const getAllImagesExample = pipe(
    getImages(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} images`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Get a single image
 */
export const getImageExample = (imageId: string) => pipe(
    getImage(imageId),
    Effect.tap((response) => Effect.logInfo(`Image: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a new image
 * Note: This example requires a File object which is only available in browser environments
 */
export const createImageExample = (imageFile: File, folderId?: number, visibilityId?: number) => pipe(
    createImage({
        file: imageFile,
        folder_id: folderId,
        visibility_id: visibilityId
    }),
    Effect.tap((response) => Effect.logInfo(`Created image: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Update an image
 */
export const updateImageExample = (imageId: string, name: string, folderId?: number) => pipe(
    updateImage(imageId, {
        name,
        folder_id: folderId
    }),
    Effect.tap((response) => Effect.logInfo(`Updated image: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Delete an image
 */
export const deleteImageExample = (imageId: string) => pipe(
    deleteImage(imageId),
    Effect.tap(() => Effect.logInfo(`Deleted image with ID: ${imageId}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);
