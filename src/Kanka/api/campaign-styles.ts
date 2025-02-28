import {
    CampaignStyle,
    CreateCampaignStyleParams,
    UpdateCampaignStyleParams,
} from "../schemas/campaign-styles.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all campaign styles
 * Note: This is a premium campaign feature. If the campaign isn't premium, this API endpoint will result in a 404.
 */
export const getCampaignStyles = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<CampaignStyle>>("campaign_styles", queryParams);
};

/**
 * Get a single campaign style
 */
export const getCampaignStyle = (id: number) => {
    return get<SingleResponse<CampaignStyle>>(`campaign_styles/${id}`);
};

/**
 * Create a campaign style
 */
export const createCampaignStyle = (params: CreateCampaignStyleParams) => {
    return post<SingleResponse<CampaignStyle>>("campaign_styles", params);
};

/**
 * Update a campaign style
 */
export const updateCampaignStyle = (id: number, params: UpdateCampaignStyleParams) => {
    return put<SingleResponse<CampaignStyle>>(`campaign_styles/${id}`, params);
};

/**
 * Delete a campaign style
 */
export const deleteCampaignStyle = (id: number) => {
    return del<void>(`campaign_styles/${id}`);
};
