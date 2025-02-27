import { Schema } from "effect";
import { EntityAttributes, NamedEntity, TaggableEntity } from "./common.js";

/**
 * Entity type
 */
export interface Entity extends TaggableEntity {
    /**
     * The entity's type field
     */
    type: string;

    /**
     * The type of entity as an integer
     */
    type_id: number;

    /**
     * The type of entity as a code (character, map)
     */
    entity_type: string;

    /**
     * The id identifying the entity against all other entities of the same type
     */
    child_id: number;

    /**
     * Campaign ID
     */
    campaign_id: number;

    /**
     * Tooltip
     */
    tooltip: string | null;

    /**
     * Header image
     */
    header_image: string | null;

    /**
     * Header image UUID
     */
    header_uuid: string | null;

    /**
     * Image UUID
     */
    image_uuid: string | null;

    /**
     * Whether the entity is a template
     */
    is_template: boolean;
}

export const EntitySchema = Schema.Struct({
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
    type: Schema.String,
    type_id: Schema.Number,
    entity_type: Schema.String,
    child_id: Schema.Number,
    campaign_id: Schema.Number,
    tooltip: Schema.Union(...[Schema.String, Schema.Null]),
    header_image: Schema.Union(...[Schema.String, Schema.Null]),
    header_uuid: Schema.Union(...[Schema.String, Schema.Null]),
    image_uuid: Schema.Union(...[Schema.String, Schema.Null]),
    is_template: Schema.Boolean,
    is_attributes_private: Schema.Boolean,
});

/**
 * Parameters for filtering entities
 */
export interface FilterEntitiesParams {
    /**
     * Filter by entity types (comma-separated)
     */
    types?: string;

    /**
     * Filter by name (like %% search)
     */
    name?: string;

    /**
     * Filter by privacy
     */
    is_private?: boolean;

    /**
     * Filter by template status
     */
    is_template?: boolean;

    /**
     * Filter by creator user ID
     */
    created_by?: number;

    /**
     * Filter by updater user ID
     */
    updated_by?: number;

    /**
     * Filter by tags
     */
    tags?: number[];

    /**
     * Page number
     */
    page?: number;

    /**
     * Items per page
     */
    perPage?: number;
}

/**
 * Parameters for creating entities
 */
export interface CreateEntityParams {
    /**
     * Name of the entity
     */
    name: string;

    /**
     * Id of the module to which the entity will belong to
     */
    module: number;

    /**
     * The html description of the entity
     */
    entry?: string;

    /**
     * Type of the entity
     */
    type?: string;

    /**
     * An array containing the ids of tags to apply to the entity
     */
    tags?: number[];
}

/**
 * Parameters for transforming entities
 */
export interface TransformEntitiesParams {
    /**
     * The ids of the entities to transform
     */
    entities: number[];

    /**
     * The type of entity the entity will be transformed to
     */
    entity_type: string;
}

/**
 * Parameters for transferring entities
 */
export interface TransferEntitiesParams {
    /**
     * The ids of the entities to transfer or copy
     */
    entities: number[];

    /**
     * The id of the campaign the entity will be transferred or copied to
     */
    campaign_id: number;

    /**
     * True if the entity will be copied, false if the entity will be transferred
     */
    copy?: boolean;
}

/**
 * Parameters for recovering entities
 */
export interface RecoverEntitiesParams {
    /**
     * The ids of the entities to recover
     */
    entities: number[];
}
