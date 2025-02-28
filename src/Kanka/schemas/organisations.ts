import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Organisation entity
 */
export interface Organisation extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Organisation type
     */
    type?: string | null;

    /**
     * Parent organisation ID
     */
    organisation_id?: number | null;

    /**
     * Whether the organisation is defunct
     */
    is_defunct?: boolean;

    /**
     * Members (character IDs)
     */
    members?: number[];

    /**
     * Locations (location IDs)
     */
    locations?: number[];
}

export const OrganisationSchema = Schema.Struct({
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

    // Organisation-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    organisation_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    is_defunct: Schema.Union(...[Schema.Boolean, Schema.Undefined]),
    members: Schema.Union(...[Schema.Array(Schema.Number), Schema.Undefined]),
    locations: Schema.Union(...[Schema.Array(Schema.Number), Schema.Undefined]),
});

/**
 * Parameters for creating an organisation
 */
export interface CreateOrganisationParams {
    /**
     * Name of the organisation
     */
    name: string;

    /**
     * The html description of the organisation
     */
    entry?: string;

    /**
     * Type of organisation
     */
    type?: string;

    /**
     * The parent organisation id
     */
    organisation_id?: number;

    /**
     * Array of location ids
     */
    locations?: number[];

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * If the organisation is defunct
     */
    is_defunct?: boolean;

    /**
     * If the organisation is only visible to `admin` members of the campaign
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
 * Parameters for updating an organisation
 */
export interface UpdateOrganisationParams extends Partial<CreateOrganisationParams> { }
