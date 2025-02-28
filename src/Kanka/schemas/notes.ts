import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Note entity
 */
export interface Note extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Note type
     */
    type?: string | null;

    /**
     * Parent note ID
     */
    note_id?: number | null;

    /**
     * Whether the note is pinned
     */
    is_pinned?: number;
}

export const NoteSchema = Schema.Struct({
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

    // Note-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    note_id: Schema.Union(...[Schema.Number, Schema.Null, Schema.Undefined]),
    is_pinned: Schema.Union(...[Schema.Number, Schema.Undefined]),
});

/**
 * Parameters for creating a note
 */
export interface CreateNoteParams {
    /**
     * Name of the note
     */
    name: string;

    /**
     * The html description of the note
     */
    entry?: string;

    /**
     * Type of note
     */
    type?: string;

    /**
     * The parent note id
     */
    note_id?: number;

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
     * If the note is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a note
 */
export interface UpdateNoteParams extends Partial<CreateNoteParams> { }
