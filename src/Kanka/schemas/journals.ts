import { Schema } from "effect";
import { TaggableEntity, TaggableEntitySchema } from "./common.js";

/**
 * Journal entity
 */
export interface KankaJournal extends TaggableEntity {
    /**
     * Journal ID
     */
    id: number;

    /**
     * When the journal was created
     */
    created_at: string;

    /**
     * User ID who created the journal
     */
    created_by: number | null;

    /**
     * When the journal was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the journal
     */
    updated_by: number | null;

    /**
     * If the journal is private
     */
    is_private: boolean;

    /**
     * Name of the journal
     */
    name: string;

    /**
     * Entry of the journal
     */
    entry: string | null;

    /**
     * Image of the journal
     */
    image: string | null;

    /**
     * Full image URL
     */
    image_full: string | null;

    /**
     * Thumbnail image URL
     */
    image_thumb: string | null;

    /**
     * If the journal has a custom image
     */
    has_custom_image: boolean;

    /**
     * Tags associated with the journal
     */
    tags: number[] | null;

    /**
     * Entity ID of the journal
     */
    entity_id: number;

    /**
     * Parent journal ID, if any
     */
    journal_id: number | null;

    /**
     * Author entity ID
     */
    author_id: number | null;

    /**
     * Date of the journal
     */
    date: string | null;

    /**
     * Type of the journal
     */
    type: string | null;
}

export const KankaJournalSchema = Schema.Struct({
    // Base TaggableEntity fields
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.String,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    image: Schema.Union(...[Schema.String, Schema.Null]),
    image_full: Schema.Union(...[Schema.String, Schema.Null]),
    image_thumb: Schema.Union(...[Schema.String, Schema.Null]),
    has_custom_image: Schema.Boolean,
    tags: Schema.Union(...[Schema.Array(Schema.Number), Schema.Null]),

    // Journal-specific fields
    entity_id: Schema.Number,
    journal_id: Schema.Union(...[Schema.Number, Schema.Null]),
    author_id: Schema.Union(...[Schema.Number, Schema.Null]),
    date: Schema.Union(...[Schema.String, Schema.Null]),
    type: Schema.Union(...[Schema.String, Schema.Null]),
});

/**
 * Parameters for creating a journal
 */
export interface CreateJournalParams {
    /**
     * Name of the journal
     */
    name: string;

    /**
     * The html description of the journal
     */
    entry?: string;

    /**
     * The journal's type
     */
    type?: string;

    /**
     * The date of the session
     */
    date?: string;

    /**
     * The ID of the journal's parent journal, if it has one
     */
    journal_id?: number;

    /**
     * The "author" of the journal (entity id)
     */
    author_id?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;

    /**
     * If the journal is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a journal
 */
export interface UpdateJournalParams extends Partial<CreateJournalParams> { }
