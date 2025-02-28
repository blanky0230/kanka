import { Schema } from "effect";
import { SingleResponse, TaggableEntity } from "./common.js";

/**
 * Family entity
 */
export interface Family extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Family type
     */
    type?: string | null;

    /**
     * Parent family ID
     */
    family_id?: number | null;

    /**
     * Location ID
     */
    location_id?: number | null;

    /**
     * Whether the family is extinct
     */
    is_extinct?: boolean;

    /**
     * Family members (character IDs)
     */
    members?: number[];
}

export const FamilySchema = Schema.Struct({
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

    // Family-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    family_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    location_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    is_extinct: Schema.Union(...[Schema.Boolean, Schema.Undefined]),
    members: Schema.Union(...[Schema.Array(Schema.Number), Schema.Undefined]),
});

/**
 * Parameters for creating a family
 */
export interface CreateFamilyParams {
    /**
     * Name of the family
     */
    name: string;

    /**
     * The html description of the family
     */
    entry?: string;

    /**
     * Type of family
     */
    type?: string;

    /**
     * The parent family id
     */
    family_id?: number;

    /**
     * The location id where this family is based
     */
    location_id?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * If the family is extinct
     */
    is_extinct?: boolean;

    /**
     * If the family is only visible to `admin` members of the campaign
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
 * Parameters for updating a family
 */
export interface UpdateFamilyParams extends Partial<CreateFamilyParams> { }

/**
 * Family tree node
 */
export interface FamilyTreeNode {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * UUID for the node
     */
    uuid: string;

    /**
     * Role of the node (optional)
     */
    role?: string;

    /**
     * Color of the node (optional)
     */
    colour?: string;

    /**
     * CSS class for the node (optional)
     */
    cssClass?: string;

    /**
     * Visibility ID for the node (optional)
     * 1 for all, 2 for admins, 3 for admins and self, 4 for self, 5 for campaign members
     */
    visibility?: string | number;

    /**
     * Whether the node shows "Unknown" instead of its entity (optional)
     */
    isUnknown?: boolean;

    /**
     * Relations of the node (only for founder and children nodes)
     */
    relations?: FamilyTreeRelation[];

    /**
     * Children of the node (only for relation nodes)
     */
    children?: FamilyTreeNode[];
}

/**
 * Family tree relation
 */
export interface FamilyTreeRelation extends FamilyTreeNode { }

/**
 * Family tree
 */
export interface FamilyTree {
    /**
     * Array of nodes for the family tree
     */
    tree: FamilyTreeNode[];
}

/**
 * Family tree response
 */
export type FamilyTreeResponse = SingleResponse<FamilyTreeNode[]>;
