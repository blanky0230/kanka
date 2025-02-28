import { Schema } from "effect";

/**
 * Relation between entities
 */
export interface KankaRelation {
    /**
     * The relation's owner entity ID
     */
    owner_id: number;

    /**
     * The relation's target entity ID
     */
    target_id: number;

    /**
     * Description of the relation
     */
    relation: string;

    /**
     * Attitude value (-100 to 100)
     */
    attitude: number | null;

    /**
     * Visibility ID: 1 for 'all', 2 'self', 3 'admin', 4 'self-admin' or 5 'members'
     */
    visibility_id: number;

    /**
     * If the relation is visible on the entity's submenu
     */
    is_pinned: boolean;

    /**
     * Hex colour of the attitude (with or without the '#')
     */
    colour: string | null;

    /**
     * When the relation was created
     */
    created_at: string;

    /**
     * User ID who created the relation
     */
    created_by: number | null;

    /**
     * When the relation was last updated
     */
    updated_at: string;
}

export const KankaRelationSchema = Schema.Struct({
    owner_id: Schema.Number,
    target_id: Schema.Number,
    relation: Schema.String,
    attitude: Schema.Union(...[Schema.Number, Schema.Null]),
    visibility_id: Schema.Number,
    is_pinned: Schema.Boolean,
    colour: Schema.Union(...[Schema.String, Schema.Null]),
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String
});

/**
 * Parameters for creating a relation
 */
export interface CreateRelationParams {
    /**
     * Description of the relation
     */
    relation: string;

    /**
     * The relation's owner entity ID
     */
    owner_id: number;

    /**
     * The relation's target entity ID
     * Required if targets is not set
     */
    target_id?: number;

    /**
     * An array of the relation's target entities
     * Required if target_id is not set
     */
    targets?: number[];

    /**
     * Attitude value (-100 to 100)
     */
    attitude?: number;

    /**
     * Hex colour of the attitude (with or without the '#')
     */
    colour?: string;

    /**
     * If set, will duplicate the relation but in the other direction
     */
    two_way?: boolean;

    /**
     * If the relation is visible on the entity's submenu
     */
    is_pinned?: boolean;

    /**
     * Visibility ID: 1 for 'all', 2 'self', 3 'admin', 4 'self-admin' or 5 'members'
     */
    visibility_id?: number;
}

/**
 * Parameters for updating a relation
 */
export interface UpdateRelationParams extends Partial<CreateRelationParams> { }

/**
 * Visibility options for relations
 */
export enum RelationVisibility {
    All = 1,
    Self = 2,
    Admin = 3,
    SelfAdmin = 4,
    Members = 5
}
