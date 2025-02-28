import {
    DashboardWidget,
    CreateDashboardWidgetParams,
    UpdateDashboardWidgetParams,
} from "../schemas/dashboard-widgets.js";
import { PaginatedResponse, SingleResponse } from "../schemas/common.js";
import { del, get, post, put } from "./client.js";

/**
 * Get all dashboard widgets with optional filtering
 */
export const getDashboardWidgets = (params?: {
    page?: number;
    perPage?: number;
    lastSync?: string;
}) => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        page: params?.page,
        per_page: params?.perPage,
        lastSync: params?.lastSync,
    };

    return get<PaginatedResponse<DashboardWidget>>("campaign_dashboard_widgets", queryParams);
};

/**
 * Get a dashboard widget by ID
 */
export const getDashboardWidget = (id: number) => {
    return get<SingleResponse<DashboardWidget>>(`campaign_dashboard_widgets/${id}`);
};

/**
 * Create a new dashboard widget
 */
export const createDashboardWidget = (params: CreateDashboardWidgetParams) => {
    return post<SingleResponse<DashboardWidget>>("campaign_dashboard_widgets", params);
};

/**
 * Update a dashboard widget
 */
export const updateDashboardWidget = (id: number, params: UpdateDashboardWidgetParams) => {
    return put<SingleResponse<DashboardWidget>>(`campaign_dashboard_widgets/${id}`, params);
};

/**
 * Delete a dashboard widget
 */
export const deleteDashboardWidget = (id: number) => {
    return del<void>(`campaign_dashboard_widgets/${id}`);
};
