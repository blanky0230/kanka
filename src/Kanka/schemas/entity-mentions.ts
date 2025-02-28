import { Schema } from "effect";

/**
 * Entity Mention
 */
export interface KankaEntityMention {
    /**
     * The current entity ID
     */
    entity_id: number;

    /**
     * The post ID that mentions this entity (null if not a post mention)
     */
    post_id: number | null;

    /**
     * The campaign ID mentioning this entity (null if not a campaign mention)
     */
    campaign_id: number | null;

    /**
     * The entity ID that mentions this entity (null if not an entity mention)
     */
    target_id: number | null;
}

export const KankaEntityMentionSchema = Schema.Struct({
    entity_id: Schema.Number,
    post_id: Schema.Union(...[Schema.Number, Schema.Null]),
    campaign_id: Schema.Union(...[Schema.Number, Schema.Null]),
    target_id: Schema.Union(...[Schema.Number, Schema.Null])
});
