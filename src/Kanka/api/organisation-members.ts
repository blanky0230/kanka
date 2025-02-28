import {
    OrganisationMember,
    CreateOrganisationMemberParams,
    UpdateOrganisationMemberParams,
} from "../schemas/organisation-members.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all members of an organisation
 */
export const getOrganisationMembers = (organisationId: number, params?: {
    page?: number;
    perPage?: number;
    // Add other filter parameters as needed
    is_private?: boolean;
    created_by?: number;
    updated_by?: number;
    role?: string;
    status_id?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        is_private: params?.is_private,
        created_by: params?.created_by,
        updated_by: params?.updated_by,
        role: params?.role,
        status_id: params?.status_id,
    };

    return get<PaginatedResponse<OrganisationMember>>(
        `organisations/${organisationId}/organisation_members`,
        queryParams
    );
};

/**
 * Get an organisation member by ID
 */
export const getOrganisationMember = (organisationId: number, memberId: number) => {
    return get<SingleResponse<OrganisationMember>>(
        `organisations/${organisationId}/organisation_members/${memberId}`
    );
};

/**
 * Create a new organisation member
 */
export const createOrganisationMember = (
    organisationId: number,
    params: CreateOrganisationMemberParams
) => {
    return post<SingleResponse<OrganisationMember>>(
        `organisations/${organisationId}/organisation_members`,
        params
    );
};

/**
 * Update an organisation member
 */
export const updateOrganisationMember = (
    organisationId: number,
    memberId: number,
    params: UpdateOrganisationMemberParams
) => {
    return put<SingleResponse<OrganisationMember>>(
        `organisations/${organisationId}/organisation_members/${memberId}`,
        params
    );
};

/**
 * Delete an organisation member
 */
export const deleteOrganisationMember = (organisationId: number, memberId: number) => {
    return del<void>(`organisations/${organisationId}/organisation_members/${memberId}`);
};
