import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Ability entity
 */
export interface KankaAbility extends TaggableEntity {
    /**
     * Ability ID
     */
    id: number;

    /**
     * When the ability was created
     */
    created_at: string;

    /**
     * User ID who created the ability
     */
    created_by: number | null;

    /**
     * When the ability was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the ability
     */
    updated_by: number | null;

    /**
     * If the ability is private
     */
    is_private: boolean;

    /**
     * Name of the ability
     */
    name: string;

    /**
     * Entry of the ability
     */
    entry: string | null;

    /**
     * Image of the ability
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
     * If the ability has a custom image
     */
    has_custom_image: boolean;

    /**
     * Tags associated with the ability
     */
    tags: number[] | null;

    /**
     * Entity ID of the ability
     */
    entity_id: number;

    /**
     * Type of the ability
     */
    type: string | null;

    /**
     * Parent ability ID, if any
     */
    ability_id: number | null;

    /**
     * How many charges the ability has
     */
    charges: number | null;

    /**
     * Child abilities
     */
    abilities: KankaAbility[];
}

export const KankaAbilitySchema = Schema.Struct({
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

    // Ability-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null]),
    ability_id: Schema.Union(...[Schema.Number, Schema.Null]),
    charges: Schema.Union(...[Schema.Number, Schema.Null]),
    abilities: Schema.Array(Schema.Any),
});

/**
 * Parameters for creating an ability
 */
export interface CreateAbilityParams {
    /**
     * Name of the ability
     */
    name: string;

    /**
     * The html description of the ability
     */
    entry?: string;

    /**
     * The ability's type
     */
    type?: string;

    /**
     * The ability's parent ability
     */
    ability_id?: number;

    /**
     * How many charges the ability has
     */
    charges?: number;

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
     * If the ability is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating an ability
 */
export interface UpdateAbilityParams extends Partial<CreateAbilityParams> { }
