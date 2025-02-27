import { NamedEntity, TaggableEntity } from "./common.js";

/**
 * Campaign entity
 */
export interface Campaign extends TaggableEntity {
    /**
     * Campaign locale
     */
    locale: string;

    /**
     * Campaign visibility
     */
    visibility: "public" | "private";

    /**
     * Campaign description
     */
    entry: string | null;

    /**
     * Campaign header image
     */
    header_image: string | null;

    /**
     * Campaign header image full URL
     */
    header_image_full: string | null;

    /**
     * Campaign header image thumbnail URL
     */
    header_image_thumb: string | null;

    /**
     * Whether the campaign has a custom header image
     */
    has_custom_header_image: boolean;

    /**
     * Campaign system
     */
    system: string | null;

    /**
     * Campaign theme
     */
    theme: string | null;

    /**
     * Campaign CSS
     */
    css: string | null;

    /**
     * Campaign settings
     */
    settings: CampaignSettings;

    /**
     * Campaign follower count
     */
    follower_count: number;

    /**
     * Campaign boost count
     */
    boost_count: number;

    /**
     * Campaign post count
     */
    post_count: number;

    /**
     * Campaign entity count
     */
    entity_count: number;

    /**
     * Whether the campaign is boosted by the current user
     */
    is_boosted: boolean;

    /**
     * Whether the campaign is followed by the current user
     */
    is_followed: boolean;
}

/**
 * Campaign settings
 */
export interface CampaignSettings {
    /**
     * Whether the campaign is public
     */
    is_public: boolean;

    /**
     * Whether the campaign has a public dashboard
     */
    has_public_dashboard: boolean;

    /**
     * Whether the campaign has entity notes
     */
    entity_notes: boolean;

    /**
     * Whether the campaign has entity permissions
     */
    entity_permissions: boolean;

    /**
     * Whether the campaign has entity events
     */
    entity_events: boolean;

    /**
     * Whether the campaign has entity files
     */
    entity_files: boolean;

    /**
     * Whether the campaign has entity inventories
     */
    entity_inventory: boolean;

    /**
     * Whether the campaign has entity abilities
     */
    entity_abilities: boolean;

    /**
     * Whether the campaign has entity relations
     */
    entity_relations: boolean;

    /**
     * Whether the campaign has entity assets
     */
    entity_assets: boolean;

    /**
     * Whether the campaign has entity maps
     */
    entity_maps: boolean;

    /**
     * Whether the campaign has entity timelines
     */
    entity_timelines: boolean;

    /**
     * Whether the campaign has entity attributes
     */
    entity_attributes: boolean;
}

/**
 * Campaign member
 */
export interface CampaignMember extends NamedEntity {
    /**
     * Member user ID
     */
    user_id: number;

    /**
     * Member campaign ID
     */
    campaign_id: number;

    /**
     * Member role
     */
    role: "owner" | "admin" | "player";
}

/**
 * Campaign creation parameters
 */
export interface CreateCampaignParams {
    /**
     * Campaign name
     */
    name: string;

    /**
     * Campaign entry/description
     */
    entry?: string;

    /**
     * Campaign locale
     */
    locale?: string;

    /**
     * Campaign visibility
     */
    visibility?: "public" | "private";

    /**
     * Campaign theme
     */
    theme?: string;

    /**
     * Campaign system
     */
    system?: string;

    /**
     * Campaign image
     */
    image?: string;

    /**
     * Campaign header image
     */
    header_image?: string;

    /**
     * Campaign CSS
     */
    css?: string;

    /**
     * Campaign tags
     */
    tags?: number[];

    /**
     * Whether the campaign is private
     */
    is_private?: boolean;
}

/**
 * Campaign update parameters
 */
export interface UpdateCampaignParams extends Partial<CreateCampaignParams> { }
