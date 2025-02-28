import { Effect, pipe } from "effect";
import { getEntities, getEntity, getRecentEntities } from "../api/entities.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all entities
 */
export const getAllEntitiesExample = pipe(
    getEntities(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entities`)),
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
 * Example: Get entities filtered by type
 */
export const getFilteredEntitiesExample = pipe(
    getEntities({
        types: "character,location",
        page: 1,
        perPage: 10,
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters and locations`)),
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
 * Example: Get a single entity by ID
 */
export const getEntityExample = (entityId: number) => pipe(
    getEntity(entityId),
    Effect.tap((response) => Effect.logInfo(`Entity: ${response.data.name} (${response.data.entity_type})`)),
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
 * Example: Get recently modified entities
 */
export const getRecentEntitiesExample = pipe(
    getRecentEntities(5),
    Effect.tap((response) => Effect.logInfo(`Recent entities: ${response.data.map(e => e.name).join(', ')}`)),
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
