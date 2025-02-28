import {
    Timeline,
    CreateTimelineParams,
    UpdateTimelineParams,
    TimelineEra,
    TimelineElement
} from "../schemas/timelines.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all timelines with optional filtering
 */
export const getTimelines = (params?: {
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

    return get<PaginatedResponse<Timeline>>("timelines", queryParams);
};

/**
 * Get a timeline by ID
 */
export const getTimeline = (id: number) => {
    return get<SingleResponse<Timeline>>(`timelines/${id}`);
};

/**
 * Create a new timeline
 */
export const createTimeline = (params: CreateTimelineParams) => {
    return post<SingleResponse<Timeline>>("timelines", params);
};

/**
 * Update a timeline
 */
export const updateTimeline = (id: number, params: UpdateTimelineParams) => {
    return put<SingleResponse<Timeline>>(`timelines/${id}`, params);
};

/**
 * Delete a timeline
 */
export const deleteTimeline = (id: number) => {
    return del<void>(`timelines/${id}`);
};

/**
 * Timeline Era Endpoints
 */

/**
 * Get all eras for a timeline
 */
export const getTimelineEras = (timelineId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    return get<PaginatedResponse<TimelineEra>>(`timelines/${timelineId}/eras`, {
        page: params?.page,
        per_page: params?.perPage,
    });
};

/**
 * Get a specific era from a timeline
 */
export const getTimelineEra = (timelineId: number, eraId: number) => {
    return get<SingleResponse<TimelineEra>>(`timelines/${timelineId}/eras/${eraId}`);
};

/**
 * Create a new era for a timeline
 */
export interface CreateTimelineEraParams {
    /**
     * Name of the era
     */
    name: string;

    /**
     * Abbreviation of the era
     */
    abbreviation: string;

    /**
     * Start year of the era
     */
    start_year?: number | null;

    /**
     * End year of the era
     */
    end_year?: number | null;

    /**
     * Position of the era in the timeline
     */
    position?: number;

    /**
     * If the era is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

export const createTimelineEra = (timelineId: number, params: CreateTimelineEraParams) => {
    return post<SingleResponse<TimelineEra>>(`timelines/${timelineId}/eras`, params);
};

/**
 * Update an era in a timeline
 */
export interface UpdateTimelineEraParams extends Partial<CreateTimelineEraParams> { }

export const updateTimelineEra = (timelineId: number, eraId: number, params: UpdateTimelineEraParams) => {
    return put<SingleResponse<TimelineEra>>(`timelines/${timelineId}/eras/${eraId}`, params);
};

/**
 * Delete an era from a timeline
 */
export const deleteTimelineEra = (timelineId: number, eraId: number) => {
    return del<void>(`timelines/${timelineId}/eras/${eraId}`);
};

/**
 * Timeline Element Endpoints
 */

/**
 * Get all elements for a timeline
 */
export const getTimelineElements = (timelineId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    return get<PaginatedResponse<TimelineElement>>(`timelines/${timelineId}/elements`, {
        page: params?.page,
        per_page: params?.perPage,
    });
};

/**
 * Get a specific element from a timeline
 */
export const getTimelineElement = (timelineId: number, elementId: number) => {
    return get<SingleResponse<TimelineElement>>(`timelines/${timelineId}/elements/${elementId}`);
};

/**
 * Create a new element for a timeline
 */
export interface CreateTimelineElementParams {
    /**
     * Name of the element
     */
    name: string;

    /**
     * The html description of the element
     */
    entry?: string | null;

    /**
     * Element date
     */
    date?: string | null;

    /**
     * Element icon
     */
    icon?: string | null;

    /**
     * Element color
     */
    colour?: string | null;

    /**
     * If the element is only visible to `admin` members of the campaign
     */
    is_private?: boolean;

    /**
     * Element position
     */
    position?: number;

    /**
     * Element visibility ID
     */
    visibility_id?: number;

    /**
     * Element entity ID
     */
    entity_id?: number | null;

    /**
     * Element era ID
     */
    era_id: number;
}

export const createTimelineElement = (timelineId: number, params: CreateTimelineElementParams) => {
    return post<SingleResponse<TimelineElement>>(`timelines/${timelineId}/elements`, params);
};

/**
 * Update an element in a timeline
 */
export interface UpdateTimelineElementParams extends Partial<CreateTimelineElementParams> { }

export const updateTimelineElement = (timelineId: number, elementId: number, params: UpdateTimelineElementParams) => {
    return put<SingleResponse<TimelineElement>>(`timelines/${timelineId}/elements/${elementId}`, params);
};

/**
 * Delete an element from a timeline
 */
export const deleteTimelineElement = (timelineId: number, elementId: number) => {
    return del<void>(`timelines/${timelineId}/elements/${elementId}`);
};
