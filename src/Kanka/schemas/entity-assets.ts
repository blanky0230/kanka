import { Schema } from "effect";
import { EntityAttributes } from "./common.js";

/**
 * Entity Asset types
 */
export enum EntityAssetType {
    File = 1,
    Link = 2,
    Alias = 3
}

/**
 * Entity Asset item
 */
export interface KankaEntityAsset extends EntityAttributes {
    /**
     * Entity ID the asset belongs to
     */
    entity_id: number;

    /**
     * Name of the asset
     */
    name: string;

    /**
     * Type of asset (1: File, 2: Link, 3: Alias)
     */
    type_id: EntityAssetType;

    /**
     * Whether the asset is pinned
     */
    is_pinned: boolean;

    /**
     * Visibility setting (1: all, 2: self, etc.)
     */
    visibility_id: string;

    /**
     * Additional metadata for the asset
     */
    metadata: Record<string, unknown>;

    /**
     * Virtual property: if the asset is a file
     */
    _file?: boolean;

    /**
     * Virtual property: if the asset is a link
     */
    _link?: boolean;

    /**
     * Virtual property: if the asset is an alias
     */
    _alias?: boolean;

    /**
     * Virtual property: URL for file assets
     */
    _url?: string | null;
}

export const KankaEntityAssetSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    entity_id: Schema.Number,
    name: Schema.String,
    type_id: Schema.Number,
    is_pinned: Schema.Boolean,
    visibility_id: Schema.String,
    metadata: Schema.Unknown,
    _file: Schema.optional(Schema.Boolean),
    _link: Schema.optional(Schema.Boolean),
    _alias: Schema.optional(Schema.Boolean),
    _url: Schema.optional(Schema.Union(...[Schema.String, Schema.Null]))
});

/**
 * Parameters for creating a file asset
 */
export interface CreateEntityFileAssetParams {
    /**
     * Name of the asset (max 45 chars)
     */
    name: string;

    /**
     * Type ID (must be 1 for file)
     */
    type_id: EntityAssetType.File;

    /**
     * File to upload
     */
    files: File;

    /**
     * Visibility ID (1: all, 2: self, etc.)
     */
    visibility_id?: number;

    /**
     * Whether the asset is pinned
     */
    is_pinned?: boolean;
}

/**
 * Parameters for creating a link asset
 */
export interface CreateEntityLinkAssetParams {
    /**
     * Name of the asset (max 45 chars)
     */
    name: string;

    /**
     * Type ID (must be 2 for link)
     */
    type_id: EntityAssetType.Link;

    /**
     * Metadata for the link (must include icon and url)
     */
    metadata: {
        icon: string;
        url: string;
    };

    /**
     * Visibility ID (1: all, 2: self, etc.)
     */
    visibility_id?: number;
}

/**
 * Parameters for creating an alias asset
 */
export interface CreateEntityAliasAssetParams {
    /**
     * Name of the asset (max 45 chars)
     */
    name: string;

    /**
     * Type ID (must be 3 for alias)
     */
    type_id: EntityAssetType.Alias;

    /**
     * Visibility ID (1: all, 2: self, etc.)
     */
    visibility_id?: number;
}

/**
 * Union type for all asset creation parameters
 */
export type CreateEntityAssetParams =
    | CreateEntityFileAssetParams
    | CreateEntityLinkAssetParams
    | CreateEntityAliasAssetParams;
