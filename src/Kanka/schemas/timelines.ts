import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Timeline entity
 */
export interface Timeline extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Timeline type
     */
    type?: string | null;

    /**
     * Eras in the timeline
     */
    eras?: TimelineEra[];
}

/**
 * Timeline era
 */
export interface TimelineEra {
    /**
     * Era name
     */
    name: string;

    /**
     * Era abbreviation
     */
    abbreviation: string;

    /**
     * Start year of the era
     */
    start_year: number | null;

    /**
     * End year of the era
     */
    end_year: number | null;

    /**
     * Elements in the era
     */
    elements: TimelineElement[];

    /**
     * Position of the era in the timeline
     */
    position: number;
}

/**
 * Timeline element
 */
export interface TimelineElement {
    /**
     * Element ID
     */
    id: number;

    /**
     * Element name
     */
    name: string;

    /**
     * Element entry/description
     */
    entry: string | null;

    /**
     * Element date
     */
    date: string | null;

    /**
     * Element icon
     */
    icon: string | null;

    /**
     * Element color
     */
    colour: string | null;

    /**
     * Whether the element is private
     */
    is_private: boolean;

    /**
     * Element position
     */
    position: number;

    /**
     * Element visibility ID
     */
    visibility_id: number;

    /**
     * Element entity ID
     */
    entity_id: number | null;

    /**
     * Element era ID
     */
    era_id: number;

    /**
     * Element timeline ID
     */
    timeline_id: number;

    /**
     * Created at timestamp
     */
    created_at: string;

    /**
     * Created by user ID
     */
    created_by: number | null;

    /**
     * Updated at timestamp
     */
    updated_at: string;

    /**
     * Updated by user ID
     */
    updated_by: number | null;
}

export const TimelineElementSchema = Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    date: Schema.Union(...[Schema.String, Schema.Null]),
    icon: Schema.Union(...[Schema.String, Schema.Null]),
    colour: Schema.Union(...[Schema.String, Schema.Null]),
    is_private: Schema.Boolean,
    position: Schema.Number,
    visibility_id: Schema.Number,
    entity_id: Schema.Union(...[Schema.Number, Schema.Null]),
    era_id: Schema.Number,
    timeline_id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
});

export const TimelineEraSchema = Schema.Struct({
    name: Schema.String,
    abbreviation: Schema.String,
    start_year: Schema.Union(...[Schema.Number, Schema.Null]),
    end_year: Schema.Union(...[Schema.Number, Schema.Null]),
    elements: Schema.Array(TimelineElementSchema),
    position: Schema.Number,
});

export const TimelineSchema = Schema.Struct({
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

    // Timeline-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    eras: Schema.Union(...[Schema.Array(TimelineEraSchema), Schema.Undefined]),
});

/**
 * Parameters for creating a timeline
 */
export interface CreateTimelineParams {
    /**
     * Name of the timeline
     */
    name: string;

    /**
     * The html description of the timeline
     */
    entry?: string;

    /**
     * The timeline's type
     */
    type?: string;

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
     * If the timeline is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a timeline
 */
export interface UpdateTimelineParams extends Partial<CreateTimelineParams> { }
