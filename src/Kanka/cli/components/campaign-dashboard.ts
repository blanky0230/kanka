/**
 * campaign-dashboard.ts
 * Main dashboard interface for interacting with a selected Kanka campaign
 * Created: 2025-04-10
 * Framework principles applied: STAKEHOLDER_PRIORITY, CONTEXT_DISCOVERY
 */

import { Context, Effect } from 'effect';
import inquirer from 'inquirer';
import { Campaign } from '../../api/campaigns/types.js';
import { CampaignById, CampaignsApiService } from '../../api/campaigns/campaigns.js';
import { displayMembersList } from './members-list.js';

// Placeholder service for entities, members, and settings
// These will be implemented in separate files later
export class DashboardServices extends Context.Tag("DashboardServices")<
    DashboardServices,
    {
        displayEntityMenu: (campaign: Campaign) => Effect.Effect<void, never, never>,
        displayMembersView: (campaign: Campaign) => Effect.Effect<void, never, never>,
        displaySettings: (campaign: Campaign) => Effect.Effect<void, never, never>
    }
>() { }

// Define placeholder implementations
const displayEntityMenu = (campaign: Campaign): Effect.Effect<void, never, never> => {
    return Effect.gen(function* (_) {
        console.log("Entity menu is not yet implemented");
        yield* Effect.promise(() =>
            inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
        );
    });
};

const displayMembersView = (campaign: Campaign): Effect.Effect<void, never, never> => {
    return displayMembersList(campaign);
};

const displaySettings = (campaign: Campaign): Effect.Effect<void, never, never> => {
    return Effect.gen(function* (_) {
        console.log("Settings view is not yet implemented");
        yield* Effect.promise(() =>
            inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
        );
    });
};

// Format campaign details for display
const formatCampaignDetails = (campaign: Campaign): string => {
    const details = [
        `Name: ${campaign.name}`,
        `ID: ${campaign.id}`,
        `Visibility: ${campaign.visibility}`,
        `Description: ${campaign.entry || 'No description'}`,
        `Members: ${campaign.members ? Array.from(campaign.members).length : 0}`,
        `Entity Count: ${campaign.entity_count || 'Unknown'}`,
    ];

    if (campaign.locale) {
        details.push(`Locale: ${campaign.locale}`);
    }

    if (campaign.system) {
        details.push(`System: ${campaign.system}`);
    }

    return details.join('\n');
};

// Display campaign dashboard and handle actions
export const campaignDashboard = (campaign: Campaign): Effect.Effect<void, any, any> => {
    return Effect.gen(function* (_) {
        // Get API service
        const campaignsApi = yield* CampaignsApiService;

        // Attempt to refresh campaign data to ensure we have latest details
        try {
            if (campaign.id && typeof campaign.id === 'number') {
                // Modify request to fetch the campaign with members included
                // Type casting as needed to satisfy the API contract
                const campaignId = campaign.id as any;
                const refreshRequest = new CampaignById({
                    id: campaignId
                });

                // Fetch the campaign data
                const refreshedData = yield* campaignsApi.getById(refreshRequest);
                if (refreshedData.data) {
                    // Create a new campaign object that combines the old members with the new data
                    const updatedCampaign = {
                        ...refreshedData.data
                    };
                    
                    // If the updated campaign doesn't have members but the original did, use the original members
                    if (campaign.members && campaign.members.size > 0 &&
                        (!updatedCampaign.members || updatedCampaign.members.size === 0)) {
                        // Safe way to copy the members - create a new object instead of trying to modify read-only property
                        const campaignWithMembers = {
                            ...updatedCampaign,
                            members: campaign.members
                        };
                        
                        // Replace the campaign reference entirely
                        Object.assign(campaign, campaignWithMembers);
                    } else {
                        // Use the refreshed data as is
                        Object.assign(campaign, updatedCampaign);
                    }
                    
                    yield* Effect.logInfo('Campaign data refreshed');
                }
            }
        } catch (error) {
            yield* Effect.logWarning(`Could not refresh campaign data: ${error}`);
        }

        let exit = false;
        while (!exit) {
            // Clear screen for better UX
            console.clear();

            // Display campaign header
            console.log('='.repeat(50));
            console.log(`CAMPAIGN: ${campaign.name}`);
            console.log('='.repeat(50));
            console.log('');
            console.log(formatCampaignDetails(campaign));
            console.log('');
            console.log('-'.repeat(50));

            // Present options menu
            const { action } = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: 'Select an action:',
                        choices: [
                            { name: 'View/Edit Entities', value: 'entities' },
                            { name: 'View Campaign Members', value: 'members' },
                            { name: 'Campaign Settings', value: 'settings' },
                            { name: 'View Campaign URL', value: 'url' },
                            { name: 'Back to Campaign Selection', value: 'back' },
                            { name: 'Exit', value: 'exit' }
                        ]
                    }
                ])
            );

            // Handle selected action
            switch (action) {
                case 'entities':
                    yield* displayEntityMenu(campaign);
                    break;
                case 'members':
                    yield* displayMembersView(campaign);
                    break;
                case 'settings':
                    yield* displaySettings(campaign);
                    break;
                case 'url':
                    if (campaign.urls?.view) {
                        console.log(`Campaign URL: ${campaign.urls.view}`);
                        yield* Effect.promise(() => inquirer.prompt([{
                            type: 'input',
                            name: 'continue',
                            message: 'Press Enter to continue'
                        }]));
                    } else {
                        console.log('Campaign URL not available');
                        yield* Effect.promise(() => inquirer.prompt([{
                            type: 'input',
                            name: 'continue',
                            message: 'Press Enter to continue'
                        }]));
                    }
                    break;
                case 'back':
                    return;
                case 'exit':
                    exit = true;
                    break;
            }
        }

        yield* Effect.logInfo('Exiting Campaign Dashboard');
    });
};
