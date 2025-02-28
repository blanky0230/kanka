import { Schema } from "effect";

/**
 * Map Layer entity
 */
export interface KankaMapLayer {
    /**
     * Layer ID
     */
    id: number;

    /**
     * When the layer was created
     */
    created_at: string;

    /**
     * User ID who created the layer
     */
    created_by: number | null;

    /**
     * When the layer was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the layer
     */
    updated_by: number | null;

    /**
     * If the layer is private
     */
    is_private: boolean;

    /**
     * Name of the layer
     */
    name: string;

    /**
     * The parent map
     */
    map_id: number;

    /**
     * Entry of the layer
     */
    entry: string | null;

    /**
     * Type of the layer (null and 0 for standard, 1 for overlay, 2 for overlay_shown)
     */
    type_id: number | null;

    /**
     * Type of the layer as a string
     */
    type: string;

    /**
     * Position in the list of layers
     */
    position: number;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id: number;

    /**
     * Width of the layer image
     */
    width: number;

    /**
     * Height of the layer image
     */
    height: number;
}

export const KankaMapLayerSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.String,
    map_id: Schema.Number,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    type_id: Schema.Union(...[Schema.Number, Schema.Null]),
    type: Schema.String,
    position: Schema.Number,
    visibility_id: Schema.Number,
    width: Schema.Number,
    height: Schema.Number,
});

/**
 * Parameters for creating a map layer
 */
export interface CreateMapLayerParams {
    /**
     * Name of the map layer
     */
    name: string;

    /**
     * The parent map
     */
    map_id: number;

    /**
     * URL to a picture to be used for the map
     */
    image_url?: string;

    /**
     * Entry of the layer
     */
    entry?: string;

    /**
     * Type of the layer (null and 0 for standard, 1 for overlay, 2 for overlay_shown)
     */
    type_id?: number;

    /**
     * Position in the list of layers
     */
    position?: number;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id?: number;

    /**
     * If the layer is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a map layer
 */
export interface UpdateMapLayerParams extends Partial<CreateMapLayerParams> { }
