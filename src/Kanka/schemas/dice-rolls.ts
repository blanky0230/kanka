import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Dice Roll entity
 */
export interface KankaDiceRoll extends TaggableEntity {
    /**
     * Dice Roll ID
     */
    id: number;

    /**
     * When the dice roll was created
     */
    created_at: string;

    /**
     * User ID who created the dice roll
     */
    created_by: number | null;

    /**
     * When the dice roll was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the dice roll
     */
    updated_by: number | null;

    /**
     * If the dice roll is private
     */
    is_private: boolean;

    /**
     * Name of the dice roll
     */
    name: string;

    /**
     * Entry of the dice roll
     */
    entry: string | null;

    /**
     * Image of the dice roll
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
     * If the dice roll has a custom image
     */
    has_custom_image: boolean;

    /**
     * Tags associated with the dice roll
     */
    tags: number[] | null;

    /**
     * Entity ID of the dice roll
     */
    entity_id: number;

    /**
     * Character ID of the dice roll owner
     */
    character_id: number;

    /**
     * System used for the dice roll (always "standard")
     */
    system: string;

    /**
     * Dice roll parameters (e.g., "2d6+3")
     */
    parameters: string;

    /**
     * Results of the dice rolls
     */
    rolls: string[];
}

export const KankaDiceRollSchema = Schema.Struct({
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

    // Dice Roll specific fields
    entity_id: Schema.Number,
    character_id: Schema.Number,
    system: Schema.String,
    parameters: Schema.String,
    rolls: Schema.Array(Schema.String),
});

/**
 * Parameters for creating a dice roll
 */
export interface CreateDiceRollParams {
    /**
     * Name of the dice roll
     */
    name: string;

    /**
     * The html description of the dice roll
     */
    entry?: string;

    /**
     * The dice roll's parameters (dice roll config)
     */
    parameters: string;

    /**
     * The dice roll's system (always standard)
     */
    system?: string;

    /**
     * The dice roll's owner
     */
    character_id?: number;

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
     * If the dice roll is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a dice roll
 */
export interface UpdateDiceRollParams extends Partial<CreateDiceRollParams> { }
