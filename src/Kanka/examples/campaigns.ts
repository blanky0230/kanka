import { Effect, pipe } from "effect";
import { createCampaign, getCampaign, getCampaigns } from "../api/campaigns.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all campaigns
 */
export const getAllCampaignsExample = pipe(
    getCampaigns(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} campaigns ${JSON.stringify(response.data)}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Get a campaign by ID
 */
export const getCampaignExample = (campaign: number) => pipe(
    getCampaign(campaign),
    Effect.tap((response) => Effect.logInfo(`Campaign: ${response.data.name}. ${response.data.settings}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);

/**
 * Example: Create a new campaign
 */
export const createCampaignExample = pipe(
    createCampaign({
        name: "My New Campaign",
        entry: "This is a test campaign created with the Kanka API client",
        locale: "en",
        visibility: "private",
    }),
    Effect.tap((response) => Effect.logInfo(`Created campaign: ${response.data.name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaError) {
            return Effect.logError(`Kanka API Error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(
        configFromEnv
    )
);
