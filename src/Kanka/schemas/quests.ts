import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Quest element entity
 */
export interface QuestElement {
    /**
     * Element ID
     */
    id: number;

    /**
     * Entity ID associated with this element
     */
    entity_id: number | null;

    /**
     * Name of the element (if no entity is associated)
     */
    name: string | null;

    /**
     * When the element was created
     */
    created_at: string;

    /**
     * User ID who created the element
     */
    created_by: number | null;

    /**
     * When the element was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the element
     */
    updated_by: number | null;

    /**
     * Instigator entity ID
     */
    instigator_id: number | null;

    /**
     * Location entity ID
     */
    location_id: number | null;

    /**
     * Role of the element in the quest
     */
    role: string;

    /**
     * Description of the element
     */
    description: string;

    /**
     * Parsed description of the element
     */
    description_parsed: string;

    /**
     * Visibility ID
     */
    visibility_id: number;
}

export const QuestElementSchema = Schema.Struct({
    id: Schema.Number,
    entity_id: Schema.Union(...[Schema.Number, Schema.Null]),
    name: Schema.Union(...[Schema.String, Schema.Null]),
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    instigator_id: Schema.Union(...[Schema.Number, Schema.Null]),
    location_id: Schema.Union(...[Schema.Number, Schema.Null]),
    role: Schema.String,
    description: Schema.String,
    description_parsed: Schema.String,
    visibility_id: Schema.Number,
});

/**
 * Quest entity
 */
export interface Quest extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Parent quest ID
     */
    quest_id: number | null;

    /**
     * Quest type
     */
    type: string | null;

    /**
     * Quest date
     */
    date: string | null;

    /**
     * Whether the quest is completed
     */
    is_completed: boolean;

    /**
     * Instigator entity ID
     */
    instigator_id: number | null;

    /**
     * Location entity ID
     */
    location_id: number | null;

    /**
     * Quest elements
     */
    elements: QuestElement[];
}

export const QuestSchema = Schema.Struct({
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

    // Quest-specific fields
    entity_id: Schema.Number,
    quest_id: Schema.Union(...[Schema.Number, Schema.Null]),
    type: Schema.Union(...[Schema.String, Schema.Null]),
    date: Schema.Union(...[Schema.String, Schema.Null]),
    is_completed: Schema.Boolean,
    instigator_id: Schema.Union(...[Schema.Number, Schema.Null]),
    location_id: Schema.Union(...[Schema.Number, Schema.Null]),
    elements: Schema.Array(QuestElementSchema),
});

/**
 * Parameters for creating a quest
 */
export interface CreateQuestParams {
    /**
     * Name of the quest
     */
    name: string;

    /**
     * The html description of the quest
     */
    entry?: string;

    /**
     * Type of quest
     */
    type?: string;

    /**
     * The parent quest
     */
    quest_id?: number;

    /**
     * The quest's instigator (entity)
     */
    instigator_id?: number;

    /**
     * The quest's starting location (location)
     */
    location_id?: number;

    /**
     * Date of the quest
     */
    date?: string;

    /**
     * Whether the quest is completed
     */
    is_completed?: boolean;

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
     * If the quest is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a quest
 */
export interface UpdateQuestParams extends Partial<CreateQuestParams> { }

/**
 * Parameters for creating a quest element
 */
export interface CreateQuestElementParams {
    /**
     * Entity ID associated with this element
     */
    entity_id?: number;

    /**
     * Name of the element (if no entity is associated)
     */
    name?: string;

    /**
     * Instigator entity ID
     */
    instigator_id?: number;

    /**
     * Location entity ID
     */
    location_id?: number;

    /**
     * Role of the element in the quest
     */
    role?: string;

    /**
     * Description of the element
     */
    description?: string;

    /**
     * Visibility ID
     */
    visibility_id?: number;
}

/**
 * Parameters for updating a quest element
 */
export interface UpdateQuestElementParams extends Partial<CreateQuestElementParams> { }
