import { Effect, pipe } from "effect";
import { getEntityPermissions, createEntityPermission } from "../api/entity-permissions.js";
import { PermissionAction } from "../schemas/entity-permissions.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all permissions of an entity
 */
export const getEntityPermissionsExample = (entityId: number) => pipe(
    getEntityPermissions(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entity permissions for entity ${entityId}`)),
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
 * Example: Create an entity permission for a campaign role
 */
export const createEntityPermissionForRoleExample = (entityId: number, campaignRoleId: number) => pipe(
    createEntityPermission(entityId, {
        campaign_role_id: campaignRoleId,
        action: PermissionAction.Read,
        access: true
    }),
    Effect.tap((response) => Effect.logInfo(`Created ${response.data.length} entity permissions for entity ${entityId}`)),
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
 * Example: Create an entity permission for a user
 */
export const createEntityPermissionForUserExample = (entityId: number, userId: number) => pipe(
    createEntityPermission(entityId, {
        user_id: userId,
        action: PermissionAction.Read,
        access: true
    }),
    Effect.tap((response) => Effect.logInfo(`Created ${response.data.length} entity permissions for entity ${entityId}`)),
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
