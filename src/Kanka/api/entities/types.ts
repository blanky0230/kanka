/**
 * types.ts
 * Type definitions for Kanka entity-related endpoints
 * Created: 2025-04-10
 * Framework principles applied: Context Discovery, Type Safety
 */
import { Schema } from "effect";
import { TaggedEntitySchema } from "../../schemas/common.js";

/**
 * Entity type schema (character, location, item, etc.)
 */
export const EntityTypeSchema = Schema.Literal(
    "character",
    "location",
    "item",
    "family",
    "organization",
    "note",
    "event",
    "calendar",
    "ability",
    "race",
    "map",
    "timeline",
    "conversation",
    "dice_roll",
    "quest"
);
export type EntityType = typeof EntityTypeSchema.Type;

/**
 * Base entity schema, shared across all entity types
 */
export const BaseEntitySchema = Schema.Struct({
    ...TaggedEntitySchema.fields,

    /**
     * Entity type
     */
    type: EntityTypeSchema,

    /**
     * Entity name
     */
    name: Schema.String,

    /**
     * Entity entry (description)
     */
    entry: Schema.NullishOr(Schema.String),

    /**
     * Entity entry in HTML format
     */
    entry_parsed: Schema.NullishOr(Schema.String),

    /**
     * Entity image URL
     */
    image: Schema.NullishOr(Schema.String),

    /**
     * Entity image full URL
     */
    image_full: Schema.NullishOr(Schema.String),

    /**
     * Entity image thumbnail URL
     */
    image_thumb: Schema.NullishOr(Schema.String),

    /**
     * Whether the entity has a custom image
     */
    has_custom_image: Schema.NullishOr(Schema.Boolean),

    /**
     * Entity tags
     */
    tags: Schema.NullishOr(Schema.Array(Schema.Any)),

    /**
     * Entity is private
     */
    is_private: Schema.NullishOr(Schema.Boolean),

    /**
     * Entity is template
     */
    is_template: Schema.NullishOr(Schema.Boolean),

    /**
     * Campaign ID
     */
    campaign_id: Schema.Number,

    /**
     * Entity URLs
     */
    urls: Schema.NullishOr(
        Schema.Struct({
            view: Schema.NullishOr(Schema.String),
            api: Schema.NullishOr(Schema.String),
        })
    ),

    /**
     * Created at timestamp
     */
    created_at: Schema.NullishOr(Schema.String),

    /**
     * Updated at timestamp
     */
    updated_at: Schema.NullishOr(Schema.String),
});
export type BaseEntity = typeof BaseEntitySchema.Type;

/**
 * Generic entity schema (used for listing all entities)
 */
export const EntitySchema = BaseEntitySchema;
export type Entity = typeof EntitySchema.Type;
