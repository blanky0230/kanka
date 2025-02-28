import { Schema } from "effect";

/**
 * Campaign Style entity
 */
export interface CampaignStyle {
    id: number;
    name: string;
    content: string;
    is_enabled: number;
    is_theme: number;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export const CampaignStyleSchema = Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    content: Schema.String,
    is_enabled: Schema.Number,
    is_theme: Schema.Number,
    created_by: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String
});

/**
 * Parameters for creating a campaign style
 */
export interface CreateCampaignStyleParams {
    /**
     * The style name
     */
    name: string;

    /**
     * The css rules
     */
    content: string;

    /**
     * If the style is enabled or not
     */
    is_enabled?: boolean;
}

/**
 * Parameters for updating a campaign style
 */
export interface UpdateCampaignStyleParams extends Partial<CreateCampaignStyleParams> { }
