import { Effect, pipe } from "effect";
import { getDefaultThumbnails, createDefaultThumbnail, deleteDefaultThumbnail } from "../api/default-thumbnails.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all default thumbnails
 * Note: This is a premium campaign feature. If the campaign isn't premium, this API endpoint will result in a 404.
 */
export const getAllDefaultThumbnailsExample = pipe(
    getDefaultThumbnails(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} default thumbnails`)),
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
 * Example: Create a default thumbnail for an entity type
 * Note: This example requires a File object which is only available in browser environments
 */
export const createDefaultThumbnailExample = (entityTypeId: number, imageFile: File) => pipe(
    createDefaultThumbnail({
        entity_type: entityTypeId,
        default_entity_image: imageFile
    }),
    Effect.tap(() => Effect.logInfo(`Created default thumbnail for entity type ${entityTypeId}`)),
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
 * Example: Delete a default thumbnail for an entity type
 */
export const deleteDefaultThumbnailExample = (entityTypeId: number) => pipe(
    deleteDefaultThumbnail({
        entity_type: entityTypeId
    }),
    Effect.tap(() => Effect.logInfo(`Deleted default thumbnail for entity type ${entityTypeId}`)),
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
