/**
 * entities.ts
 * API client for Kanka entity-related endpoints
 * Created: 2025-04-10
 * Framework principles applied: Context Discovery, Type Safety, STEPWISE_VERIFICATION
 */
import { Context, Effect, Layer, pipe, RequestResolver, Schema } from "effect";
import { ParseError } from "effect/ParseResult";
import { EntityIdSchema, PaginatedResponseSchema } from "../../schemas/common.js";
import { ClientServices } from "../client.js";
import { Entity, EntitySchema, EntityType, EntityTypeSchema } from './types.js';

/**
 * Request schema for listing all entities in a campaign
 */
export class EntityListRequest extends Schema.TaggedRequest<EntityListRequest>()("EntityList", {
    failure: Schema.String,
    success: PaginatedResponseSchema(EntitySchema),
    payload: {
        campaignId: EntityIdSchema,
        params: Schema.NullishOr(Schema.Any)
    }
}) { }

/**
 * Request schema for retrieving an entity by ID
 */
export class EntityById extends Schema.TaggedRequest<EntityById>()("EntityById", {
    failure: Schema.String,
    success: Schema.Struct({ data: EntitySchema }),
    payload: {
        campaignId: EntityIdSchema,
        id: EntityIdSchema
    }
}) { }

/**
 * Request schema for filtering entities by type
 */
export class EntityListByTypeRequest extends Schema.TaggedRequest<EntityListByTypeRequest>()("EntityListByType", {
    failure: Schema.String,
    success: PaginatedResponseSchema(EntitySchema),
    payload: {
        campaignId: EntityIdSchema,
        entityType: EntityTypeSchema,
        params: Schema.NullishOr(Schema.Any)
    }
}) { }

/**
 * Entity list response schema
 */
const EntityListSchema = PaginatedResponseSchema(EntitySchema);
type EntityList = typeof EntityListSchema.Type;

/**
 * Service interface for Entity API operations
 */
export class EntitiesApiService extends Context.Tag("EntitiesAPI")<
    EntitiesApiService,
    {
        list: (req: EntityListRequest) => Effect.Effect<EntityList, string | ParseError>,
        getById: (req: EntityById) => Effect.Effect<{ data: Entity }, string | ParseError>,
        listByType: (req: EntityListByTypeRequest) => Effect.Effect<EntityList, string | ParseError>
    }
>() { }

/**
 * Live implementation of the Entities API service
 */
export const EntitiesApiLive = Layer.effect(
    EntitiesApiService,
    Effect.gen(function* () {
        const client = yield* ClientServices;
        return {
            list: (req: EntityListRequest) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) =>
                        client.get(`campaigns/${req.campaignId}/entities`, req.params)
                    )
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("entities", "list")
                );
            },
            getById: (req: EntityById) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) =>
                        client.get(`campaigns/${req.campaignId}/entities/${req.id}`, undefined)
                    )
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("entities", "getById")
                );
            },
            listByType: (req: EntityListByTypeRequest) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) =>
                        client.get(`campaigns/${req.campaignId}/${req.entityType}s`, req.params)
                    )
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("entities", "listByType")
                );
            }
        }
    })
)
