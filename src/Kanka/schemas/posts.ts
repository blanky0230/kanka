import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Post entity
 */
export interface KankaPost {
    /**
     * Post ID
     */
    id: number;

    /**
     * When the post was created
     */
    created_at: string;

    /**
     * User ID who created the post
     */
    created_by: number | null;

    /**
     * When the post was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the post
     */
    updated_by: number | null;

    /**
     * Entity ID the post belongs to
     */
    entity_id: number;

    /**
     * Content of the post
     */
    entry: string | null;

    /**
     * Parsed content of the post
     */
    entry_parsed: string | null;

    /**
     * Position for ordering pinned posts
     */
    position: number | null;

    /**
     * Visibility ID: 1 for all, 2 self, 3 admin, 4 self-admin or 5 members
     */
    visibility_id: number;

    /**
     * Name of the post
     */
    name: string;

    /**
     * Post settings
     */
    settings: Record<string, string> | [];

    /**
     * Permissions for the post
     */
    permissions: Array<{
        user_id?: number;
        role_id?: number;
        permission: number;
        "permission-text": string;
    }>;

    /**
     * Layout ID for the post
     */
    layout_id: number | null;

    /**
     * Tags associated with the post
     */
    tags: number[] | null;
}

export const KankaPostSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    entity_id: Schema.Number,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    entry_parsed: Schema.Union(...[Schema.String, Schema.Null]),
    position: Schema.Union(...[Schema.Number, Schema.Null]),
    visibility_id: Schema.Number,
    name: Schema.String,
    settings: Schema.Unknown,
    permissions: Schema.Array(
        Schema.Struct({
            user_id: Schema.optional(Schema.Number),
            role_id: Schema.optional(Schema.Number),
            permission: Schema.Number,
            "permission-text": Schema.String,
        })
    ),
    layout_id: Schema.Union(...[Schema.Number, Schema.Null]),
    tags: Schema.Union(...[Schema.Array(Schema.Number), Schema.Null]),
});

/**
 * Parameters for creating a post
 */
export interface CreatePostParams {
    /**
     * Name of the post
     */
    name: string;

    /**
     * The html content of the post
     */
    entry?: string;

    /**
     * The post's parent entity
     */
    entity_id: number;

    /**
     * The visibility: 1 for all, 2 self, 3 admin, 4 self-admin or 5 members
     */
    visibility_id?: number;

    /**
     * Position for ordering pinned posts
     */
    position?: number | null;

    /**
     * Post settings
     */
    settings?: Record<string, string>;

    /**
     * The type of Post Layout the post will render (Only for Premium campaigns)
     */
    layout_id?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Required to save tags
     */
    save_tags?: boolean;
}

/**
 * Parameters for updating a post
 */
export interface UpdatePostParams extends Partial<CreatePostParams> { }
