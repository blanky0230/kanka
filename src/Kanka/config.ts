import { Cause, Context, Effect, Layer } from "effect";
import { Campaign } from "./api/campaigns/types.js";

/**
 * Configuration for the Kanka API client
 */
export interface KankaConfig {
    /**
     * The base URL for the Kanka API
     */
    readonly baseUrl: string;

    /**
     * The API key for authentication
     */
    readonly apiKey: string;
}

/**
 * Context tag for the Kanka API configuration
 */
export class KankaConfigTag extends Context.Tag("KankaConfig")<KankaConfigTag, KankaConfig>() {}

/**
 * Default configuration for the Kanka API
 */
export const DEFAULT_CONFIG: KankaConfig = {
    baseUrl: "https://app.kanka.io/api/1.0",
    apiKey: "",
};

/**
 * Create a configuration layer with the provided config
 */
export const makeConfig = (config: Partial<KankaConfig> = {}) =>
    Layer.succeed(KankaConfigTag, {
        ...DEFAULT_CONFIG,
        ...config,
    });

/**
 * Get the current configuration
 */
export const getConfig = KankaConfigTag.pipe(Effect.map((config) => config));

/**
 * Create a configuration layer from environment variables
 *
 * Uses KANKA_API_KEY, KANKA_BASE_URL, and KANKA_ENABLE_VALIDATION if available
 */
export const ConfigFromEnv = Layer.effect(
    KankaConfigTag,
    Effect.gen(function* (_) {
        // Use environment variables if available
        const apiKey =
            typeof process !== "undefined"
                ? process.env.KANKA_API_KEY || DEFAULT_CONFIG.apiKey
                : DEFAULT_CONFIG.apiKey;

        const baseUrl =
            typeof process !== "undefined"
                ? process.env.KANKA_BASE_URL || DEFAULT_CONFIG.baseUrl
                : DEFAULT_CONFIG.baseUrl;

        if (!apiKey) {
            yield* Effect.logWarning("No KANKA_API_KEY environment variable found");
        }

        return {
            apiKey,
            baseUrl,
        };
    })
);

export const ConfigForCampaign = (campaign: Pick<Campaign, "urls">) =>
    Layer.effect(
        KankaConfigTag,
        Effect.gen(function* () {
            const current = yield* KankaConfigTag;
            if (!current) {
                return yield* Effect.fail({ message: "RootAPI not set" });
            }

            if (!campaign.urls) {
                return yield* Effect.fail({ message: "campaign has not urls?!" });
            }

            return {
                ...current,
                baseUrl: campaign.urls?.api ?? DEFAULT_CONFIG.baseUrl,
            };
        })
    );
