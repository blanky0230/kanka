import { Schema } from "effect";
import { EntityAttributes } from "./common.js";

/**
 * Organisation Member entity
 */
export interface OrganisationMember extends EntityAttributes {
    /**
     * Organisation ID
     */
    organisation_id: number;

    /**
     * Character ID
     */
    character_id: number;

    /**
     * Role of the member in the organisation
     */
    role?: string | null;

    /**
     * Pin ID (0 for none, 1 for pinned to character, 2 for pinned to org, 3 for both)
     */
    pin_id?: number | null;

    /**
     * Status ID (0 for active member, 1 for past, 2 for unknown)
     */
    status_id?: number | null;

    /**
     * Parent organisation member (boss)
     */
    parent_id?: number | null;
}

export const OrganisationMemberSchema = Schema.Struct({
    // Base EntityAttributes fields
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,

    // OrganisationMember-specific fields
    organisation_id: Schema.Number,
    character_id: Schema.Number,
    role: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    pin_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    status_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    parent_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
});

/**
 * Parameters for creating an organisation member
 */
export interface CreateOrganisationMemberParams {
    /**
     * The organisation id
     */
    organisation_id: number;

    /**
     * The character id
     */
    character_id: number;

    /**
     * The member's role
     */
    role?: string;

    /**
     * If the member is only visible to `admin` members of the campaign
     */
    is_private?: boolean;

    /**
     * Pin ID (0 for none, 1 for pinned to character, 2 for pinned to org, 3 for both)
     */
    pin_id?: number;

    /**
     * Status ID (0 for active member, 1 for past, 2 for unknown)
     */
    status_id?: number;

    /**
     * Parent organisation member (boss)
     */
    parent_id?: number;
}

/**
 * Parameters for updating an organisation member
 */
export interface UpdateOrganisationMemberParams extends Partial<CreateOrganisationMemberParams> { }
