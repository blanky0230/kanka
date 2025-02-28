import { Schema } from "effect";
import { TaggableEntity, TaggableEntitySchema } from "./common.js";

/**
 * Conversation entity
 */
export interface KankaConversation extends TaggableEntity {
    /**
     * Conversation ID
     */
    id: number;

    /**
     * When the conversation was created
     */
    created_at: string;

    /**
     * User ID who created the conversation
     */
    created_by: number | null;

    /**
     * When the conversation was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the conversation
     */
    updated_by: number | null;

    /**
     * If the conversation is private
     */
    is_private: boolean;

    /**
     * Name of the conversation
     */
    name: string;

    /**
     * Entry of the conversation
     */
    entry: string | null;

    /**
     * Image of the conversation
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
     * If the conversation has a custom image
     */
    has_custom_image: boolean;

    /**
     * Tags associated with the conversation
     */
    tags: number[] | null;

    /**
     * Entity ID of the conversation
     */
    entity_id: number;

    /**
     * If the conversation is closed
     */
    is_closed: boolean;

    /**
     * Type of the conversation (e.g., "In Game")
     */
    type: string;

    /**
     * Target type (e.g., "members")
     */
    target: string;

    /**
     * Target ID
     */
    target_id: number;

    /**
     * Number of participants
     */
    participants: number;

    /**
     * Number of messages
     */
    messages: number;
}

export const KankaConversationSchema = Schema.Struct({
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

    // Conversation-specific fields
    entity_id: Schema.Number,
    is_closed: Schema.Boolean,
    type: Schema.String,
    target: Schema.String,
    target_id: Schema.Number,
    participants: Schema.Number,
    messages: Schema.Number,
});

/**
 * Conversation participant
 */
export interface KankaConversationParticipant {
    /**
     * Conversation ID
     */
    conversation_id: number;

    /**
     * User ID who created the participant
     */
    created_by: number | null;

    /**
     * Character ID of the participant, if any
     */
    character_id: number | null;

    /**
     * User ID of the participant, if any
     */
    user_id: number | null;
}

export const KankaConversationParticipantSchema = Schema.Struct({
    conversation_id: Schema.Number,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    character_id: Schema.Union(...[Schema.Number, Schema.Null]),
    user_id: Schema.Union(...[Schema.Number, Schema.Null]),
});

/**
 * Conversation message
 */
export interface KankaConversationMessage {
    /**
     * Conversation ID
     */
    conversation_id: number;

    /**
     * User ID who created the message
     */
    created_by: number | null;

    /**
     * Character ID of the message sender, if any
     */
    character_id: number | null;

    /**
     * User ID of the message sender, if any
     */
    user_id: number | null;

    /**
     * Message content
     */
    message: string;
}

export const KankaConversationMessageSchema = Schema.Struct({
    conversation_id: Schema.Number,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    character_id: Schema.Union(...[Schema.Number, Schema.Null]),
    user_id: Schema.Union(...[Schema.Number, Schema.Null]),
    message: Schema.String,
});

/**
 * Parameters for creating a conversation
 */
export interface CreateConversationParams {
    /**
     * Name of the conversation
     */
    name: string;

    /**
     * The html description of the conversation
     */
    entry?: string;

    /**
     * Type of conversation
     */
    type?: string;

    /**
     * Target ID
     */
    target_id?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * If the conversation is closed
     */
    is_closed?: boolean;

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;

    /**
     * If the conversation is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a conversation
 */
export interface UpdateConversationParams extends Partial<CreateConversationParams> { }

/**
 * Parameters for creating a conversation participant
 */
export interface CreateConversationParticipantParams {
    /**
     * Conversation ID
     */
    conversation_id: number;

    /**
     * Character ID of the participant, if any
     */
    character_id?: number;

    /**
     * User ID of the participant, if any
     */
    user_id?: number;
}

/**
 * Parameters for updating a conversation participant
 */
export interface UpdateConversationParticipantParams extends Partial<CreateConversationParticipantParams> { }

/**
 * Parameters for creating a conversation message
 */
export interface CreateConversationMessageParams {
    /**
     * Conversation ID
     */
    conversation_id: number;

    /**
     * Character ID of the message sender, if any
     */
    character_id?: number;

    /**
     * User ID of the message sender, if any
     */
    user_id?: number;

    /**
     * Message content
     */
    message: string;
}

/**
 * Parameters for updating a conversation message
 */
export interface UpdateConversationMessageParams extends Partial<CreateConversationMessageParams> { }
