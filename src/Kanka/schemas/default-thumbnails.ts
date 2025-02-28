import { Schema } from "effect";

/**
 * Default Thumbnail entity
 */
export interface DefaultThumbnail {
    entity_type: string;
    url: string;
}

export const DefaultThumbnailSchema = Schema.Struct({
    entity_type: Schema.String,
    url: Schema.String,
});

/**
 * Parameters for creating a default thumbnail
 */
export interface CreateDefaultThumbnailParams {
    /**
     * The entity type id
     */
    entity_type: number;

    /**
     * File uploaded
     */
    default_entity_image?: File;
}

/**
 * Parameters for deleting a default thumbnail
 */
export interface DeleteDefaultThumbnailParams {
    /**
     * The entity type id
     */
    entity_type: number;
}
