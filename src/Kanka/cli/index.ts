/**
 * index.ts
 * Main entry point for Kanka Terminal UI application
 * Created: 2025-04-10
 * Framework principles applied: STAKEHOLDER_PRIORITY, CONTEXT_DISCOVERY
 */

import { Command } from 'commander';
import { Context, Effect, Layer, pipe } from 'effect';
import { BunContext } from '@effect/platform-bun';
import { ConfigFromEnv } from '../config.js';
import { CampaignsApiLive, CampaignsApiService } from '../api/campaigns/campaigns.js';
import { ClientServices, ClientServicesLive, HttpService } from '../api/client.js';
import { Campaign } from '../api/campaigns/types.js';
import inquirer from 'inquirer';
import { campaignDashboard } from './components/campaign-dashboard.js';
import { selectCampaign } from './components/campaign-selector.js';

// App version
const APP_VERSION = '1.0.0';

// Create CLI program
const command = new Command();

// Configure global options
command
    .name('kanka-cli')
    .description('Terminal UI for interacting with Kanka campaigns')
    .version(APP_VERSION);

// Configure campaigns command
command
    .command('campaigns')
    .description('List and interact with your Kanka campaigns')
    .action(async () => {
        console.log("\n==================================================");
        console.log("  KANKA CLI - Terminal UI for Kanka Campaign Management");
        console.log("==================================================\n");

        // Validate environment variables
        if (!process.env.KANKA_API_KEY) {
            console.error("❌ ERROR: KANKA_API_KEY environment variable is not set");
            console.error("Please set this variable in your .env file or run 'bun run kanka config'");
            process.exit(1);
        }

        try {
            // Following more directly the pattern from the test
            // 1. Create base services
            const httpService = { fetch: globalThis.fetch };

            // 2. Create the layers specific to this app
            const httpLayer = Layer.succeed(HttpService, httpService);
            const configLayer = ConfigFromEnv;

            // 3. Setup the direct dependencies needed for CampaignsApiLive
            const baseLayer = Layer.merge(httpLayer, configLayer);

            // 4. Create a client service layer that depends on the base layer
            const clientLayer = pipe(
                ClientServicesLive,
                Layer.provide(baseLayer)
            );

            // 5. Create the campaign API layer that depends on the client layer
            const campaignsLayer = pipe(
                CampaignsApiLive,
                Layer.provide(clientLayer)
            );

            // 6. Create a program that uses the CampaignsAPI to select campaigns
            const program = async () => {
                try {
                    console.log("🔄 Loading your Kanka campaigns...");

                    // Get the API service using the layers
                    const campaign = await Effect.runPromise(
                        pipe(
                            selectCampaign(),
                            Effect.provide(campaignsLayer)
                        ) as Effect.Effect<Campaign | null, never, never>
                    );

                    if (campaign) {
                        console.log(`📊 Opening dashboard for campaign: ${campaign.name}`);

                        // Now run the dashboard with the same layer
                        await Effect.runPromise(
                            pipe(
                                campaignDashboard(campaign),
                                Effect.provide(campaignsLayer)
                            ) as Effect.Effect<void, never, never>
                        );
                    } else {
                        console.log("No campaign selected or available. Exiting.");
                    }
                } catch (error) {
                    console.error("❌ Error:", error);
                }
            };

            // Run the program
            await program();

        } catch (error) {
            console.error("💥 Fatal error in CLI:", error);
            process.exit(1);
        }
    });

command
    .command('config')
    .description('Configure API settings')
    .action(async () => {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'apiKey',
                message: 'Enter your Kanka API key:',
                validate: (value) => !!value || 'API key is required'
            },
            {
                type: 'input',
                name: 'baseUrl',
                message: 'Enter API base URL (press Enter for default):',
                default: 'https://api.kanka.io/1.0'
            }
        ]);

        console.log('Configuration saved. Add these to your .env file:');
        console.log(`KANKA_API_KEY=${answers.apiKey}`);
        console.log(`KANKA_BASE_URL=${answers.baseUrl}`);
    });

// Parse CLI arguments
export const runCli = () => command.parse(process.argv);

// If this module is being run directly
if (process.argv[1] === import.meta.url) {
    runCli();
}
