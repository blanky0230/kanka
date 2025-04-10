// Defines a query to fetch all Todo items
import { Effect, Layer, Schema } from "effect";
import {
    CampaignsApiLive,
    CampaingListRequest,
    CampgaignsApiService,
    ClientServicesLive,
    HttpService,
} from "./api/index.js";
import { ConfigFromEnv } from "./config.js";

const HttpServiceLive = Layer.effect(HttpService, Effect.succeed({ fetch: fetch }));

const main = async () => {
    const AppConfigLive = Layer.merge(HttpServiceLive, ConfigFromEnv);
    const ApiLive = CampaignsApiLive.pipe(
        Layer.provideMerge(ClientServicesLive),
        Layer.provide(AppConfigLive)
    );
    const program = Effect.gen(function* () {
        const campaigns = yield* CampgaignsApiService; // =>
        return yield* campaigns.list(
            new CampaingListRequest({
                url: "campaigns",
                params: null,
            })
        );
    });
    const runnable = Effect.provide(program, ApiLive);
    await Effect.runPromise(runnable).catch((x) => console.error(x));
};
main();
