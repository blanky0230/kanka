import { Effect, pipe } from "effect";
import {
    getCampaignStyles,
    getCampaignStyle,
    createCampaignStyle,
    updateCampaignStyle,
    deleteCampaignStyle
} from "../api/campaign-styles.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all campaign styles
 * Note: This is a premium campaign feature. If the campaign isn't premium, this API endpoint will result in a 404.
 */
export const getAllCampaignStylesExample = pipe(
    getCampaignStyles(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} campaign styles`)),
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
 * Example: Get a single campaign style
 */
export const getCampaignStyleExample = (styleId: number) => pipe(
    getCampaignStyle(styleId),
    Effect.tap((response) => Effect.logInfo(`Campaign style: ${response.data.name}`)),
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
 * Example: Create a campaign style
 */
export const createCampaignStyleExample = (name: string, content: string, isEnabled: boolean = true) => pipe(
    createCampaignStyle({
        name,
        content,
        is_enabled: isEnabled
    }),
    Effect.tap((response) => Effect.logInfo(`Created campaign style: ${response.data.name}`)),
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
 * Example: Update a campaign style
 */
export const updateCampaignStyleExample = (styleId: number, params: { name?: string, content?: string, is_enabled?: boolean }) => pipe(
    updateCampaignStyle(styleId, params),
    Effect.tap((response) => Effect.logInfo(`Updated campaign style: ${response.data.name}`)),
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
 * Example: Delete a campaign style
 */
export const deleteCampaignStyleExample = (styleId: number) => pipe(
    deleteCampaignStyle(styleId),
    Effect.tap(() => Effect.logInfo(`Deleted campaign style with ID: ${styleId}`)),
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
