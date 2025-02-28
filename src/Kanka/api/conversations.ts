import {
    KankaConversation,
    KankaConversationParticipant,
    KankaConversationMessage,
    CreateConversationParams,
    UpdateConversationParams,
    CreateConversationParticipantParams,
    UpdateConversationParticipantParams,
    CreateConversationMessageParams,
    UpdateConversationMessageParams,
} from "../schemas/conversations.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all conversations with optional filtering
 */
export const getConversations = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaConversation>>("conversations", queryParams);
};

/**
 * Get a conversation by ID
 */
export const getConversation = (id: number) => {
    return get<SingleResponse<KankaConversation>>(`conversations/${id}`);
};

/**
 * Create a new conversation
 */
export const createConversation = (params: CreateConversationParams) => {
    return post<SingleResponse<KankaConversation>>("conversations", params);
};

/**
 * Update a conversation
 */
export const updateConversation = (id: number, params: UpdateConversationParams) => {
    return put<SingleResponse<KankaConversation>>(`conversations/${id}`, params);
};

/**
 * Delete a conversation
 */
export const deleteConversation = (id: number) => {
    return del<void>(`conversations/${id}`);
};

/**
 * Get all participants of a conversation
 */
export const getConversationParticipants = (conversationId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaConversationParticipant>>(
        `conversations/${conversationId}/conversation_participants`,
        queryParams
    );
};

/**
 * Create a new participant for a conversation
 */
export const createConversationParticipant = (
    conversationId: number,
    params: CreateConversationParticipantParams
) => {
    return post<SingleResponse<KankaConversationParticipant>>(
        `conversations/${conversationId}/conversation_participants`,
        params
    );
};

/**
 * Update a participant in a conversation
 */
export const updateConversationParticipant = (
    conversationId: number,
    participantId: number,
    params: UpdateConversationParticipantParams
) => {
    return put<SingleResponse<KankaConversationParticipant>>(
        `conversations/${conversationId}/conversation_participants/${participantId}`,
        params
    );
};

/**
 * Delete a participant from a conversation
 */
export const deleteConversationParticipant = (
    conversationId: number,
    participantId: number
) => {
    return del<void>(
        `conversations/${conversationId}/conversation_participants/${participantId}`
    );
};

/**
 * Get all messages in a conversation
 */
export const getConversationMessages = (conversationId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaConversationMessage>>(
        `conversations/${conversationId}/conversation_messages`,
        queryParams
    );
};

/**
 * Create a new message in a conversation
 */
export const createConversationMessage = (
    conversationId: number,
    params: CreateConversationMessageParams
) => {
    return post<SingleResponse<KankaConversationMessage>>(
        `conversations/${conversationId}/conversation_messages`,
        params
    );
};

/**
 * Update a message in a conversation
 */
export const updateConversationMessage = (
    conversationId: number,
    messageId: number,
    params: UpdateConversationMessageParams
) => {
    return put<SingleResponse<KankaConversationMessage>>(
        `conversations/${conversationId}/conversation_messages/${messageId}`,
        params
    );
};

/**
 * Delete a message from a conversation
 */
export const deleteConversationMessage = (
    conversationId: number,
    messageId: number
) => {
    return del<void>(
        `conversations/${conversationId}/conversation_messages/${messageId}`
    );
};
