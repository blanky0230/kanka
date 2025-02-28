import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Creature entity
 */
export interface Creature extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Parent creature ID
     */
    creature_id: number | null;

    /**
     * Creature type
     */
    type: string | null;

    /**
     * Whether the creature is extinct
     */
    is_extinct: boolean;

    /**
     * Whether the creature is dead
     */
    is_dead: boolean;

    /**
     * Array of location IDs where the creature can be found
     */
    locations: number[];
}

export const CreatureSchema = Schema.Struct({
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

    // Creature-specific fields
    entity_id: Schema.Number,
    creature_id: Schema.Union(...[Schema.Number, Schema.Null]),
    type: Schema.Union(...[Schema.String, Schema.Null]),
    is_extinct: Schema.Boolean,
    is_dead: Schema.Boolean,
    locations: Schema.Array(Schema.Number),
});

/**
 * Parameters for creating a creature
 */
export interface CreateCreatureParams {
    /**
     * Name of the creature
     */
    name: string;

    /**
     * The html description of the creature
     */
    entry?: string;

    /**
     * The creature's type
     */
    type?: string;

    /**
     * Parent creature of the creature
     */
    creature_id?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Array of location ids
     */
    locations?: number[];

    /**
     * If the creature is extinct
     */
    is_extinct?: boolean;

    /**
     * If the creature is dead
     */
    is_dead?: boolean;

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;

    /**
     * If the creature is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a creature
 */
export interface UpdateCreatureParams extends Partial<CreateCreatureParams> { }
