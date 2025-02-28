import { Schema } from "effect";
import { EntityAttributes } from "./common.js";

/**
 * Dashboard Widget configuration
 */
export interface DashboardWidgetConfig {
    full?: string;
    singular?: string;
    "entity-header"?: string;
}

export const DashboardWidgetConfigSchema = Schema.Struct({
    full: Schema.optional(Schema.String),
    singular: Schema.optional(Schema.String),
    "entity-header": Schema.optional(Schema.String),
});

/**
 * Dashboard Widget types
 */
export enum DashboardWidgetType {
    Preview = "preview",
    Recent = "recent",
    Random = "random",
    Calendar = "calendar",
    Header = "header",
    Campaign = "campaign",
}

/**
 * Dashboard Widget entity
 */
export interface DashboardWidget {
    id: number;
    campaign_id: number;
    entity_id: number | null;
    widget: string;
    config: DashboardWidgetConfig;
    width: number;
    position: number;
    tags: number[];
    created_at: string;
    updated_at: string;
}

export const DashboardWidgetSchema = Schema.Struct({
    id: Schema.Number,
    campaign_id: Schema.Number,
    entity_id: Schema.Union(...[Schema.Number, Schema.Null]),
    widget: Schema.String,
    config: DashboardWidgetConfigSchema,
    width: Schema.Number,
    position: Schema.Number,
    tags: Schema.Array(Schema.Number),
    created_at: Schema.String,
    updated_at: Schema.String,
});

/**
 * Parameters for creating a dashboard widget
 */
export interface CreateDashboardWidgetParams {
    /**
     * The widget type
     */
    widget: DashboardWidgetType | string;

    /**
     * The related entity ID (required for preview and calendar)
     */
    entity_id?: number;

    /**
     * Config of the widget
     */
    config?: DashboardWidgetConfig;

    /**
     * Position of the widget. If empty, placed at end
     */
    position?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Required to save tags
     */
    save_tags?: boolean;
}

/**
 * Parameters for updating a dashboard widget
 */
export interface UpdateDashboardWidgetParams extends Partial<CreateDashboardWidgetParams> { }
