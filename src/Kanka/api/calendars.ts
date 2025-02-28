import {
    Calendar,
    CalendarReminder,
    CreateCalendarParams,
    UpdateCalendarParams,
} from "../schemas/calendars.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all calendars with optional filtering
 */
export const getCalendars = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    type?: string;
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
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Calendar>>("calendars", queryParams);
};

/**
 * Get a calendar by ID
 */
export const getCalendar = (id: number) => {
    return get<SingleResponse<Calendar>>(`calendars/${id}`);
};

/**
 * Create a new calendar
 */
export const createCalendar = (params: CreateCalendarParams) => {
    return post<SingleResponse<Calendar>>("calendars", params);
};

/**
 * Update a calendar
 */
export const updateCalendar = (id: number, params: UpdateCalendarParams) => {
    return put<SingleResponse<Calendar>>(`calendars/${id}`, params);
};

/**
 * Delete a calendar
 */
export const deleteCalendar = (id: number) => {
    return del<void>(`calendars/${id}`);
};

/**
 * Advance the date of a calendar by one day
 */
export const advanceCalendarDate = (id: number) => {
    return post<SingleResponse<Calendar>>(`calendars/${id}/advance`, {});
};

/**
 * Retreat the date of a calendar by one day
 */
export const retreatCalendarDate = (id: number) => {
    return post<SingleResponse<Calendar>>(`calendars/${id}/retreat`, {});
};

/**
 * Get all reminders for a calendar
 */
export const getCalendarReminders = (calendarId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<CalendarReminder>>(`calendars/${calendarId}/reminders`, queryParams);
};
