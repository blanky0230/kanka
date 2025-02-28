import { Schema } from "effect";

/**
 * Map Marker entity
 */
export interface MapMarker {
    /**
     * Marker ID
     */
    id: number;

    /**
     * When the marker was created
     */
    created_at: string;

    /**
     * User ID who created the marker
     */
    created_by: number | null;

    /**
     * When the marker was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the marker
     */
    updated_by: number | null;

    /**
     * If the marker is private
     */
    is_private: boolean;

    /**
     * Name of the marker (if no entity is associated)
     */
    name: string | null;

    /**
     * Entity ID associated with this marker
     */
    entity_id: number | null;

    /**
     * The parent map
     */
    map_id: number;

    /**
     * Latitude of the marker
     */
    latitude: string;

    /**
     * Longitude of the marker
     */
    longitude: string;

    /**
     * Shape of the marker (1 for Marker, 2 for Label, 3 for Circle, 4 for Polygon)
     */
    shape_id: number;

    /**
     * Icon of the marker (1 for Marker, 2 for Exclamation, 3 for Interrogation, 4 for Entity)
     */
    icon: string;

    /**
     * ID of the marker group
     */
    group_id: number | null;

    /**
     * If the marker is draggable on the map
     */
    is_draggable: boolean;

    /**
     * Disable the marker tooltip popping up on mouse hover
     */
    is_popupless: boolean;

    /**
     * Polygon coordinates
     */
    custom_shape: string | null;

    /**
     * HTML of the custom icon
     */
    custom_icon: string | null;

    /**
     * Size (1 to 6, 6 being custom)
     */
    size_id: number;

    /**
     * Opacity (0 to 100)
     */
    opacity: number;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id: number;

    /**
     * Hex colour code with leading #
     */
    colour: string | null;

    /**
     * Hex font colour code with leading #
     */
    font_colour: string | null;

    /**
     * Custom circle radius size (if shape_id is 3 and size_id is 6)
     */
    circle_radius: number | null;

    /**
     * Polygon rendering options
     */
    polygon_style: Record<string, string | number> | null;
}

export const MapMarkerSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.Union(...[Schema.String, Schema.Null]),
    entity_id: Schema.Union(...[Schema.Number, Schema.Null]),
    map_id: Schema.Number,
    latitude: Schema.String,
    longitude: Schema.String,
    shape_id: Schema.Number,
    icon: Schema.String,
    group_id: Schema.Union(...[Schema.Number, Schema.Null]),
    is_draggable: Schema.Boolean,
    is_popupless: Schema.Boolean,
    custom_shape: Schema.Union(...[Schema.String, Schema.Null]),
    custom_icon: Schema.Union(...[Schema.String, Schema.Null]),
    size_id: Schema.Number,
    opacity: Schema.Number,
    visibility_id: Schema.Number,
    colour: Schema.Union(...[Schema.String, Schema.Null]),
    font_colour: Schema.Union(...[Schema.String, Schema.Null]),
    circle_radius: Schema.Union(...[Schema.Number, Schema.Null]),
    polygon_style: Schema.Union(...[Schema.Any, Schema.Null]),
});

/**
 * Parameters for creating a map marker
 */
export interface CreateMapMarkerParams {
    /**
     * Name of the map marker (Required without entity_id)
     */
    name?: string;

    /**
     * Entity linked to the map marker (Required without name)
     */
    entity_id?: number;

    /**
     * The parent map
     */
    map_id: number;

    /**
     * Latitude of the marker
     */
    latitude: string | number;

    /**
     * Longitude of the marker
     */
    longitude: string | number;

    /**
     * Shape of the marker (1 for Marker, 2 for Label, 3 for Circle, 4 for Polygon)
     */
    shape_id: number;

    /**
     * Icon of the marker (1 for Marker, 2 for Exclamation, 3 for Interrogation, 4 for Entity)
     */
    icon: string | number;

    /**
     * ID of the marker group
     */
    group_id?: number;

    /**
     * If the marker is draggable on the map
     */
    is_draggable?: boolean;

    /**
     * Disable the marker tooltip popping up on mouse hover
     */
    is_popupless?: boolean;

    /**
     * Polygon coordinates
     */
    custom_shape?: string;

    /**
     * HTML of the custom icon
     */
    custom_icon?: string;

    /**
     * Size (1 to 6, 6 being custom)
     */
    size_id?: number;

    /**
     * Opacity (0 to 100)
     */
    opacity?: number;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id?: number;

    /**
     * Hex colour code with leading #
     */
    colour?: string;

    /**
     * Hex font colour code with leading #
     */
    font_colour?: string;

    /**
     * Custom circle radius size (if shape_id is 3 and size_id is 6)
     */
    circle_radius?: number;

    /**
     * Polygon rendering options
     */
    polygon_style?: Record<string, string | number>;

    /**
     * If the marker is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a map marker
 */
export interface UpdateMapMarkerParams extends Partial<CreateMapMarkerParams> { }
