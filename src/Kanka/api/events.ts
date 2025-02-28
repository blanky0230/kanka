import {
    Event,
    CreateEventParams,
    UpdateEventParams,
} from "../schemas/events.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all events with optional filtering
 */
export const getEvents = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    type?: string;
    location_id?: string;
    date?: string;
    calendar_id?: number;
}) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        name: params?.name,
        is_private: params?.is_private,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        type: params?.type,
        location_id: params?.location_id,
        date: params?.date,
        calendar_id: params?.calendar_id,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Event>>("events", queryParams);
};

/**
 * Get an event by ID
 */
export const getEvent = (id: number) => {
    return get<SingleResponse<Event>>(`events/${id}`);
};

/**
 * Create a new event
 */
export const createEvent = (params: CreateEventParams) => {
    return post<SingleResponse<Event>>("events", params);
};

/**
 * Update an event
 */
export const updateEvent = (id: number, params: UpdateEventParams) => {
    return put<SingleResponse<Event>>(`events/${id}`, params);
};

/**
 * Delete an event
 */
export const deleteEvent = (id: number) => {
    return del<void>(`events/${id}`);
};
