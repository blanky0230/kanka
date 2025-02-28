import { Effect, pipe } from "effect";
import { getEntityTags, getEntityTag, createEntityTag, updateEntityTag, deleteEntityTag } from "../api/entity-tags.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all tags of an entity
 */
export const getEntityTagsExample = (entityId: number) => pipe(
    getEntityTags(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entity tags for entity ${entityId}`)),
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
 * Example: Get a specific entity tag
 */
export const getEntityTagExample = (entityId: number, entityTagId: number) => pipe(
    getEntityTag(entityId, entityTagId),
    Effect.tap(() => Effect.logInfo(`Found entity tag ${entityTagId} for entity ${entityId}`)),
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
 * Example: Create an entity tag
 */
export const createEntityTagExample = (entityId: number, tagId: number) => pipe(
    createEntityTag(entityId, { entity_id: entityId, tag_id: tagId }),
    Effect.tap((response) => Effect.logInfo(`Created entity tag ${response.data.id} for entity ${entityId}`)),
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
 * Example: Update an entity tag
 */
export const updateEntityTagExample = (entityId: number, entityTagId: number, tagId: number) => pipe(
    updateEntityTag(entityId, entityTagId, { tag_id: tagId }),
    Effect.tap(() => Effect.logInfo(`Updated entity tag ${entityTagId} for entity ${entityId}`)),
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
 * Example: Delete an entity tag
 */
export const deleteEntityTagExample = (entityId: number, entityTagId: number) => pipe(
    deleteEntityTag(entityId, entityTagId),
    Effect.tap(() => Effect.logInfo(`Deleted entity tag ${entityTagId} from entity ${entityId}`)),
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
