import { Effect, pipe } from "effect";
import {
    getTimeline,
    getTimelines,
    createTimeline,
    updateTimeline,
    deleteTimeline,
    getTimelineEras,
    getTimelineEra,
    createTimelineEra,
    updateTimelineEra,
    deleteTimelineEra,
    getTimelineElements,
    getTimelineElement,
    createTimelineElement,
    updateTimelineElement,
    deleteTimelineElement
} from "../api/timelines.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all timelines
 */
export const getAllTimelinesExample = pipe(
    getTimelines(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} timelines`)),
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
 * Example: Get a timeline by ID
 */
export const getTimelineExample = (timelineId: number) => pipe(
    getTimeline(timelineId),
    Effect.tap((response) => Effect.logInfo(`Timeline: ${response.data.name}`)),
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
 * Example: Create a new timeline
 */
export const createTimelineExample = pipe(
    createTimeline({
        name: "New Timeline",
        entry: "This is a test timeline created with the Kanka API client",
        type: "Primary",
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created timeline: ${response.data.name}`)),
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
 * Example: Update a timeline
 */
export const updateTimelineExample = (timelineId: number) => pipe(
    updateTimeline(timelineId, {
        name: "Updated Timeline",
        entry: "This is an updated timeline",
        type: "Secondary",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated timeline: ${response.data.name}`)),
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
 * Example: Delete a timeline
 */
export const deleteTimelineExample = (timelineId: number) => pipe(
    deleteTimeline(timelineId),
    Effect.tap(() => Effect.logInfo(`Deleted timeline with ID: ${timelineId}`)),
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
 * Example: Get all eras for a timeline
 */
export const getTimelineErasExample = (timelineId: number) => pipe(
    getTimelineEras(timelineId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} timeline eras`)),
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
 * Example: Get a specific era from a timeline
 */
export const getTimelineEraExample = (timelineId: number, eraId: number) => pipe(
    getTimelineEra(timelineId, eraId),
    Effect.tap((response) => Effect.logInfo(`Era: ${response.data.name} (${response.data.abbreviation})`)),
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
 * Example: Create a new era for a timeline
 */
export const createTimelineEraExample = (timelineId: number) => pipe(
    createTimelineEra(timelineId, {
        name: "New Era",
        abbreviation: "NE",
        start_year: 1000,
        end_year: 2000,
        position: 1,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created era: ${response.data.name}`)),
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
 * Example: Update an era in a timeline
 */
export const updateTimelineEraExample = (timelineId: number, eraId: number) => pipe(
    updateTimelineEra(timelineId, eraId, {
        name: "Updated Era",
        abbreviation: "UE",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated era: ${response.data.name}`)),
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
 * Example: Delete an era from a timeline
 */
export const deleteTimelineEraExample = (timelineId: number, eraId: number) => pipe(
    deleteTimelineEra(timelineId, eraId),
    Effect.tap(() => Effect.logInfo(`Deleted era with ID: ${eraId}`)),
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
 * Example: Get all elements for a timeline
 */
export const getTimelineElementsExample = (timelineId: number) => pipe(
    getTimelineElements(timelineId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} timeline elements`)),
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
 * Example: Get a specific element from a timeline
 */
export const getTimelineElementExample = (timelineId: number, elementId: number) => pipe(
    getTimelineElement(timelineId, elementId),
    Effect.tap((response) => Effect.logInfo(`Element: ${response.data.name}`)),
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
 * Example: Create a new element for a timeline
 */
export const createTimelineElementExample = (timelineId: number, eraId: number) => pipe(
    createTimelineElement(timelineId, {
        name: "New Element",
        entry: "This is a test timeline element created with the Kanka API client",
        date: "1500",
        icon: "fa-star",
        colour: "#FF5733",
        is_private: false,
        position: 1,
        era_id: eraId,
    }),
    Effect.tap((response) => Effect.logInfo(`Created element: ${response.data.name}`)),
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
 * Example: Update an element in a timeline
 */
export const updateTimelineElementExample = (timelineId: number, elementId: number) => pipe(
    updateTimelineElement(timelineId, elementId, {
        name: "Updated Element",
        entry: "This is an updated timeline element",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated element: ${response.data.name}`)),
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
 * Example: Delete an element from a timeline
 */
export const deleteTimelineElementExample = (timelineId: number, elementId: number) => pipe(
    deleteTimelineElement(timelineId, elementId),
    Effect.tap(() => Effect.logInfo(`Deleted element with ID: ${elementId}`)),
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
