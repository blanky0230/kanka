/**
 * campaigns.ts
 * API client for Kanka campaign-related endpoints
 * Created: 2023-01-01
 * Framework principles applied: Context Discovery, Type Safety
 */
import { Context, Effect, Layer, pipe, RequestResolver, Schema } from "effect";
import { ParseError } from "effect/ParseResult";
import { EntityIdSchema, PaginatedResponseSchema } from "../../schemas/common.js";
import { ClientServices } from "../client.js";
import { Campaign, CampaignSchema } from './types.js'

/**
 * Request schema for listing campaigns
 */
export class CampaignListRequest extends Schema.TaggedRequest<CampaignListRequest>()("Campaigns", {
    failure: Schema.String,
    success: PaginatedResponseSchema(CampaignSchema),
    payload: { url: Schema.Literal("campaigns"), params: Schema.NullishOr(Schema.Any) }
}) { }

/**
 * Request schema for retrieving a campaign by ID
 */
export class CampaignById extends Schema.TaggedRequest<CampaignById>()("CampaignById", {
    failure: Schema.String,
    success: Schema.Struct({ data: CampaignSchema }),
    payload: {
        id: EntityIdSchema
    }
}) { }

/**
 * Request schema for campaign mutations (create/update)
 */
export class CampaignMutation extends Schema.TaggedRequest<CampaignMutation>()("CampaignMutation", {
    failure: Schema.String,
    success: Schema.Struct({ data: CampaignSchema }),
    payload: {
        data: Schema.partial(CampaignSchema)
    }
}) { }

/**
 * Campaign list response schema
 */
const CampaignListSchema = PaginatedResponseSchema(CampaignSchema);
type CampaignList = typeof CampaignListSchema.Type;

/**
 * Service interface for Campaign API operations
 */
export class CampaignsApiService extends Context.Tag("CampaignsAPI")<
    CampaignsApiService,
    {
        list: (req: CampaignListRequest) => Effect.Effect<CampaignList, string | ParseError>,
        getById: (req: CampaignById) => Effect.Effect<{ data: Campaign }, string | ParseError>,
        update: (req: CampaignMutation) => Effect.Effect<{ data: Campaign }, string | ParseError>
    }
>() { }

/**
 * Live implementation of the Campaign API service
 */
export const CampaignsApiLive = Layer.effect(
    CampaignsApiService,
    Effect.gen(function* () {
        const client = yield* ClientServices;
        return {
            list: (req: CampaignListRequest) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) => client.get(req.url, req.params))
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("campaigns", "list")
                );
            },
            getById: (req: CampaignById) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) => client.get(`campaigns/${req.id}`, undefined))
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("campaigns", "getById")
                );
            },
            update: (req: CampaignMutation) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) => client.patch(`campaigns/${req.data.id}`, req.data, undefined))
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("campaigns", "update")
                );
            }
        }
    })
)
