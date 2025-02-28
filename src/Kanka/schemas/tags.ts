import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Tag entity
 */
export interface KankaTag extends TaggableEntity {
    /**
     * Tag ID
     */
    id: number;

    /**
     * When the tag was created
     */
    created_at: string;

    /**
     * User ID who created the tag
     */
    created_by: number | null;

    /**
     * When the tag was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the tag
     */
    updated_by: number | null;

    /**
     * If the tag is private
     */
    is_private: boolean;

    /**
     * Name of the tag
     */
    name: string;

    /**
     * Entry of the tag
     */
    entry: string | null;

    /**
     * Image of the tag
     */
    image: string | null;

    /**
     * Full image URL
     */
    image_full: string | null;

    /**
     * Thumbnail image URL
     */
    image_thumb: string | null;

    /**
     * If the tag has a custom image
     */
    has_custom_image: boolean;

    /**
     * Tags associated with the tag
     */
    tags: number[] | null;

    /**
     * Entity ID of the tag
     */
    entity_id: number;

    /**
     * Type of the tag
     */
    type: string | null;

    /**
     * Parent tag ID, if any
     */
    tag_id: number | null;

    /**
     * Colour of the tag
     */
    colour: string | null;

    /**
     * Entities that have this tag
     */
    entities: number[];

    /**
     * If the tag is automatically applied to new entities
     */
    is_auto_applied: boolean;

    /**
     * If the tag is hidden from entity headers and tooltips
     */
    is_hidden: boolean;
}

export const KankaTagSchema = Schema.Struct({
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

    // Tag-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null]),
    tag_id: Schema.Union(...[Schema.Number, Schema.Null]),
    colour: Schema.Union(...[Schema.String, Schema.Null]),
    entities: Schema.Array(Schema.Number),
    is_auto_applied: Schema.Boolean,
    is_hidden: Schema.Boolean,
});

/**
 * Parameters for creating a tag
 */
export interface CreateTagParams {
    /**
     * Name of the tag
     */
    name: string;

    /**
     * The html description of the tag
     */
    entry?: string;

    /**
     * The tag's type
     */
    type?: string;

    /**
     * The tag's colour
     */
    colour?: string;

    /**
     * The parent tag
     */
    tag_id?: number;

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
     * If the tag is only visible to `admin` members of the campaign
     */
    is_private?: boolean;

    /**
     * If the tag is automatically applied to new entities in the campaign
     */
    is_auto_applied?: boolean;

    /**
     * If the tag won't be displayed in an entity's header or tooltip
     */
    is_hidden?: boolean;
}

/**
 * Parameters for updating a tag
 */
export interface UpdateTagParams extends Partial<CreateTagParams> { }
