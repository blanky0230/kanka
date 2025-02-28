import { Schema } from "effect";
import { EntityAttributes } from "./common.js";

/**
 * Inventory entity
 */
export interface KankaInventory extends EntityAttributes {
    /**
     * Entity ID the inventory belongs to
     */
    entity_id: number;

    /**
     * Item ID in the inventory
     */
    item_id: number;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id: number;

    /**
     * Amount of the item
     */
    amount: string;

    /**
     * Position of the item in the inventory
     */
    position: string;
}

export const KankaInventorySchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    entity_id: Schema.Number,
    item_id: Schema.Number,
    visibility_id: Schema.Number,
    amount: Schema.String,
    position: Schema.String
});

/**
 * Parameters for creating an inventory item
 */
export interface CreateInventoryParams {
    /**
     * ID of the item
     */
    item_id: number;

    /**
     * The amount of items
     */
    amount?: string;

    /**
     * The position of the item in the inventory
     */
    position?: string;

    /**
     * The inventory's parent entity
     */
    entity_id: number;

    /**
     * The visibility ID: 1 for `all`, 2 `self`, 3 `admin`, 4 `self-admin` or 5 for `members`.
     */
    visibility_id?: number;
}

/**
 * Parameters for updating an inventory item
 */
export interface UpdateInventoryParams extends Partial<CreateInventoryParams> { }
