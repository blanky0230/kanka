import { Brand, Schema } from "effect";

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
    from: Schema.optional(Schema.Number),
    last_page: Schema.Number,
    path: Schema.String,
    per_page: Schema.Number,
    to: Schema.optional(Schema.Number),
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
    prev: Schema.NullishOr(Schema.String),
    next: Schema.NullishOr(Schema.String),
});

/**
 * Common paginated response wrapper
 */
export const PaginatedResponseSchema = <T extends Schema.Schema.Any>(dataSchema: T) =>
    Schema.Struct({
        data: Schema.Set<T>(dataSchema),
        links: PaginationLinksSchema,
        meta: PaginationMetaSchema,
        sync: Schema.String,
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

type Int = number & Brand.Brand<"Int">;
const Int = Brand.refined<Int>(
    (n) => Number.isInteger(n),
    (n) => Brand.error(`Expected ${n} to be an integer`)
);
type Positive = number & Brand.Brand<"Positive">;
const Positive = Brand.refined<Positive>(
    (n) => n > 0,
    (n) => Brand.error(`Expected ${n} to be positive (greater than 0)`)
);
const _PositiveNumber = Schema.Positive.pipe(Schema.brand("Positive"));

const PositiveInteger = Brand.all(Int, Positive);
type PositiveInteger = Brand.Brand.FromConstructor<typeof PositiveInteger>;

const UserIdBrand = Brand.nominal<PositiveInteger>();
const UserIdSchema = Schema.Positive.pipe(
    Schema.fromBrand(PositiveInteger),
    Schema.fromBrand(UserIdBrand)
);
const EntityIdBrand = Brand.nominal<PositiveInteger>();
export const EntityIdSchema = Schema.Positive.pipe(
    Schema.fromBrand(PositiveInteger),
    Schema.fromBrand(EntityIdBrand)
);
export const mkEntityId = (incoming: number) => Brand.nominal<EntityId>()(incoming);
export type UserId = typeof UserIdSchema.Type;
export type EntityId = typeof EntityIdSchema.Type;

/**
 * Common entity attributes
 */
const attrFields = {
    id: Schema.NullishOr(Schema.Number),
    created_at: Schema.String,
    created_by: Schema.optional(UserIdSchema),
    updated_at: Schema.String,
    updated_by: Schema.optional(UserIdSchema),
    is_private: Schema.NullishOr(Schema.Boolean),
};
export const EntityAttributesSchema = Schema.Struct({
    ...attrFields,
});
export type EntityAttributes = typeof EntityAttributesSchema.Type;
declare const getAttributes: (id: EntityId) => object;
const _EntityAttributesFromSelf = Schema.declare(
    (input: unknown): input is EntityAttributes => true,
    {
        identifier: "EntityAttributesFromSelf",
    }
);

/**
 * Common entity with name and entry
 */
const EntityName = Schema.String.pipe(Schema.brand("EntityName"));
type EntityNameType = typeof EntityName.Type;
export const mkEntityName = (incoming: string) => Brand.nominal<EntityNameType>()(incoming);
export const NamedEntitySchema = Schema.Struct({
    ...EntityAttributesSchema.fields,
    name: Schema.propertySignature(EntityName).annotations({
        title: "Name of the entity",
        description: "Common descriptor or unique name of the entity",
    }),
    entry: Schema.optional(Schema.String),
    image: Schema.NullishOr(Schema.String),
    image_full: Schema.optional(Schema.String),
    image_thumb: Schema.optional(Schema.String),
    has_custom_image: Schema.NullishOr(Schema.Boolean),
});
export type NamedEntity = typeof NamedEntitySchema.Type;

/**
 * Common entity with tags
 */
export const TaggedEntitySchema = Schema.Struct({
    ...NamedEntitySchema.fields,
    tags: Schema.NullishOr(Schema.Array(Schema.Any)),
});
export type TaggedEntity = typeof TaggedEntitySchema.Type;
