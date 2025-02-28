import { Schema } from "effect";

/**
 * Entity Permission
 */
export interface KankaEntityPermission {
    /**
     * Entity Permission ID
     */
    id: number;

    /**
     * The campaign role ID affected by the permission
     * Only required when there's no user ID
     */
    campaign_role_id: number | null;

    /**
     * The user ID affected by the permission
     * Only required when there's no campaign role ID
     */
    user_id: number | null;

    /**
     * The code of the action controlled by the permission
     * 1: Read, 2: Edit, 3: Add, 4: Delete, 5: Posts, 6: Perms
     */
    action: number;

    /**
     * Determines if the permission is allowed or forbidden
     */
    access: boolean;

    /**
     * When the permission was created
     */
    created_at: string;

    /**
     * When the permission was last updated
     */
    updated_at: string;
}

export const KankaEntityPermissionSchema = Schema.Struct({
    id: Schema.Number,
    campaign_role_id: Schema.Union(...[Schema.Number, Schema.Null]),
    user_id: Schema.Union(...[Schema.Number, Schema.Null]),
    action: Schema.Number,
    access: Schema.Boolean,
    created_at: Schema.String,
    updated_at: Schema.String
});

/**
 * Parameters for creating an entity permission
 */
export interface CreateEntityPermissionParams {
    /**
     * The campaign role ID affected by the permission
     * Only required when there's no user ID
     */
    campaign_role_id?: number;

    /**
     * The user ID affected by the permission
     * Only required when there's no campaign role ID
     */
    user_id?: number;

    /**
     * The code of the action controlled by the permission
     * 1: Read, 2: Edit, 3: Add, 4: Delete, 5: Posts, 6: Perms
     */
    action: number;

    /**
     * Determines if the permission is allowed or forbidden
     */
    access: boolean;
}

/**
 * Permission action codes
 */
export enum PermissionAction {
    Read = 1,
    Edit = 2,
    Add = 3,
    Delete = 4,
    Posts = 5,
    Perms = 6
}
