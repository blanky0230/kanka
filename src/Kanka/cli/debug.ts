/**
 * debug.ts
 * Debug utility for Kanka CLI troubleshooting
 * Created: 2025-04-10
 * Framework principles applied: CONTEXT_DISCOVERY, STEPWISE_VERIFICATION
 */

import { Effect, Layer } from 'effect';
import { BunContext } from '@effect/platform-bun';
import { ConfigFromEnv } from '../config.js';
import { ClientServicesLive, HttpService } from '../api/client.js';
import { CampaignsApiLive, CampaignsApiService, CampaignListRequest } from '../api/campaigns/campaigns.js';

// Create a simple program to test the CampaignsAPI
const testProgram = Effect.gen(function* (_) {
    console.log("- Accessing CampaignsApiService");
    try {
        const campaignsApi = yield* CampaignsApiService;
        console.log("  ✓ Successfully accessed CampaignsApiService");

        console.log("- Creating a CampaignListRequest");
        const request = new CampaignListRequest({
            url: 'campaigns',
            params: null
        });
        console.log("  ✓ Successfully created request");

        console.log("- Sending list request to API");
        try {
            const response = yield* campaignsApi.list(request);
            const campaignCount = Array.from(response.data).length;
            console.log(`  ✓ Success! Found ${campaignCount} campaigns`);
        } catch (error) {
            console.log(`  ✗ API request failed: ${error}`);
            yield* Effect.logError(`API Error details: ${JSON.stringify(error, null, 2)}`);
        }
    } catch (error) {
        console.log(`  ✗ Failed to access CampaignsApiService: ${error}`);
    }
});

// Main debug function
const debug = async (): Promise<void> => {
    console.log("==== Kanka CLI Debug Utility ====");
    console.log("Step 1: Validating environment");

    try {
        // Verify environment variables
        console.log("Checking environment variables:");
        console.log(`- KANKA_API_KEY: ${process.env.KANKA_API_KEY ? 'Set (length: ' + process.env.KANKA_API_KEY.length + ')' : 'Not set'}`);
        console.log(`- KANKA_BASE_URL: ${process.env.KANKA_BASE_URL || 'Not set (will use default)'}`);

        console.log("\nStep 2: Building service layers");

        // Create the layers one by one
        console.log("- Creating BunContext layer");
        const bunLayer = BunContext.layer;

        console.log("- Creating ConfigFromEnv layer");
        const configLayer = ConfigFromEnv;

        console.log("- Creating HttpService layer");
        const httpLayer = Layer.succeed(HttpService, { fetch: globalThis.fetch });

        console.log("- Creating ClientServicesLive layer");
        const clientLayer = ClientServicesLive;

        console.log("- Creating CampaignsApiLive layer");
        const campaignsLayer = CampaignsApiLive;

        console.log("- Merging all layers");
        const MainLayer = Layer.mergeAll(
            bunLayer,
            configLayer,
            httpLayer,
            clientLayer,
            campaignsLayer
        );

        console.log("\nStep 3: Testing API Service with a simple request");
        console.log("\nStep 4: Running the test program");

        // Run with detailed error logging
        console.log("- Executing test...");

        // Use Effect.runPromise instead of yield syntax
        // @ts-ignore: Ignore TypeScript errors for now to get it working
        Effect.runPromise(testProgram.pipe(Effect.provide(MainLayer)))
            .then(() => {
                console.log("\nStep 5: Analyzing results");
                console.log("✓ Program completed successfully");
                console.log("\n==== Debug Complete ====");
            })
            .catch(error => {
                console.log("\nStep 5: Analyzing results");
                console.log("✗ Program failed with error:");
                console.log(error);
                console.log("\n==== Debug Complete ====");
            });
    } catch (error) {
        console.error("\n❌ FATAL ERROR in debug utility:", error);
    }
};

// Run the debug function
debug().catch(error => {
    console.error("Unhandled error in debug script:", error);
});
