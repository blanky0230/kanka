import { Effect, pipe } from "effect";
import {
    getEntityEvents,
    getEntityEvent,
    createEntityEvent,
    updateEntityEvent,
    deleteEntityEvent
} from "../api/entity-events.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all entity events for an entity
 */
export const getEntityEventsExample = (entityId: number) => pipe(
    getEntityEvents(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entity events for entity ${entityId}`)),
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
 * Example: Get an entity event by ID for an entity
 */
export const getEntityEventExample = (entityId: number, entityEventId: number) => pipe(
    getEntityEvent(entityId, entityEventId),
    Effect.tap((response) => Effect.logInfo(`Entity Event: ${response.data.date}`)),
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
 * Example: Create a new entity event for an entity
 */
export const createEntityEventExample = (entityId: number, calendarId: number) => pipe(
    createEntityEvent(entityId, {
        name: "New Event",
        day: 1,
        month: 1,
        year: 1,
        length: 1,
        calendar_id: calendarId,
        comment: "This is a test event created with the Kanka API client",
        is_private: false,
        visibility_id: 1, // Visible to all
    }),
    Effect.tap((response) => Effect.logInfo(`Created entity event with date: ${response.data.date}`)),
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
 * Example: Update an entity event for an entity
 */
export const updateEntityEventExample = (entityId: number, entityEventId: number) => pipe(
    updateEntityEvent(entityId, entityEventId, {
        name: "Updated Event",
        comment: "This is an updated event",
        length: 2,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated entity event with date: ${response.data.date}`)),
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
 * Example: Delete an entity event from an entity
 */
export const deleteEntityEventExample = (entityId: number, entityEventId: number) => pipe(
    deleteEntityEvent(entityId, entityEventId),
    Effect.tap(() => Effect.logInfo(`Deleted entity event with ID: ${entityEventId}`)),
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
