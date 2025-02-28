import { Schema } from "effect";
import { EntityAttributes } from "./common.js";

/**
 * Entity Ability item
 */
export interface KankaEntityAbility extends EntityAttributes {
    /**
     * Entity ID the ability belongs to
     */
    entity_id: number;

    /**
     * Ability ID
     */
    ability_id: number;

    /**
     * Visibility setting (1 for 'all', 2 for 'self', etc.)
     */
    visibility_id: number;

    /**
     * How many times the ability was used
     */
    charges: number | null;

    /**
     * Position of the ability in the list
     */
    position: number;

    /**
     * Custom note attached to the ability
     */
    note: string | null;
}

export const KankaEntityAbilitySchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    entity_id: Schema.Number,
    ability_id: Schema.Number,
    visibility_id: Schema.Number,
    charges: Schema.Union(...[Schema.Number, Schema.Null]),
    position: Schema.Number,
    note: Schema.Union(...[Schema.String, Schema.Null])
});

/**
 * Parameters for creating an entity ability
 */
export interface CreateEntityAbilityParams {
    /**
     * The ability id
     */
    ability_id: number;

    /**
     * The visibility ID: 1 for 'all', 2 'self', 3 'admin', 4 'self-admin' or 5 'members'
     */
    visibility_id?: number;

    /**
     * How many times the ability was used
     */
    charges?: number;

    /**
     * Custom note attached to the ability
     */
    note?: string;

    /**
     * Position of the ability in the list
     */
    position?: number;
}

/**
 * Parameters for updating an entity ability
 */
export interface UpdateEntityAbilityParams extends Partial<CreateEntityAbilityParams> { }
