import { Schema } from "effect";
import { EntityAttributes } from "./common.js";

/**
 * Entity Inventory item
 */
export interface KankaEntityInventory extends EntityAttributes {
    /**
     * Entity ID the inventory belongs to
     */
    entity_id: number;

    /**
     * Item ID in the inventory
     */
    item_id: number;

    /**
     * Amount of the item
     */
    amount: number;

    /**
     * Whether the item is equipped
     */
    is_equipped: boolean;

    /**
     * Name of the item (if custom)
     */
    name: string | null;

    /**
     * Position of the item in the inventory
     */
    position: string;

    /**
     * Visibility setting (all, admin, self)
     */
    visibility: string;

    /**
     * Item object
     */
    item: Record<string, unknown>;
}

export const KankaEntityInventorySchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    entity_id: Schema.Number,
    item_id: Schema.Number,
    amount: Schema.Number,
    is_equipped: Schema.Boolean,
    name: Schema.Union(...[Schema.String, Schema.Null]),
    position: Schema.String,
    visibility: Schema.String,
    item: Schema.Object
});

/**
 * Parameters for creating an entity inventory item
 */
export interface CreateEntityInventoryParams {
    /**
     * The inventory's parent entity
     */
    entity_id: number;

    /**
     * The inventory's item id (required without name)
     */
    item_id?: number;

    /**
     * The inventory's item name (required without item_id)
     */
    name?: string;

    /**
     * The amount of times the item is in the inventory
     */
    amount: string;

    /**
     * Where the item is being stored
     */
    position?: string;

    /**
     * Who can view: 'all', 'admin', 'self'
     */
    visibility?: string;

    /**
     * If the item is equipped
     */
    is_equipped?: boolean;
}

/**
 * Parameters for updating an entity inventory item
 */
export interface UpdateEntityInventoryParams extends Partial<CreateEntityInventoryParams> { }
