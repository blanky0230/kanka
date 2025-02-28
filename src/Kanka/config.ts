import { Config, Context, Effect, Layer } from "effect";

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

    /**
     * Whether to enable schema validation (default: true)
     * Set to false in production for better performance
     */
    readonly enableValidation?: boolean;
}

/**
 * Context tag for the Kanka API configuration
 */
export class KankaConfigTag extends Context.Tag("KankaConfig")<KankaConfigTag, KankaConfig>() { }

/**
 * Default configuration for the Kanka API
 */
export const DEFAULT_CONFIG: KankaConfig = {
    baseUrl: "https://app.kanka.io/api/1.0",
    apiKey: "",
    enableValidation: true,
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
export const configFromEnv = Layer.effect(
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

        // Parse enableValidation from environment variable
        let enableValidation = DEFAULT_CONFIG.enableValidation ?? true;
        if (typeof process !== "undefined" && process.env.KANKA_ENABLE_VALIDATION !== undefined) {
            enableValidation = process.env.KANKA_ENABLE_VALIDATION === "true";
        }

        // Disable validation in production by default
        if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
            enableValidation = process.env.KANKA_ENABLE_VALIDATION === "true";
        }

        if (!apiKey) {
            yield* Effect.logWarning("No KANKA_API_KEY environment variable found");
        }

        return {
            apiKey,
            baseUrl,
            enableValidation,
        };
    })
);
