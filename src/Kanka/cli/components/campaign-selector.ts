/**
 * campaign-selector.ts
 * Component for selecting Kanka campaigns from list
 * Created: 2025-04-10
 * Framework principles applied: STAKEHOLDER_PRIORITY, CONTEXT_DISCOVERY, STEPWISE_VERIFICATION
 */

import { Context, Effect, Either } from "effect";
import { ParseError } from "effect/ParseResult";
import inquirer from "inquirer";
import { CampaignListRequest, CampaignsApiService } from "../../api/campaigns/campaigns.js";
import { Campaign } from "../../api/campaigns/types.js";

/**
 * Fetches campaigns from Kanka API
 */
const fetchCampaigns = Effect.gen(function* (_) {
    // Get API service
    const campaignsApi = yield* CampaignsApiService;

    // Log fetching state
    yield* Effect.logInfo("Fetching your Kanka campaigns...");

    // Create request with 'members' included to get campaign membership data
    const request = new CampaignListRequest({
        url: "campaigns",
        params: { include: "members" },
    });

    // Execute request
    const response = yield* campaignsApi.list(request);
    // Ensure we have an array of Campaign objects
    const campaignArray = Array.isArray(response.data)
        ? response.data
        : (Array.from(response.data) as Campaign[]);
    yield* Effect.logInfo(`Found ${campaignArray.length} campaigns`);

    return campaignArray;
});

/**
 * Displays campaigns in a list and allows selection
 */
const displayCampaignSelector = (
    campaigns: Campaign[]
): Effect.Effect<Campaign | null, never, never> => {
    return Effect.async<Campaign | null, never, never>((resume) => {
        // Format campaign options
        const choices = campaigns.map((campaign) => ({
            name: `${campaign.name} (ID: ${campaign.id})`,
            value: campaign,
        }));

        // Add an exit option
        choices.push({
            name: "Exit",
            value: null as unknown as Campaign, // Cast to make TypeScript happy with our choices array
        });

        // Create selection prompt
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "selected",
                    message: "Select a campaign to manage:",
                    choices,
                    pageSize: 15,
                },
            ])
            .then((answers: { selected: Campaign | null }) => {
                if (answers.selected) {
                    Effect.logInfo(`Selected campaign: ${answers.selected.name}`).pipe(
                        Effect.runSync
                    );
                }
                resume(Effect.succeed(answers.selected));
            })
            .catch((error) => {
                Effect.logError(`Error selecting campaign: ${error.message}`).pipe(Effect.runSync);
                resume(Effect.succeed(null));
            });

        // We don't need to return unknownthing here - Effect.async completes via resume
        return;
    });
};

/**
 * Handles no campaigns scenario
 */
const handleNoCampaigns = Effect.gen(function* (_) {
    yield* Effect.logWarning("No campaigns found for your account");

    const { proceed } = yield* Effect.promise(() =>
        inquirer.prompt([
            {
                type: "confirm",
                name: "proceed",
                message: "Would you like to create a new campaign?",
                default: true,
            },
        ])
    );

    if (proceed) {
        yield* Effect.logInfo("Creating new campaign feature coming soon");
        return null;
    } else {
        yield* Effect.logInfo("Exiting campaign selector");
        return null;
    }
});

/**
 * Main campaign selection flow
 */
export const selectCampaign = (): Effect.Effect<Campaign | null, string | ParseError, unknown> => {
    return Effect.gen(function* (_) {
        try {
            // Fetch campaigns
            const campaigns = yield* fetchCampaigns;

            // Check if we have unknown campaigns
            const campaignArray = Array.isArray(campaigns)
                ? (campaigns as Campaign[])
                : (Array.from(campaigns) as Campaign[]);

            if (campaignArray.length === 0) {
                return yield* handleNoCampaigns;
            }

            // Display selector and get selection
            return yield* displayCampaignSelector(campaignArray);
        } catch (error) {
            yield* Effect.logError(`Failed to load campaigns: ${error}`);
            return null;
        }
    });
};
