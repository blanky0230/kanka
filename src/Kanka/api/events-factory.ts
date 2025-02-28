import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Event, EventSchema, CreateEventParams, UpdateEventParams } from "../schemas/events.js";

/**
 * Events API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Event entity type.
 */

// Type assertion to handle schema compatibility
const eventSchema = EventSchema as Schema.Schema<Event, unknown>;

// Create the Events API using the factory
const eventApi = createEntityApi<Event, CreateEventParams, UpdateEventParams>({
    basePath: "events",
    schema: eventSchema,
    // Custom query parameter transformer to handle event-specific parameters
    transformQueryParams: (params) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        // Standard parameters
        if (typeof params.page === 'number') queryParams.page = params.page;
        if (typeof params.perPage === 'number') queryParams.per_page = params.perPage;
        if (typeof params.name === 'string') queryParams.name = params.name;
        if (typeof params.is_private === 'boolean') queryParams.is_private = params.is_private;
        if (typeof params.created_by === 'number') queryParams.created_by = params.created_by;
        if (typeof params.updated_by === 'number') queryParams.updated_by = params.updated_by;
        if (typeof params.lastSync === 'string') queryParams.lastSync = params.lastSync;

        // Event-specific parameters
        if (typeof params.type === 'string') queryParams.type = params.type;
        if (typeof params.location_id === 'string') queryParams.location_id = params.location_id;
        if (typeof params.date === 'string') queryParams.date = params.date;
        if (typeof params.calendar_id === 'number') queryParams.calendar_id = params.calendar_id;

        // Add tags as individual query parameters if present
        const tags = params.tags;
        if (tags && Array.isArray(tags) && tags.length > 0) {
            tags.forEach((tag, index) => {
                if (typeof tag === 'number') {
                    queryParams[`tags[${index}]`] = tag;
                }
            });
        }

        return queryParams;
    }
});

// Export the standard CRUD operations with factory suffix to avoid naming conflicts
export const getEventsFactory = eventApi.getAll;
export const getEventFactory = eventApi.getOne;
export const createEventFactory = eventApi.create;
export const updateEventFactory = eventApi.update;
export const deleteEventFactory = eventApi.delete;

// You can also add custom operations specific to events
// that aren't covered by the standard CRUD operations
