import { Schema } from "effect";

/**
 * Map Group entity
 */
export interface KankaMapGroup {
    /**
     * Group ID
     */
    id: number;

    /**
     * When the group was created
     */
    created_at: string;

    /**
     * User ID who created the group
     */
    created_by: number | null;

    /**
     * When the group was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the group
     */
    updated_by: number | null;

    /**
     * If the group is private
     */
    is_private: boolean;

    /**
     * Name of the group
     */
    name: string;

    /**
     * The parent map
     */
    map_id: number;

    /**
     * If the group is shown on map load
     */
    is_shown: boolean;

    /**
     * Position in the list of groups
     */
    position: number;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id: number;
}

export const KankaMapGroupSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.String,
    map_id: Schema.Number,
    is_shown: Schema.Boolean,
    position: Schema.Number,
    visibility_id: Schema.Number,
});

/**
 * Parameters for creating a map group
 */
export interface CreateMapGroupParams {
    /**
     * Name of the map group
     */
    name: string;

    /**
     * The parent map
     */
    map_id: number;

    /**
     * If the group is shown on map load
     */
    is_shown?: boolean;

    /**
     * Position in the list of groups
     */
    position?: number;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id?: number;

    /**
     * If the group is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a map group
 */
export interface UpdateMapGroupParams extends Partial<CreateMapGroupParams> { }
