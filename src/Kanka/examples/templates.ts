import { Effect, pipe } from "effect";
import { getTemplates, switchTemplateStatus } from "../api/templates.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all templates
 */
export const getAllTemplatesExample = pipe(
    getTemplates(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} templates`)),
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
 * Example: Switch template status for an entity
 */
export const switchTemplateStatusExample = (entityId: number) => pipe(
    switchTemplateStatus(entityId),
    Effect.tap((response) => Effect.logInfo(`Switched template status for entity: ${response.data.name}`)),
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
