import { Effect, pipe } from "effect";
import {
    getConversation,
    getConversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getConversationParticipants,
    createConversationParticipant,
    updateConversationParticipant,
    deleteConversationParticipant,
    getConversationMessages,
    createConversationMessage,
    updateConversationMessage,
    deleteConversationMessage
} from "../api/conversations.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all conversations
 */
export const getAllConversationsExample = pipe(
    getConversations(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} conversations`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Get a conversation by ID
 */
export const getConversationExample = (conversationId: number) => pipe(
    getConversation(conversationId),
    Effect.tap((response) => Effect.logInfo(`Conversation: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a new conversation
 */
export const createConversationExample = pipe(
    createConversation({
        name: "New Conversation",
        entry: "This is a test conversation created with the Kanka API client",
        type: "In Game",
        target_id: 1, // Replace with a real target ID
        is_closed: false,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created conversation: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Update a conversation
 */
export const updateConversationExample = (conversationId: number) => pipe(
    updateConversation(conversationId, {
        name: "Updated Conversation",
        entry: "This is an updated conversation",
        is_closed: true,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated conversation: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Delete a conversation
 */
export const deleteConversationExample = (conversationId: number) => pipe(
    deleteConversation(conversationId),
    Effect.tap(() => Effect.logInfo(`Deleted conversation with ID: ${conversationId}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Get all participants of a conversation
 */
export const getConversationParticipantsExample = (conversationId: number) => pipe(
    getConversationParticipants(conversationId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} conversation participants`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a new participant for a conversation
 */
export const createConversationParticipantExample = (conversationId: number, characterId: number) => pipe(
    createConversationParticipant(conversationId, {
        conversation_id: conversationId,
        character_id: characterId,
    }),
    Effect.tap(() => Effect.logInfo(`Created conversation participant`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Update a participant in a conversation
 */
export const updateConversationParticipantExample = (conversationId: number, participantId: number) => pipe(
    updateConversationParticipant(conversationId, participantId, {
        // Update with valid parameters based on the schema
    }),
    Effect.tap(() => Effect.logInfo(`Updated conversation participant`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Delete a participant from a conversation
 */
export const deleteConversationParticipantExample = (conversationId: number, participantId: number) => pipe(
    deleteConversationParticipant(conversationId, participantId),
    Effect.tap(() => Effect.logInfo(`Deleted conversation participant with ID: ${participantId}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Get all messages in a conversation
 */
export const getConversationMessagesExample = (conversationId: number) => pipe(
    getConversationMessages(conversationId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} conversation messages`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a new message in a conversation
 */
export const createConversationMessageExample = (conversationId: number) => pipe(
    createConversationMessage(conversationId, {
        conversation_id: conversationId,
        message: "Hello, this is a test message!"
    }),
    Effect.tap(() => Effect.logInfo(`Created conversation message`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Update a message in a conversation
 */
export const updateConversationMessageExample = (conversationId: number, messageId: number) => pipe(
    updateConversationMessage(conversationId, messageId, {
        message: "This message has been updated!",
    }),
    Effect.tap(() => Effect.logInfo(`Updated conversation message`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Delete a message from a conversation
 */
export const deleteConversationMessageExample = (conversationId: number, messageId: number) => pipe(
    deleteConversationMessage(conversationId, messageId),
    Effect.tap(() => Effect.logInfo(`Deleted conversation message with ID: ${messageId}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);
