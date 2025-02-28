import { Schema } from "effect";

/**
 * Visibility entity
 */
export interface Visibility {
    id: number;
    code: string;
    description: string;
}

export const VisibilitySchema = Schema.Struct({
    id: Schema.Number,
    code: Schema.String,
    description: Schema.String
});

/**
 * Visibility codes
 */
export enum VisibilityCode {
    All = "all",
    Admin = "admin",
    AdminSelf = "admin-self",
    Self = "self",
    Members = "members"
}

/**
 * Visibility IDs
 */
export enum VisibilityId {
    All = 1,
    Admin = 2,
    AdminSelf = 3,
    Self = 4,
    Members = 5
}
