import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Location entity
 */
export interface Location extends TaggableEntity {
    /**
     * Whether the location is destroyed
     */
    is_destroyed: boolean;

    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Parent location ID
     */
    location_id?: number | null;

    /**
     * Location type
     */
    type?: string | null;
}

export const LocationSchema = Schema.Struct({
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

    // Location-specific fields
    is_destroyed: Schema.Boolean,
    entity_id: Schema.Number,
    location_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
});

/**
 * Parameters for creating a location
 */
export interface CreateLocationParams {
    /**
     * Name of the location
     */
    name: string;

    /**
     * The html description of the location
     */
    entry?: string;

    /**
     * Type of location
     */
    type?: string;

    /**
     * The parent location id (where this location is located)
     */
    location_id?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * If the location is destroyed
     */
    is_destroyed?: boolean;

    /**
     * If the location is only visible to `admin` members of the campaign
     */
    is_private?: boolean;

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;
}

/**
 * Parameters for updating a location
 */
export interface UpdateLocationParams extends Partial<CreateLocationParams> { }
