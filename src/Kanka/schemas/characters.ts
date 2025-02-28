import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Character trait
 */
export interface CharacterTrait {
    /**
     * Trait ID
     */
    id: number;

    /**
     * Trait name
     */
    name: string;

    /**
     * Trait entry (raw)
     */
    entry: string;

    /**
     * Trait entry (parsed with HTML)
     */
    entry_parsed: string;

    /**
     * Trait section
     */
    section: string;

    /**
     * Trait section ID
     */
    section_id: number;

    /**
     * Whether the trait is private
     */
    is_private?: boolean;

    /**
     * Default display order
     */
    default_order: number;
}

export const CharacterTraitSchema = Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    entry: Schema.String,
    entry_parsed: Schema.String,
    section: Schema.String,
    section_id: Schema.Number,
    is_private: Schema.Union(...[Schema.Boolean, Schema.Undefined]),
    default_order: Schema.Number,
});

/**
 * Character entity
 */
export interface Character extends TaggableEntity {
    /**
     * Whether personality traits are visible to all users
     */
    is_personality_visible: boolean;

    /**
     * Whether the character is a template
     */
    is_template: boolean;

    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Character location ID
     */
    location_id?: number | null;

    /**
     * Character title
     */
    title?: string | null;

    /**
     * Character age
     */
    age?: string | null;

    /**
     * Character sex/gender
     */
    sex?: string | null;

    /**
     * Character pronouns
     */
    pronouns?: string | null;

    /**
     * Character race IDs
     */
    races?: number[];

    /**
     * Private character race IDs
     */
    private_races?: number[];

    /**
     * Character type
     */
    type?: string | null;

    /**
     * Character family IDs
     */
    families?: number[];

    /**
     * Private character family IDs
     */
    private_families?: number[];

    /**
     * Whether the character is dead
     */
    is_dead?: boolean;

    /**
     * Character traits
     */
    traits?: CharacterTrait[];
}

export const CharacterSchema = Schema.Struct({
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

    // Character-specific fields
    is_personality_visible: Schema.Boolean,
    is_template: Schema.Boolean,
    entity_id: Schema.Number,
    location_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    title: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    age: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    sex: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    pronouns: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    races: Schema.Union(...[Schema.Array(Schema.Number), Schema.Undefined]),
    private_races: Schema.Union(...[Schema.Array(Schema.Number), Schema.Undefined]),
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    families: Schema.Union(...[Schema.Array(Schema.Number), Schema.Undefined]),
    private_families: Schema.Union(...[Schema.Array(Schema.Number), Schema.Undefined]),
    is_dead: Schema.Union(...[Schema.Boolean, Schema.Undefined]),
    traits: Schema.Union(...[Schema.Array(CharacterTraitSchema), Schema.Undefined]),
});

/**
 * Parameters for creating a character
 */
export interface CreateCharacterParams {
    /**
     * Name of the character
     */
    name: string;

    /**
     * The html description of the character
     */
    entry?: string;

    /**
     * Title of the character
     */
    title?: string;

    /**
     * Age of the character
     */
    age?: string;

    /**
     * Gender of the character
     */
    sex?: string;

    /**
     * Preferred pronouns of the character
     */
    pronouns?: string;

    /**
     * Type of the character
     */
    type?: string;

    /**
     * Array of family IDs
     */
    families?: number[];

    /**
     * Location ID
     */
    location_id?: number;

    /**
     * Array of race IDs
     */
    races?: number[];

    /**
     * Array of tag IDs
     */
    tags?: number[];

    /**
     * If the character is dead
     */
    is_dead?: boolean;

    /**
     * If the character is only visible to admin members
     */
    is_private?: boolean;

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header
     */
    entity_header_uuid?: string;

    /**
     * Personality trait names
     */
    personality_name?: string[];

    /**
     * Personality trait entries
     */
    personality_entry?: string[];

    /**
     * Appearance trait names
     */
    appearance_name?: string[];

    /**
     * Appearance trait entries
     */
    appearance_entry?: string[];

    /**
     * If personality traits are visible to all
     */
    is_personality_visible?: boolean;

    /**
     * If personality traits are visible on overview
     */
    is_personality_pinned?: boolean;

    /**
     * If appearance traits are visible on overview
     */
    is_appearance_pinned?: boolean;
}

/**
 * Parameters for updating a character
 */
export interface UpdateCharacterParams extends Partial<CreateCharacterParams> { }
