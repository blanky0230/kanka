import { Effect, pipe } from "effect";
import { removeEntityImage, uploadEntityImage } from "../api/entity-image.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Upload an image for an entity
 * Note: This example is for documentation purposes only as it requires a File object
 */
export const uploadEntityImageExample = (entityId: number, imageFile: File) => pipe(
    uploadEntityImage(entityId, imageFile),
    Effect.tap((response) => Effect.logInfo(`Uploaded image for entity ${entityId}: ${response.data.image}`)),
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
 * Example: Remove an image from an entity
 */
export const removeEntityImageExample = (entityId: number) => pipe(
    removeEntityImage(entityId),
    Effect.tap(() => Effect.logInfo(`Removed image from entity ${entityId}`)),
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
