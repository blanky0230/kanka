import { Schema } from "effect";

/**
 * Entity Tag
 */
export interface KankaEntityTag {
    /**
     * Entity Tag ID
     */
    id: number;

    /**
     * The entity ID this tag is attached to
     */
    entity_id: number;

    /**
     * The tag ID
     */
    tag_id: number;
}

export const KankaEntityTagSchema = Schema.Struct({
    id: Schema.Number,
    entity_id: Schema.Number,
    tag_id: Schema.Number
});

/**
 * Parameters for creating an entity tag
 */
export interface CreateEntityTagParams {
    /**
     * The entity ID this tag is attached to
     */
    entity_id: number;

    /**
     * The tag ID
     */
    tag_id: number;
}

/**
 * Parameters for updating an entity tag
 */
export interface UpdateEntityTagParams extends Partial<CreateEntityTagParams> { }
