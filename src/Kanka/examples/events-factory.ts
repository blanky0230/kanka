import { Effect, pipe } from "effect";
import { getEventsFactory, getEventFactory, createEventFactory, updateEventFactory, deleteEventFactory } from "../api/events-factory.js";
import { CreateEventParams, UpdateEventParams } from "../schemas/events.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Get all events using the factory API
 */
export const getAllEventsFactoryExample = pipe(
    getEventsFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} events`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get all events with filtering
 */
export const getFilteredEventsExample = pipe(
    getEventsFactory({
        name: "Battle of the Five Armies",
        is_private: false,
        type: "Battle",
        date: "1341-11-23",
        calendar_id: 1, // Replace with real calendar ID
        tags: [1, 2, 3], // Replace with real tag IDs
        location_id: "4", // Replace with real location ID
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered events`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Get an event by ID using the factory API
 */
export const getEventFactoryExample = (eventId: number) => pipe(
    getEventFactory(eventId),
    Effect.tap((response) => Effect.logInfo(`Event: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a new event using the factory API
 */
export const createEventFactoryExample = pipe(
    createEventFactory({
        name: "Council of Elrond",
        entry: "<p>A secret council called by Elrond to decide what to do with the One Ring.</p>",
        type: "Council",
        date: "3018-10-25",
        location_id: "4", // Replace with real location ID
        is_private: false,
    } as CreateEventParams),
    Effect.tap((response) => Effect.logInfo(`Created event: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Update an event using the factory API
 */
export const updateEventFactoryExample = (eventId: number) => pipe(
    updateEventFactory(eventId, {
        entry: "<p>A secret council called by Elrond to decide what to do with the One Ring. Representatives from all free peoples of Middle-earth attended.</p>",
        calendar_id: 2, // Replace with real calendar ID
    } as UpdateEventParams),
    Effect.tap((response) => Effect.logInfo(`Updated event: ${response.data.name}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Example: Delete an event using the factory API
 */
export const deleteEventFactoryExample = (eventId: number) => pipe(
    deleteEventFactory(eventId),
    Effect.tap(() => Effect.logInfo(`Deleted event with ID: ${eventId}`)),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
    Effect.provide(configFromEnv)
);

/**
 * Run all event examples
 */
export const runEventExamples = async () => {
    // Get all events
    await Effect.runPromise(getAllEventsFactoryExample);

    // Get filtered events
    await Effect.runPromise(getFilteredEventsExample);

    // Get a specific event (replace with a real event ID)
    // await Effect.runPromise(getEventFactoryExample(123));

    // Create a new event
    // await Effect.runPromise(createEventFactoryExample);

    // Update an event (replace with a real event ID)
    // await Effect.runPromise(updateEventFactoryExample(123));

    // Delete an event (replace with a real event ID)
    // await Effect.runPromise(deleteEventFactoryExample(123));
};
