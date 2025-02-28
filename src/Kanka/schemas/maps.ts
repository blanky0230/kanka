import { Schema } from "effect";
import { TaggableEntity } from "./common.js";
import { KankaMapLayer, KankaMapLayerSchema } from "./map-layers.js";
import { KankaMapGroup, KankaMapGroupSchema } from "./map-groups.js";

/**
 * Map entity
 */
export interface KankaMap extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Whether the map uses openmaps (the real world)
     */
    is_real: boolean;

    /**
     * The related location id
     */
    location_id: number | null;

    /**
     * Type of map
     */
    type: string | null;

    /**
     * Height of the map image
     */
    height: number;

    /**
     * Width of the map image
     */
    width: number;

    /**
     * The parent map
     */
    map_id: number | null;

    /**
     * Grid size
     */
    grid: number;

    /**
     * Minimum zoom level
     */
    min_zoom: number;

    /**
     * Maximum zoom level
     */
    max_zoom: number;

    /**
     * Initial zoom level
     */
    initial_zoom: number;

    /**
     * The map marker the map will center on page load
     */
    center_marker_id: number | null;

    /**
     * The custom longitude on page load
     */
    center_x: number | null;

    /**
     * The custom latitude on page load
     */
    center_y: number | null;

    /**
     * Parsed entry
     */
    entry_parsed: string | null;

    /**
     * Array of map layers
     */
    layers: KankaMapLayer[];

    /**
     * Array of map groups
     */
    groups: KankaMapGroup[];
}

export const KankaMapSchema = Schema.Struct({
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

    // Map-specific fields
    entity_id: Schema.Number,
    is_real: Schema.Boolean,
    location_id: Schema.Union(...[Schema.Number, Schema.Null]),
    type: Schema.Union(...[Schema.String, Schema.Null]),
    height: Schema.Number,
    width: Schema.Number,
    map_id: Schema.Union(...[Schema.Number, Schema.Null]),
    grid: Schema.Number,
    min_zoom: Schema.Number,
    max_zoom: Schema.Number,
    initial_zoom: Schema.Number,
    center_marker_id: Schema.Union(...[Schema.Number, Schema.Null]),
    center_x: Schema.Union(...[Schema.Number, Schema.Null]),
    center_y: Schema.Union(...[Schema.Number, Schema.Null]),
    entry_parsed: Schema.Union(...[Schema.String, Schema.Null]),
    layers: Schema.Array(Schema.Any),
    groups: Schema.Array(Schema.Any),
});

/**
 * Parameters for creating a map
 */
export interface CreateMapParams {
    /**
     * Name of the map
     */
    name: string;

    /**
     * The html description of the map
     */
    entry?: string;

    /**
     * Type of map
     */
    type?: string;

    /**
     * The parent map
     */
    map_id?: number;

    /**
     * The related location id
     */
    location_id?: number;

    /**
     * The map marker the map will center on page load
     */
    center_marker_id?: number;

    /**
     * The custom longitude on page load
     */
    center_x?: number;

    /**
     * The custom latitude on page load
     */
    center_y?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;

    /**
     * If the map uses openmaps (the real world)
     */
    is_real?: boolean;

    /**
     * If the map is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a map
 */
export interface UpdateMapParams extends Partial<CreateMapParams> { }
