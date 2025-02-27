import { Effect, pipe } from "effect";
import { createCampaign, getCampaign, getCampaigns } from "./api/campaigns.js";
import { getEntities, getEntity, getRecentEntities } from "./api/entities.js";
import { configFromEnv, makeConfig } from "./config.js";
import { KankaError } from "./errors.js";

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
    getCampaign(campaign), // Replace with a real campaign ID
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

/**
 * Example: Get all entities
 */
export const getAllEntitiesExample = pipe(
    getEntities(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} entities`)),
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
 * Example: Get entities filtered by type
 */
export const getFilteredEntitiesExample = pipe(
    getEntities({
        types: "character,location",
        page: 1,
        perPage: 10,
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters and locations`)),
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
 * Example: Get a single entity by ID
 */
export const getEntityExample = (entityId: number) => pipe(
    getEntity(entityId),
    Effect.tap((response) => Effect.logInfo(`Entity: ${response.data.name} (${response.data.entity_type})`)),
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
 * Example: Get recently modified entities
 */
export const getRecentEntitiesExample = pipe(
    getRecentEntities(5),
    Effect.tap((response) => Effect.logInfo(`Recent entities: ${response.data.map(e => e.name).join(', ')}`)),
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
 * Run the examples
 */
export const runExamples = async () => {
    // To run an example, uncomment one of the following lines:

    await Effect.runPromise(getAllCampaignsExample);
    await Effect.runPromise(getCampaignExample(273024));
    // await Effect.runPromise(createCampaignExample);

    // Entity examples
    // await Effect.runPromise(getAllEntitiesExample);
    // await Effect.runPromise(getFilteredEntitiesExample);
    // await Effect.runPromise(getEntityExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getRecentEntitiesExample);

    // console.log("Examples are commented out. Uncomment one to run it.");
};

// Note: This would run the examples if this file is executed directly
// but we're not using this in the library
// Uncomment and modify if you want to run examples directly
runExamples();
