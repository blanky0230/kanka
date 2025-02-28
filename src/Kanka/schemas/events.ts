import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Event entity
 */
export interface Event extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Event type
     */
    type?: string | null;

    /**
     * Fictional date at which the event took place
     */
    date?: string | null;

    /**
     * Location ID where the event took place
     */
    location_id?: string | null;

    /**
     * Calendar ID
     */
    calendar_id?: number | null;

    /**
     * Calendar year
     */
    calendar_year?: number | null;

    /**
     * Calendar month
     */
    calendar_month?: number | null;

    /**
     * Calendar day
     */
    calendar_day?: number | null;
}

export const EventSchema = Schema.Struct({
    // Base TaggableEntity fields
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.String,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    image: Schema.Union(...[Schema.String, Schema.Null]),
    image_full: Schema.Union(...[Schema.String, Schema.Null]),
    image_thumb: Schema.Union(...[Schema.String, Schema.Null]),
    has_custom_image: Schema.Boolean,
    tags: Schema.Union(...[Schema.Array(Schema.Number), Schema.Null]),

    // Event-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    date: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    location_id: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    calendar_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    calendar_year: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    calendar_month: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    calendar_day: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
});

/**
 * Parameters for creating an event
 */
export interface CreateEventParams {
    /**
     * Name of the event
     */
    name: string;

    /**
     * The html description of the event
     */
    entry?: string;

    /**
     * Type of event
     */
    type?: string;

    /**
     * Fictional date at which the event took place
     */
    date?: string;

    /**
     * Location of the event
     */
    location_id?: string;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;

    /**
     * If the event is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating an event
 */
export interface UpdateEventParams extends Partial<CreateEventParams> { }
