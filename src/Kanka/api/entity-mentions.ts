import { KankaEntityMention } from "../schemas/entity-mentions.js";
import { PaginatedResponse } from "../schemas/common.js";
import { get } from "./client.js";

/**
 * Get all mentions of an entity
 */
export const getEntityMentions = (entityId: number, params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<KankaEntityMention>>(`entities/${entityId}/mentions`, queryParams);
};
