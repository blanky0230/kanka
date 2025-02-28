import { Effect, pipe } from "effect";
import { getCalendar, getCalendars, createCalendar, updateCalendar, deleteCalendar, advanceCalendarDate, retreatCalendarDate, getCalendarReminders } from "../api/calendars.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all calendars
 */
export const getAllCalendarsExample = pipe(
    getCalendars(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} calendars`)),
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
 * Example: Get a calendar by ID
 */
export const getCalendarExample = (calendarId: number) => pipe(
    getCalendar(calendarId),
    Effect.tap((response) => Effect.logInfo(`Calendar: ${response.data.name}`)),
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
 * Example: Create a new calendar
 */
export const createCalendarExample = pipe(
    createCalendar({
        name: "New Calendar",
        entry: "This is a test calendar created with the Kanka API client",
        type: "Primary",
        weekday: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        month_name: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        month_length: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        month_type: ["standard", "standard", "standard", "standard", "standard", "standard", "standard", "standard", "standard", "standard", "standard", "standard"],
        current_year: 2025,
        current_month: 2,
        current_day: 28,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created calendar: ${response.data.name}`)),
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
 * Example: Update a calendar
 */
export const updateCalendarExample = (calendarId: number) => pipe(
    updateCalendar(calendarId, {
        name: "Updated Calendar",
        entry: "This is an updated calendar",
        current_year: 2026,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated calendar: ${response.data.name}`)),
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
 * Example: Delete a calendar
 */
export const deleteCalendarExample = (calendarId: number) => pipe(
    deleteCalendar(calendarId),
    Effect.tap(() => Effect.logInfo(`Deleted calendar with ID: ${calendarId}`)),
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
 * Example: Advance a calendar date by one day
 */
export const advanceCalendarDateExample = (calendarId: number) => pipe(
    advanceCalendarDate(calendarId),
    Effect.tap((response) => Effect.logInfo(`Advanced calendar date to: ${response.data.date}`)),
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
 * Example: Retreat a calendar date by one day
 */
export const retreatCalendarDateExample = (calendarId: number) => pipe(
    retreatCalendarDate(calendarId),
    Effect.tap((response) => Effect.logInfo(`Retreated calendar date to: ${response.data.date}`)),
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
 * Example: Get calendar reminders
 */
export const getCalendarRemindersExample = (calendarId: number) => pipe(
    getCalendarReminders(calendarId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} calendar reminders`)),
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
