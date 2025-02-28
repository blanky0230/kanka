import { Effect, pipe } from "effect";
import { testPermissions } from "../api/permissions-test.js";
import { PermissionTestAction } from "../schemas/permissions-test.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Test user permissions for an entity and entity type
 */
export const testPermissionsExample = (campaignId: number, userId: number, entityId: number, entityTypeId: number) => pipe(
    testPermissions(campaignId, [
        // Test if user can read the entity
        {
            user_id: userId,
            entity_id: entityId,
            action: PermissionTestAction.Read
        },
        // Test if user can edit the entity
        {
            user_id: userId,
            entity_id: entityId,
            action: PermissionTestAction.Edit
        },
        // Test if user can create a new entity of the specified type
        {
            user_id: userId,
            entity_type_id: entityTypeId,
            action: PermissionTestAction.Create
        }
    ]),
    Effect.tap((response) => Effect.logInfo(`Permission test results: ${JSON.stringify(response.data, null, 2)}`)),
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
