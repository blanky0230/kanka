import { Schema } from "effect";
import { EntityAttributes, EntityAttributesSchema } from "./common.js";

/**
 * Bookmark options
 */
export interface BookmarkOptions {
    is_nested?: string;
}

export const BookmarkOptionsSchema = Schema.Struct({
    is_nested: Schema.optional(Schema.String),
});

/**
 * Bookmark entity
 */
export interface Bookmark {
    id: number;
    created_at: string;
    created_by: number | null;
    updated_at: string;
    updated_by: number | null;
    name: string;
    entity_id: number | null;
    filters: string | null;
    icon: string | null;
    is_private: number;
    is_active: number;
    menu: string | null;
    random_entity_type: string | null;
    type: string | null;
    tab: string;
    target: string | null;
    dashboard_id: number | null;
    options: BookmarkOptions;
}

export const BookmarkSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    name: Schema.String,
    entity_id: Schema.Union(...[Schema.Number, Schema.Null]),
    filters: Schema.Union(...[Schema.String, Schema.Null]),
    icon: Schema.Union(...[Schema.String, Schema.Null]),
    is_private: Schema.Number,
    is_active: Schema.Number,
    menu: Schema.Union(...[Schema.String, Schema.Null]),
    random_entity_type: Schema.Union(...[Schema.String, Schema.Null]),
    type: Schema.Union(...[Schema.String, Schema.Null]),
    tab: Schema.String,
    target: Schema.Union(...[Schema.String, Schema.Null]),
    dashboard_id: Schema.Union(...[Schema.Number, Schema.Null]),
    options: BookmarkOptionsSchema,
});

/**
 * Parameters for creating a bookmark
 */
export interface CreateBookmarkParams {
    /**
     * Name of the bookmark
     */
    name: string;

    /**
     * Entity id of the bookmark
     * Required without type, random_entity_type, dashboard_id
     */
    entity_id?: number;

    /**
     * The bookmark entity type id
     * Required without entity_id, random_entity_type, dashboard_id
     */
    type?: number;

    /**
     * The entity type (singular) for a random entity of that type
     * Required without entity_id, type, dashboard_id
     */
    random_entity_type?: string;

    /**
     * The dashboard id
     * Required without entity_id, type, random_entity_type
     */
    dashboard_id?: number;

    /**
     * Custom icon for premium campaigns
     */
    icon?: string;

    /**
     * Tab options for the link
     */
    tab?: string;

    /**
     * Filter options for the link
     */
    filters?: string;

    /**
     * Menu options for the link
     */
    menu?: string;

    /**
     * Position of the link
     */
    position?: number;

    /**
     * If the bookmark is only visible to admin members of the campaign
     */
    is_private?: boolean;

    /**
     * If the bookmark is visible
     */
    is_active?: boolean;

    /**
     * Key/Value pairs for optional parameters
     */
    options?: BookmarkOptions;
}

/**
 * Parameters for updating a bookmark
 */
export interface UpdateBookmarkParams extends Partial<CreateBookmarkParams> { }
