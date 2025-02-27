import { Schema } from "effect";

/**
 * Common pagination metadata
 */
export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export const PaginationMetaSchema = Schema.Struct({
    current_page: Schema.Number,
    from: Schema.Union(...[Schema.Number, Schema.Null]),
    last_page: Schema.Number,
    path: Schema.String,
    per_page: Schema.Number,
    to: Schema.Union(...[Schema.Number, Schema.Null]),
    total: Schema.Number,
});

/**
 * Common pagination links
 */
export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export const PaginationLinksSchema = Schema.Struct({
    first: Schema.String,
    last: Schema.String,
    prev: Schema.Union(...[Schema.String, Schema.Null]),
    next: Schema.Union(...[Schema.String, Schema.Null]),
});

/**
 * Common paginated response wrapper
 */
export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export const PaginatedResponseSchema = <T>(dataSchema: Schema.Schema<T, unknown>) =>
    Schema.Struct({
        data: Schema.Array(dataSchema),
        links: PaginationLinksSchema,
        meta: PaginationMetaSchema,
    });

/**
 * Common single item response wrapper
 */
export interface SingleResponse<T> {
    data: T;
}

export const SingleResponseSchema = <T>(dataSchema: Schema.Schema<T, unknown>) =>
    Schema.Struct({
        data: dataSchema,
    });

/**
 * Common entity attributes
 */
export interface EntityAttributes {
    id: number;
    created_at: string;
    created_by: number | null;
    updated_at: string;
    updated_by: number | null;
    is_private: boolean;
}

export const EntityAttributesSchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
});

/**
 * Common entity with name and entry
 */
export interface NamedEntity extends EntityAttributes {
    name: string;
    entry: string | null;
    image: string | null;
    image_full: string | null;
    image_thumb: string | null;
    has_custom_image: boolean;
}

export const NamedEntitySchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.String,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    image: Schema.Union(...[Schema.String, Schema.Null]),
    image_full: Schema.Union(...[Schema.String, Schema.Null]),
    image_thumb: Schema.Union(...[Schema.String, Schema.Null]),
    has_custom_image: Schema.Boolean,
});

/**
 * Common entity with tags
 */
export interface TaggableEntity extends NamedEntity {
    tags: number[] | null;
}

export const TaggableEntitySchema = Schema.Struct({
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.String,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    image: Schema.Union(...[Schema.String, Schema.Null]),
    image_full: Schema.Union(...[Schema.String, Schema.Null]),
    image_thumb: Schema.Union(...[Schema.String, Schema.Null]),
    has_custom_image: Schema.Boolean,
    tags: Schema.Union(...[Schema.Array(Schema.Number), Schema.Null]),
});

/**
 * Common error response
 */
export interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export const ErrorResponseSchema = Schema.Struct({
    message: Schema.String,
});
