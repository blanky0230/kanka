import { describe, expect, mock, test } from "bun:test";
import { ClientServices, HttpService } from "../client.js";
import { Effect, Layer } from "effect";
import { CampaignsApiLive } from "./campaigns.js";

describe("Campaigns API Factories", () => {
    test("List executes GET Request on ClientServices", () => {
        const MockClientServices = Layer.succeed(ClientServices, {
            get: (path: string, __: unknown) => Effect.succeed(expect(path).toStrictEqual("/campaigns")),
            put: (_: string, __: unknown) => Effect.succeed("ok"),
            post: (_: string, __: unknown) => Effect.succeed("ok"),
            del: (_: string, __: unknown) => Effect.succeed("ok"),
            patch: (_: string, __: unknown) => Effect.succeed("ok"),
        });

        CampaignsApiLive.
    });
});
