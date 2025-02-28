import { Effect, pipe } from "effect";
import { getEvent, getEvents, createEvent, updateEvent, deleteEvent } from "../api/events.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all events
 */
export const getAllEventsExample = pipe(
    getEvents(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} events`)),
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
 * Example: Get an event by ID
 */
export const getEventExample = (eventId: number) => pipe(
    getEvent(eventId),
    Effect.tap((response) => Effect.logInfo(`Event: ${response.data.name}`)),
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
 * Example: Create a new event
 */
export const createEventExample = pipe(
    createEvent({
        name: "New Event",
        entry: "This is a test event created with the Kanka API client",
        type: "Battle",
        date: "44-3-16",
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created event: ${response.data.name}`)),
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
 * Example: Update an event
 */
export const updateEventExample = (eventId: number) => pipe(
    updateEvent(eventId, {
        name: "Updated Event",
        entry: "This is an updated event",
        type: "Festival",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated event: ${response.data.name}`)),
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
 * Example: Delete an event
 */
export const deleteEventExample = (eventId: number) => pipe(
    deleteEvent(eventId),
    Effect.tap(() => Effect.logInfo(`Deleted event with ID: ${eventId}`)),
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
