import { Schema } from "effect";
import { TaggedEntitySchema } from "../../schemas/common.js";

/**
 * Campaign visibility options
 */
const CampaignVisibilitySchema = Schema.Literal("public", "private");
export type CampaignVisibility = typeof CampaignVisibilitySchema.Type;

/**
 * Campaign settings schema
 */
const CampaignSettingsSchema = Schema.Struct({
    /**
     * Whether the campaign is public
     */
    is_public: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has a public dashboard
     */
    has_public_dashboard: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity notes
     */
    entity_notes: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity permissions
     */
    entity_permissions: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity events
     */
    entity_events: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity files
     */
    entity_files: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity inventories
     */
    entity_inventory: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity abilities
     */
    entity_abilities: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity relations
     */
    entity_relations: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity assets
     */
    entity_assets: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity maps
     */
    entity_maps: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity timelines
     */
    entity_timelines: Schema.optional(Schema.Boolean),

    /**
     * Whether the campaign has entity attributes
     */
    entity_attributes: Schema.optional(Schema.Boolean),
});
type _CampaignSettings = typeof CampaignSettingsSchema.Type;

/**
 * Campaign role schema
 */
const CampaignRoleSchema = Schema.Struct({
    /**
     * Role ID
     */
    id: Schema.Number,

    /**
     * Role name
     */
    name: Schema.String,

    /**
     * Whether the role has admin privileges
     */
    is_admin: Schema.Boolean,
});
export type CampaignRole = typeof CampaignRoleSchema.Type;

/**
 * Campaign member user schema
 */
const CampaignMemberUserSchema = Schema.Struct({
    /**
     * User ID
     */
    id: Schema.Number,

    /**
     * User name
     */
    name: Schema.String,

    /**
     * User avatar URL
     */
    avatar: Schema.NullishOr(Schema.String),
});
export type CampaignMemberUser = typeof CampaignMemberUserSchema.Type;

/**
 * Campaign member list item schema (as returned in campaign.members)
 */
const CampaignMemberListItemSchema = Schema.Struct({
    /**
     * Member ID
     */
    id: Schema.Number,

    /**
     * Member user information
     */
    user: CampaignMemberUserSchema,
});
export type CampaignMemberListItem = typeof CampaignMemberListItemSchema.Type;

/**
 * Campaign schema
 */
export const CampaignSchema = Schema.Struct({
    ...TaggedEntitySchema.fields,

    /**
     * Campaign locale
     */
    locale: Schema.NullishOr(Schema.String),

    /**
     * Campaign visibility
     */
    visibility: CampaignVisibilitySchema,

    /**
     * Campaign visibility ID
     */
    visibility_id: Schema.Number,

    /**
     * Campaign description
     */
    entry: Schema.NullishOr(Schema.String),

    /**
     * Parsed campaign description (HTML)
     */
    entry_parsed: Schema.optional(Schema.String),

    /**
     * Campaign header image
     */
    header_image: Schema.optional(Schema.String),

    /**
     * Campaign header image full URL
     */
    header_image_full: Schema.optional(Schema.String),

    /**
     * Campaign header image thumbnail URL
     */
    header_image_thumb: Schema.optional(Schema.String),

    /**
     * Whether the campaign has a custom header image
     */
    has_custom_header_image: Schema.NullishOr(Schema.Boolean),

    /**
     * Campaign system
     */
    system: Schema.optional(Schema.String),

    /**
     * Campaign theme
     */
    theme: Schema.optional(Schema.String),

    /**
     * Campaign CSS
     */
    css: Schema.optional(Schema.String),

    /**
     * Campaign members
     */
    members: Schema.Set(CampaignMemberListItemSchema),

    /**
     * Campaign settings
     */
    settings: Schema.NullOr(CampaignSettingsSchema),

    /**
     * Campaign setting array
     */
    setting: Schema.optional(Schema.Array(Schema.Any)),

    /**
     * Campaign UI settings
     */
    ui_settings: Schema.NullishOr(Schema.Any),

    /**
     * Campaign default images
     */
    default_images: Schema.NullishOr(Schema.Array(Schema.Any)),

    /**
     * Campaign follower count
     */
    follower_count: Schema.optional(Schema.NumberFromString),

    /**
     * Campaign boost count
     */
    boost_count: Schema.NullishOr(Schema.Number),

    /**
     * Campaign post count
     */
    post_count: Schema.NullishOr(Schema.Number),

    /**
     * Campaign entity count
     */
    entity_count: Schema.NullishOr(Schema.Number),

    /**
     * Whether the campaign is boosted by the current user
     */
    is_boosted: Schema.NullishOr(Schema.Boolean),

    /**
     * Whether the campaign is followed by the current user
     */
    is_followed: Schema.NullishOr(Schema.Boolean),

    urls: Schema.NullishOr(
        Schema.Struct({
            view: Schema.NullishOr(Schema.String),
            api: Schema.NullishOr(Schema.String),
        })
    ),
})
export type Campaign = typeof CampaignSchema.Type;

/**
 * Campaign member role schema
 */
const CampaignMemberRoleSchema = Schema.Literal("owner", "admin", "player");
type _CampaignMemberRole = typeof CampaignMemberRoleSchema.Type;

/**
 * Campaign member schema
 */
const CampaignMemberSchema = Schema.Struct({
    /**
     * Member ID
     */
    id: Schema.Number,

    /**
     * Member name
     */
    name: Schema.String,

    /**
     * Member avatar URL
     */
    avatar: Schema.String,

    /**
     * Member user ID
     */
    user_id: Schema.Number,

    /**
     * Member campaign ID
     */
    campaign_id: Schema.Number,

    /**
     * Member role
     */
    role: CampaignMemberRoleSchema,

    /**
     * Creation timestamp
     */
    created_at: Schema.String,

    /**
     * Last update timestamp
     */
    updated_at: Schema.String,
});
export type CampaignMember = typeof CampaignMemberSchema.Type;


const CampaignCreationSchema = Schema.Struct({
    name: Schema.String,
    entry: Schema.optional(Schema.String),

    locale: Schema.optional(Schema.String),

    visibility: Schema.optional(CampaignVisibilitySchema),

    visibility_id: Schema.optional(Schema.Number),

    theme: Schema.optional(Schema.String),

    system: Schema.optional(Schema.String),

    image: Schema.optional(Schema.String),

    header_image: Schema.optional(Schema.String),

    css: Schema.optional(Schema.String),

    tags: Schema.optional(Schema.Array(Schema.Number)),

    // is_private: Schema.optional(Schema.Boolean),

    settings: Schema.optional(Schema.partial(CampaignSettingsSchema))
})
export type CreateCampaignParams = typeof CampaignCreationSchema.Type;

/**
 * Campaign update parameters
 */
export type UpdateCampaignParams = Partial<CreateCampaignParams>;
