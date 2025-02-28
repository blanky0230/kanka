import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Race entity
 */
export interface Race extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Parent race ID
     */
    race_id: number | null;

    /**
     * Race type
     */
    type: string | null;

    /**
     * Whether the race is extinct
     */
    is_extinct: boolean;

    /**
     * Array of location IDs where the race can be found
     */
    locations: number[];
}

export const RaceSchema = Schema.Struct({
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

    // Race-specific fields
    entity_id: Schema.Number,
    race_id: Schema.Union(...[Schema.Number, Schema.Null]),
    type: Schema.Union(...[Schema.String, Schema.Null]),
    is_extinct: Schema.Boolean,
    locations: Schema.Array(Schema.Number),
});

/**
 * Parameters for creating a race
 */
export interface CreateRaceParams {
    /**
     * Name of the race
     */
    name: string;

    /**
     * The html description of the race
     */
    entry?: string;

    /**
     * The race's type
     */
    type?: string;

    /**
     * Parent race of the race
     */
    race_id?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Array of location ids
     */
    locations?: number[];

    /**
     * If the race is extinct
     */
    is_extinct?: boolean;

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;

    /**
     * If the race is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a race
 */
export interface UpdateRaceParams extends Partial<CreateRaceParams> { }
