import { Template } from "../schemas/templates.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { get, post } from "./client.js";

/**
 * Get all templates
 */
export const getTemplates = (params?: {
    page?: number;
    perPage?: number;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
    };

    return get<PaginatedResponse<Template>>("entities/templates", queryParams);
};

/**
 * Switch template status for an entity
 */
export const switchTemplateStatus = (entityId: number) => {
    return post<SingleResponse<Template>>(`entities/template/${entityId}/switch`, {});
};
