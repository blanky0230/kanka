import { Schema } from "effect";

/**
 * Image entity
 */
export interface Image {
    id: string;
    name: string;
    is_folder: boolean;
    folder_id: string | null;
    path: string;
    ext: string;
    size: number;
    created_at: string;
    created_by: number;
    updated_at: string;
    focus_x: number | null;
    focus_y: number | null;
}

export const ImageSchema = Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    is_folder: Schema.Boolean,
    folder_id: Schema.Union(...[Schema.String, Schema.Null]),
    path: Schema.String,
    ext: Schema.String,
    size: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Number,
    updated_at: Schema.String,
    focus_x: Schema.Union(...[Schema.Number, Schema.Null]),
    focus_y: Schema.Union(...[Schema.Number, Schema.Null])
});

/**
 * Parameters for creating an image
 */
export interface CreateImageParams {
    /**
     * The image's folder id
     */
    folder_id?: number | undefined;

    /**
     * File to upload
     */
    file: File;

    /**
     * Visibility of the image
     */
    visibility_id?: number | undefined;
}

/**
 * Parameters for updating an image
 */
export interface UpdateImageParams {
    /**
     * The image's folder id
     */
    folder_id?: number | undefined;

    /**
     * The image's name
     */
    name?: string | undefined;
}
