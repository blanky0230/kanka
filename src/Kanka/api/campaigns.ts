import {
    Campaign,
    CampaignMember,
    CreateCampaignParams,
    UpdateCampaignParams,
} from "../schemas/campaigns.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all campaigns
 */
export const getCampaigns = (params?: {
    page?: number;
    perPage?: number;
}) => {
    return get<PaginatedResponse<Campaign>>("campaigns", {
        page: params?.page,
        per_page: params?.perPage,
    });
};

/**
 * Get a campaign by ID
 */
export const getCampaign = (id: number) => {
    return get<SingleResponse<Campaign>>(`campaigns/${id}`);
};

/**
 * Create a new campaign
 */
export const createCampaign = (params: CreateCampaignParams) => {
    return post<SingleResponse<Campaign>>("campaigns", params);
};

/**
 * Update a campaign
 */
export const updateCampaign = (id: number, params: UpdateCampaignParams) => {
    return put<SingleResponse<Campaign>>(`campaigns/${id}`, params);
};

/**
 * Delete a campaign
 */
export const deleteCampaign = (id: number) => {
    return del<void>(`campaigns/${id}`);
};

/**
 * Get campaign members
 */
export const getCampaignMembers = (
    campaignId: number,
    params?: {
        page?: number;
        perPage?: number;
    }
) => {
    return get<PaginatedResponse<CampaignMember>>(`campaigns/${campaignId}/users`, {
        page: params?.page,
        per_page: params?.perPage,
    });
};

/**
 * Get a campaign member
 */
export const getCampaignMember = (campaignId: number, userId: number) => {
    return get<SingleResponse<CampaignMember>>(`campaigns/${campaignId}/users/${userId}`);
};

/**
 * Add a member to a campaign
 */
export const addCampaignMember = (
    campaignId: number,
    params: {
        user_id: number;
        role?: "owner" | "admin" | "player";
    }
) => {
    return post<SingleResponse<CampaignMember>>(`campaigns/${campaignId}/users`, params);
};

/**
 * Update a campaign member
 */
export const updateCampaignMember = (
    campaignId: number,
    userId: number,
    params: {
        role: "owner" | "admin" | "player";
    }
) => {
    return put<SingleResponse<CampaignMember>>(`campaigns/${campaignId}/users/${userId}`, params);
};

/**
 * Remove a member from a campaign
 */
export const removeCampaignMember = (campaignId: number, userId: number) => {
    return del<void>(`campaigns/${campaignId}/users/${userId}`);
};

/**
 * Follow a campaign
 */
// export const followCampaign = (campaignId: number) => {
//     return post<void>(`campaigns/${campaignId}/follow`);
// };

/**
 * Unfollow a campaign
 */
export const unfollowCampaign = (campaignId: number) => {
    return del<void>(`campaigns/${campaignId}/follow`);
};

/**
 * Boost a campaign
 */
// export const boostCampaign = (campaignId: number) => {
//     return post<void>(`campaigns/${campaignId}/boost`);
// };

/**
 * Unboost a campaign
 */
export const unboostCampaign = (campaignId: number) => {
    return del<void>(`campaigns/${campaignId}/boost`);
};
