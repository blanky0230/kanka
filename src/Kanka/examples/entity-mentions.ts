import { Effect, pipe } from "effect";
import { getEntityMentions } from "../api/entity-mentions.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all mentions of an entity
 */
export const getEntityMentionsExample = (entityId: number) => pipe(
    getEntityMentions(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} mentions for entity ${entityId}`)),
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
