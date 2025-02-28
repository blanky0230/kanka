import { Schema } from "effect";

/**
 * Entity Image response
 */
export interface KankaEntityImageResponse {
    /**
     * Path to the image
     */
    image: string;

    /**
     * Path to the thumbnail
     */
    image_thumb: string;

    /**
     * Path to the full image
     */
    image_full: string;
}

export const KankaEntityImageResponseSchema = Schema.Struct({
    image: Schema.String,
    image_thumb: Schema.String,
    image_full: Schema.String
});
