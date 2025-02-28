import { Effect, pipe } from "effect";
import { getDashboardWidgets, getDashboardWidget, createDashboardWidget, updateDashboardWidget, deleteDashboardWidget } from "../api/dashboard-widgets.js";
import { DashboardWidgetType } from "../schemas/dashboard-widgets.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all dashboard widgets
 */
export const getAllDashboardWidgetsExample = pipe(
    getDashboardWidgets(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} dashboard widgets`)),
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
 * Example: Get a dashboard widget by ID
 */
export const getDashboardWidgetExample = (widgetId: number) => pipe(
    getDashboardWidget(widgetId),
    Effect.tap((response) => Effect.logInfo(`Dashboard Widget: ${response.data.widget} (ID: ${response.data.id})`)),
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
 * Example: Create a preview dashboard widget for an entity
 */
export const createPreviewWidgetExample = (entityId: number) => pipe(
    createDashboardWidget({
        widget: DashboardWidgetType.Preview,
        entity_id: entityId,
        config: {
            full: "1"
        }
    }),
    Effect.tap((response) => Effect.logInfo(`Created preview widget for entity ${entityId}: ${response.data.id}`)),
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
 * Example: Create a recent entities dashboard widget
 */
export const createRecentWidgetExample = () => pipe(
    createDashboardWidget({
        widget: DashboardWidgetType.Recent,
        config: {
            singular: "0"
        }
    }),
    Effect.tap((response) => Effect.logInfo(`Created recent entities widget: ${response.data.id}`)),
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
 * Example: Create a random entity dashboard widget
 */
export const createRandomWidgetExample = () => pipe(
    createDashboardWidget({
        widget: DashboardWidgetType.Random
    }),
    Effect.tap((response) => Effect.logInfo(`Created random entity widget: ${response.data.id}`)),
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
 * Example: Create a calendar dashboard widget
 */
export const createCalendarWidgetExample = (calendarId: number) => pipe(
    createDashboardWidget({
        widget: DashboardWidgetType.Calendar,
        entity_id: calendarId
    }),
    Effect.tap((response) => Effect.logInfo(`Created calendar widget for calendar ${calendarId}: ${response.data.id}`)),
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
 * Example: Create a header dashboard widget
 */
export const createHeaderWidgetExample = () => pipe(
    createDashboardWidget({
        widget: DashboardWidgetType.Header
    }),
    Effect.tap((response) => Effect.logInfo(`Created header widget: ${response.data.id}`)),
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
 * Example: Create a campaign dashboard widget
 */
export const createCampaignWidgetExample = () => pipe(
    createDashboardWidget({
        widget: DashboardWidgetType.Campaign
    }),
    Effect.tap((response) => Effect.logInfo(`Created campaign widget: ${response.data.id}`)),
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
 * Example: Update a dashboard widget
 */
export const updateDashboardWidgetExample = (widgetId: number, position: number) => pipe(
    updateDashboardWidget(widgetId, {
        position
    }),
    Effect.tap(() => Effect.logInfo(`Updated dashboard widget ${widgetId} position to ${position}`)),
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
 * Example: Delete a dashboard widget
 */
export const deleteDashboardWidgetExample = (widgetId: number) => pipe(
    deleteDashboardWidget(widgetId),
    Effect.tap(() => Effect.logInfo(`Deleted dashboard widget ${widgetId}`)),
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
