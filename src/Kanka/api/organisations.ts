import {
    Organisation,
    CreateOrganisationParams,
    UpdateOrganisationParams,
} from "../schemas/organisations.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all organisations with optional filtering
 */
export const getOrganisations = (params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    name?: string;
    is_private?: boolean;
    is_defunct?: boolean;
    created_by?: number;
    updated_by?: number;
    tags?: number[];
    organisation_id?: number;
    type?: string;
}) => {
    // Convert tags array to individual query parameters if needed
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        name: params?.name,
        is_private: params?.is_private,
        is_defunct: params?.is_defunct,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        organisation_id: params?.organisation_id,
        type: params?.type,
    };

    // Add tags as individual query parameters if present
    if (params?.tags && params.tags.length > 0) {
        params.tags.forEach((tag, index) => {
            queryParams[`tags[${index}]`] = tag;
        });
    }

    return get<PaginatedResponse<Organisation>>("organisations", queryParams);
};

/**
 * Get an organisation by ID
 */
export const getOrganisation = (id: number) => {
    return get<SingleResponse<Organisation>>(`organisations/${id}`);
};

/**
 * Create a new organisation
 */
export const createOrganisation = (params: CreateOrganisationParams) => {
    return post<SingleResponse<Organisation>>("organisations", params);
};

/**
 * Update an organisation
 */
export const updateOrganisation = (id: number, params: UpdateOrganisationParams) => {
    return put<SingleResponse<Organisation>>(`organisations/${id}`, params);
};

/**
 * Delete an organisation
 */
export const deleteOrganisation = (id: number) => {
    return del<void>(`organisations/${id}`);
};
