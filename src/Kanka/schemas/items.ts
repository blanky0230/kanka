import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Item entity
 */
export interface Item extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Item type
     */
    type?: string | null;

    /**
     * Location ID where the item is located
     */
    location_id?: number | null;

    /**
     * Character ID who owns the item
     */
    character_id?: number | null;

    /**
     * Item price
     */
    price?: string | null;

    /**
     * Item size
     */
    size?: string | null;

    /**
     * Item weight
     */
    weight?: string | null;

    /**
     * Parent item ID
     */
    item_id?: number | null;
}

export const ItemSchema = Schema.Struct({
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

    // Item-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    location_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    character_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    price: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    size: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    weight: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    item_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
});

/**
 * Parameters for creating an item
 */
export interface CreateItemParams {
    /**
     * Name of the item
     */
    name: string;

    /**
     * The html description of the item
     */
    entry?: string;

    /**
     * Type of item
     */
    type?: string;

    /**
     * The item's location
     */
    location_id?: number;

    /**
     * The item's owner
     */
    character_id?: number;

    /**
     * The item's price
     */
    price?: string;

    /**
     * The item's size
     */
    size?: string;

    /**
     * The item's weight
     */
    weight?: string;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * If the item is only visible to `admin` members of the campaign
     */
    is_private?: boolean;

    /**
     * The ID of the item's parent item, if it has one
     */
    item_id?: number;

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
 * Parameters for updating an item
 */
export interface UpdateItemParams extends Partial<CreateItemParams> { }
