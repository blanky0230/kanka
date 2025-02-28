import { Effect, pipe } from "effect";
import {
    getEntityAssets,
    getEntityAsset,
    createEntityAsset,
    deleteEntityAsset
} from "../api/entity-assets.js";
import { EntityAssetType } from "../schemas/entity-assets.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all assets for an entity
 */
export const getEntityAssetsExample = (entityId: number) => pipe(
    getEntityAssets(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entity assets for entity ${entityId}`)),
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
 * Example: Get an asset by ID for an entity
 */
export const getEntityAssetExample = (entityId: number, assetId: number) => pipe(
    getEntityAsset(entityId, assetId),
    Effect.tap((response) => Effect.logInfo(`Entity Asset: ${response.data.name} (Type: ${response.data.type_id})`)),
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
 * Example: Create a new link asset for an entity
 */
export const createEntityLinkAssetExample = (entityId: number) => pipe(
    createEntityAsset(entityId, {
        name: "GitHub Repository",
        type_id: EntityAssetType.Link,
        metadata: {
            icon: "fab fa-github",
            url: "https://github.com/example/repo"
        },
        visibility_id: 1 // 'all'
    }),
    Effect.tap((response) => Effect.logInfo(`Created entity link asset with ID: ${response.data.id}`)),
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
 * Example: Create a new alias asset for an entity
 */
export const createEntityAliasAssetExample = (entityId: number) => pipe(
    createEntityAsset(entityId, {
        name: "The Magnificent",
        type_id: EntityAssetType.Alias,
        visibility_id: 1 // 'all'
    }),
    Effect.tap((response) => Effect.logInfo(`Created entity alias asset with ID: ${response.data.id}`)),
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
 * Example: Delete an asset from an entity
 */
export const deleteEntityAssetExample = (entityId: number, assetId: number) => pipe(
    deleteEntityAsset(entityId, assetId),
    Effect.tap(() => Effect.logInfo(`Deleted entity asset with ID: ${assetId}`)),
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

// Note: File upload example is not provided as it requires a File object which is not easily created in examples
