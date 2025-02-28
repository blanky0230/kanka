import { Schema } from "effect";

/**
 * Permission test request item
 */
export interface PermissionTestRequest {
    /**
     * The ID number of the user
     */
    user_id: number;

    /**
     * The ID of the entity type, required only when there's no entity_id
     */
    entity_type_id?: number;

    /**
     * The entity's ID, required only when there's no entity_type_id
     */
    entity_id?: number;

    /**
     * ID of the action to test
     * 1: read
     * 2: edit
     * 3: create
     * 4: delete
     */
    action: number;
}

/**
 * Permission test result item
 */
export interface PermissionTestResult {
    /**
     * The ID of the entity type
     */
    entity_type_id: number;

    /**
     * The entity's ID, null when testing entity type permissions
     */
    entity_id: number | null;

    /**
     * The ID number of the user
     */
    user_id: number;

    /**
     * ID of the action tested
     * 1: read
     * 2: edit
     * 3: create
     * 4: delete
     */
    action: number;

    /**
     * Whether the user can perform the action
     * 1 or true: can perform the action
     * 0 or false: cannot perform the action
     */
    can: boolean | number;
}

export const PermissionTestRequestSchema = Schema.Struct({
    user_id: Schema.Number,
    entity_type_id: Schema.optional(Schema.Number),
    entity_id: Schema.optional(Schema.Number),
    action: Schema.Number
});

export const PermissionTestResultSchema = Schema.Struct({
    entity_type_id: Schema.Number,
    entity_id: Schema.Union(Schema.Number, Schema.Null),
    user_id: Schema.Number,
    action: Schema.Number,
    can: Schema.Union(Schema.Boolean, Schema.Number)
});

/**
 * Permission test action types
 */
export enum PermissionTestAction {
    Read = 1,
    Edit = 2,
    Create = 3,
    Delete = 4
}
