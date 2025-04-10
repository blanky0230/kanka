import { Url, UrlParams } from "@effect/platform";
import { Context, Effect, Layer } from "effect";
import { KankaConfigTag } from "../config.js";
import { IllegalArgumentException } from "effect/Cause";

/**
 * HTTP method types
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ParamsType = Record<string, string | number | boolean | undefined> | undefined;

/**
 * Request options
 */
export interface RequestOptions {
    method: HttpMethod;
    body: unknown | undefined;
    params?: ParamsType
}

export class HttpService extends Context.Tag("HttpService")<
    HttpService,
    { fetch: typeof fetch }
>() { }

export class ClientServices extends Context.Tag("ClientServices")<ClientServices,
    {
        get: (path: string, params: ParamsType) => Effect.Effect<unknown, IllegalArgumentException | Effect.Effect<never, unknown>>,
        del: (path: string, params: ParamsType) => Effect.Effect<unknown, IllegalArgumentException | Effect.Effect<never, unknown>>,
        post: (path: string, body: unknown, params: ParamsType) => Effect.Effect<unknown, IllegalArgumentException | Effect.Effect<never, unknown>>
        put: (path: string, body: unknown, params: ParamsType) => Effect.Effect<unknown, IllegalArgumentException | Effect.Effect<never, unknown>>,
        patch: (path: string, body: unknown, params: ParamsType) => Effect.Effect<unknown, IllegalArgumentException | Effect.Effect<never, unknown>>
    }>() { }

export const ClientServicesLive = Layer.effect(ClientServices, Effect.gen(function* () {
    const http = yield* HttpService
    const config = yield* KankaConfigTag
    const { baseUrl, apiKey } = config;
    const request = (path: string, options: RequestOptions) => Effect.gen(function* (_) { // =>
        const urlBase = yield* Url.fromString(path, baseUrl);
        let url = urlBase;
        if (options.params) {
            url = Url.setUrlParams(urlBase, UrlParams.fromInput(options.params));
        }

        // Build request options
        const requestOptions: RequestInit = {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
        };

        if (options.body) {
            requestOptions.body = JSON.stringify(options.body);
        }
        return yield* Effect.tryPromise({
            try: async () => await (await http.fetch(url, requestOptions)).json(),
            catch: Effect.fail,
        })
    });

    return {
        get: (path: string, params: ParamsType) => request(path, { method: "GET", params, body: undefined }),
        del: (path: string, params: ParamsType) => request(path, { method: "DELETE", params, body: undefined }),
        post: (path: string, body: unknown, params: ParamsType) => request(path, { method: "POST", params, body }),
        put: (path: string, body: unknown, params: ParamsType) => request(path, { method: "PUT", params, body }),
        patch: (path: string, body: unknown, params: ParamsType) => request(path, { method: "PATCH", params, body }),
    };

}))
