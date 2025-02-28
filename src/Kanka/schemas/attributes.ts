import { Schema } from "effect";

/**
 * Attribute entity
 */
export interface KankaAttribute {
    /**
     * Attribute ID
     */
    id: number;

    /**
     * When the attribute was created
     */
    created_at: string;

    /**
     * User ID who created the attribute
     */
    created_by: number | null;

    /**
     * When the attribute was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the attribute
     */
    updated_by: number | null;

    /**
     * Entity ID the attribute belongs to
     */
    entity_id: number;

    /**
     * Name of the attribute
     */
    name: string;

    /**
     * Value of the attribute
     */
    value: string;

    /**
     * Parsed value of the attribute
     */
    parsed: string;

    /**
     * Type ID of the attribute: 1 for standard, 2 for multiline text block, 3 for checkbox, 
     * 4 for section, 5 for random number, 6 for number, 7 for list choice
     */
    type_id: number;

    /**
     * Default order of the attribute
     */
    default_order: number;

    /**
     * If the attribute is private
     */
    is_private: boolean;

    /**
     * If the attribute is pinned on the entity view
     */
    is_pinned: boolean;

    /**
     * Custom field only shown in the API for linking attributes to system IDs
     */
    api_key: string;
}

export const KankaAttributeSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    entity_id: Schema.Number,
    name: Schema.String,
    value: Schema.String,
    parsed: Schema.String,
    type_id: Schema.Number,
    default_order: Schema.Number,
    is_private: Schema.Boolean,
    is_pinned: Schema.Boolean,
    api_key: Schema.String,
});

/**
 * Parameters for creating an attribute
 */
export interface CreateAttributeParams {
    /**
     * Name of the attribute
     */
    name: string;

    /**
     * The attribute's value
     */
    value?: string;

    /**
     * The attribute's order
     */
    default_order?: number;

    /**
     * The attribute's type ID: 1 for standard, 2 for multiline text block, 3 for checkbox, 
     * 4 for section, 5 for random number, 6 for number, 7 for list choice
     */
    type_id?: number;

    /**
     * If the attribute is only visible to admin members of the campaign
     */
    is_private?: boolean;

    /**
     * If the attribute is pinned on the entity view
     */
    is_pinned?: boolean;

    /**
     * Custom field only shown in the API for linking attributes to system IDs (max 20 chars)
     */
    api_key?: string;
}

/**
 * Parameters for updating an attribute
 */
export interface UpdateAttributeParams extends Partial<CreateAttributeParams> { }
