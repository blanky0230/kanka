import { Context, Effect, Either, Layer, pipe, RequestResolver, Schema } from "effect";
import { ParseError } from "effect/ParseResult";
import { EntityIdSchema, PaginatedResponseSchema } from "../../schemas/common.js";
import { ClientServices } from "../client.js";
import {
    CampaignSchema,
} from './types.js'

export class CampaingListRequest extends Schema.TaggedRequest<CampaingListRequest>()("Campaigns", {
    failure: Schema.String,
    success: PaginatedResponseSchema(CampaignSchema),
    payload: { url: Schema.Literal("campaigns"), params: Schema.NullishOr(Schema.Any) }
}) { }

export class CampaignById extends Schema.TaggedRequest<CampaignById>()("CampaignById", {
    failure: Schema.String,
    success: Schema.Struct({ data: CampaignSchema }),
    payload: {
        id: EntityIdSchema
    }
}) { }


export class CampaignMutation extends Schema.TaggedRequest<CampaignMutation>()("CampaignMutation", {
    failure: Schema.String,
    success: Schema.Struct({ data: CampaignSchema }),
    payload: {
        data: Schema.partial(CampaignSchema)
    }
}) { }

const CampaignListSchema = PaginatedResponseSchema(CampaignSchema);
type CampaingList = typeof CampaignListSchema.Type;

export class CampgaignsApiService extends Context.Tag("CampaignsAPI")<
    CampgaignsApiService,
    { list: (req: CampaingListRequest) => Effect.Effect<CampaingList, string | ParseError> }
>() { }

export const CampaignsApiLive = Layer.effect(
    CampgaignsApiService,
    Effect.gen(function* () {
        const client = yield* ClientServices;
        return {
            list: (req: CampaingListRequest) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) => client.get(req.url, req.params))
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("campaigns", "c")
                );
            },
        }
    })
)
