import { Schema } from "effect";

/**
 * Template entity
 */
export interface Template {
    id: number;
    name: string;
    type: string;
    child_id: number;
    tags: number[];
    is_private: boolean;
    is_template: boolean;
    campaign_id: number;
    is_attributes_private: boolean;
    tooltip: string;
    header_image: string | null;
    image_uuid: string | null;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
}

export const TemplateSchema = Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    type: Schema.String,
    child_id: Schema.Number,
    tags: Schema.Array(Schema.Number),
    is_private: Schema.Boolean,
    is_template: Schema.Boolean,
    campaign_id: Schema.Number,
    is_attributes_private: Schema.Boolean,
    tooltip: Schema.String,
    header_image: Schema.Union(...[Schema.String, Schema.Null]),
    image_uuid: Schema.Union(...[Schema.String, Schema.Null]),
    created_at: Schema.String,
    created_by: Schema.Number,
    updated_at: Schema.String,
    updated_by: Schema.Number
});
