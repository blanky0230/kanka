/**
 * campaign-settings.ts
 * Component for displaying and modifying campaign settings
 * Created: 2025-04-10
 * Framework principles applied: STAKEHOLDER_PRIORITY, CONTEXT_DISCOVERY, STEPWISE_VERIFICATION
 */

import { Context, Effect } from 'effect';
import { ParseError } from 'effect/ParseResult';
import inquirer from 'inquirer';
import { Campaign } from '../../api/campaigns/types.js';
import { CampaignMutation, CampaignsApiService } from '../../api/campaigns/campaigns.js';

/**
 * Format the campaign settings for display
 */
const formatCampaignSettings = (campaign: Campaign): string => {
    const settings = campaign.settings || {};

    const details = [
        `Visibility: ${campaign.visibility}`,
        `System: ${campaign.system || 'Not set'}`,
        `Locale: ${campaign.locale || 'Not set'}`,
        `Theme: ${campaign.theme || 'Default'}`,
        `Custom CSS: ${campaign.css ? 'Enabled' : 'None'}`,
    ];

    // Add settings booleans with friendlier display names
    const settingMappings = [
        { key: 'is_public', display: 'Public Campaign' },
        { key: 'has_public_dashboard', display: 'Public Dashboard' },
        { key: 'entity_notes', display: 'Entity Notes' },
        { key: 'entity_permissions', display: 'Entity Permissions' },
        { key: 'entity_events', display: 'Entity Events' },
        { key: 'entity_files', display: 'Entity Files' },
        { key: 'entity_inventory', display: 'Entity Inventory' },
        { key: 'entity_abilities', display: 'Entity Abilities' },
        { key: 'entity_relations', display: 'Entity Relations' },
        { key: 'entity_assets', display: 'Entity Assets' },
        { key: 'entity_maps', display: 'Entity Maps' },
        { key: 'entity_timelines', display: 'Entity Timelines' },
        { key: 'entity_attributes', display: 'Entity Attributes' },
    ];

    // Add a divider for entity features
    details.push('', 'Entity Features:');

    // Add each setting with its status
    for (const { key, display } of settingMappings) {
        const value = settings[key as keyof typeof settings];
        const status = value === undefined ? 'Unknown' : value ? 'Enabled' : 'Disabled';
        details.push(`${display}: ${status}`);
    }

    return details.join('\n');
};

/**
 * Update campaign settings through the API
 */
const updateCampaignSettings = (campaign: Campaign, updatedSettings: any): Effect.Effect<Campaign, string | ParseError, any> => {
    return Effect.gen(function* (_) {
        const campaignsApi = yield* CampaignsApiService;

        try {
            // Prepare the update request
            const mutationRequest = new CampaignMutation({
                data: {
                    id: campaign.id,
                    settings: updatedSettings
                }
            });

            // Send the update request
            const result = yield* campaignsApi.update(mutationRequest);

            yield* Effect.logInfo(`Campaign settings updated successfully`);

            // Return the updated campaign data
            return result.data;
        } catch (error) {
            yield* Effect.logError(`Failed to update campaign settings: ${error}`);
            throw error instanceof Error ? error.message : String(error);
        }
    });
};

/**
 * Edit campaign general settings
 */
const editGeneralSettings = (campaign: Campaign): Effect.Effect<void, string | ParseError, any> => {
    return Effect.gen(function* (_) {
        const currentSettings = {
            visibility: campaign.visibility,
            system: campaign.system || '',
            locale: campaign.locale || '',
            theme: campaign.theme || '',
        };

        const { visibility, system, locale, theme } = yield* Effect.promise(() =>
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'visibility',
                    message: 'Campaign Visibility:',
                    choices: [
                        { name: 'Public', value: 'public' },
                        { name: 'Private', value: 'private' }
                    ],
                    default: currentSettings.visibility
                },
                {
                    type: 'input',
                    name: 'system',
                    message: 'Game System:',
                    default: currentSettings.system
                },
                {
                    type: 'input',
                    name: 'locale',
                    message: 'Campaign Locale:',
                    default: currentSettings.locale
                },
                {
                    type: 'input',
                    name: 'theme',
                    message: 'Campaign Theme:',
                    default: currentSettings.theme
                }
            ])
        );

        // Only update if something changed
        if (
            visibility !== currentSettings.visibility ||
            system !== currentSettings.system ||
            locale !== currentSettings.locale ||
            theme !== currentSettings.theme
        ) {
            try {
                const updatedCampaign = yield* updateCampaignSettings(campaign, {
                    ...campaign.settings,
                    visibility_id: visibility === 'public' ? 1 : 2
                });

                // Update the campaign object with new values
                // Use Object.assign to update the object instead of modifying individual properties
                Object.assign(campaign, {
                    ...updatedCampaign,
                    visibility,
                    system,
                    locale,
                    theme
                });

                yield* Effect.logInfo('General settings updated successfully');
            } catch (error) {
                yield* Effect.logError(`Failed to update general settings: ${error}`);
            }
        } else {
            yield* Effect.logInfo('No changes made to general settings');
        }
    });
};

/**
 * Edit campaign entity features
 */
const editEntityFeatures = (campaign: Campaign): Effect.Effect<void, string | ParseError, any> => {
    return Effect.gen(function* (_) {
        const settings = campaign.settings || {};

        // Define the entity feature settings with defaults
        const entityFeatures = [
            { name: 'Entity Notes', value: 'entity_notes', default: settings.entity_notes },
            { name: 'Entity Permissions', value: 'entity_permissions', default: settings.entity_permissions },
            { name: 'Entity Events', value: 'entity_events', default: settings.entity_events },
            { name: 'Entity Files', value: 'entity_files', default: settings.entity_files },
            { name: 'Entity Inventory', value: 'entity_inventory', default: settings.entity_inventory },
            { name: 'Entity Abilities', value: 'entity_abilities', default: settings.entity_abilities },
            { name: 'Entity Relations', value: 'entity_relations', default: settings.entity_relations },
            { name: 'Entity Assets', value: 'entity_assets', default: settings.entity_assets },
            { name: 'Entity Maps', value: 'entity_maps', default: settings.entity_maps },
            { name: 'Entity Timelines', value: 'entity_timelines', default: settings.entity_timelines },
            { name: 'Entity Attributes', value: 'entity_attributes', default: settings.entity_attributes }
        ];

        // Create checkbox options
        const choices = entityFeatures.map(feature => ({
            name: feature.name,
            value: feature.value,
            checked: feature.default === true
        }));

        // Prompt user to select entity features
        const { selectedFeatures } = yield* Effect.promise(() =>
            inquirer.prompt([
                {
                    type: 'checkbox',
                    name: 'selectedFeatures',
                    message: 'Select entity features to enable:',
                    choices,
                    pageSize: 15
                }
            ])
        );

        // Create the updated settings object
        const updatedSettings = { ...settings };

        // Update each feature based on selection
        for (const feature of entityFeatures) {
            updatedSettings[feature.value as keyof typeof updatedSettings] =
                selectedFeatures.includes(feature.value);
        }

        try {
            // Only update if settings have changed
            if (JSON.stringify(updatedSettings) !== JSON.stringify(settings)) {
                const updatedCampaign = yield* updateCampaignSettings(campaign, updatedSettings);

                // Update the campaign object with new settings using Object.assign
                const campaignWithUpdatedSettings = {
                    ...campaign,
                    settings: updatedCampaign.settings
                };

                Object.assign(campaign, campaignWithUpdatedSettings);

                yield* Effect.logInfo('Entity features updated successfully');
            } else {
                yield* Effect.logInfo('No changes made to entity features');
            }
        } catch (error) {
            yield* Effect.logError(`Failed to update entity features: ${error}`);
        }
    });
};

/**
 * Edit campaign privacy settings
 */
const editPrivacySettings = (campaign: Campaign): Effect.Effect<void, string | ParseError, any> => {
    return Effect.gen(function* (_) {
        const settings = campaign.settings || {};

        const { isPublic, hasPublicDashboard } = yield* Effect.promise(() =>
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'isPublic',
                    message: 'Make campaign publicly visible?',
                    default: settings.is_public === true
                },
                {
                    type: 'confirm',
                    name: 'hasPublicDashboard',
                    message: 'Enable public dashboard?',
                    default: settings.has_public_dashboard === true
                }
            ])
        );

        // Only update if something changed
        if (
            isPublic !== settings.is_public ||
            hasPublicDashboard !== settings.has_public_dashboard
        ) {
            try {
                const updatedSettings = {
                    ...settings,
                    is_public: isPublic,
                    has_public_dashboard: hasPublicDashboard
                };

                const updatedCampaign = yield* updateCampaignSettings(campaign, updatedSettings);

                // Update the campaign object with new settings
                const campaignWithUpdatedSettings = {
                    ...campaign,
                    settings: updatedCampaign.settings
                };

                Object.assign(campaign, campaignWithUpdatedSettings);

                yield* Effect.logInfo('Privacy settings updated successfully');
            } catch (error) {
                yield* Effect.logError(`Failed to update privacy settings: ${error}`);
            }
        } else {
            yield* Effect.logInfo('No changes made to privacy settings');
        }
    });
};

/**
 * Main function to display campaign settings and handle actions
 * Returns an Effect that never fails, handling all errors internally
 */
export const displayCampaignSettings = (campaign: Campaign): Effect.Effect<void, never, never> => {
    return Effect.gen(function* (_) {
        let exitSettings = false;

        while (!exitSettings) {
            try {
                // Clear screen for better UX
                console.clear();

                // Display settings header
                console.log('='.repeat(50));
                console.log(`CAMPAIGN SETTINGS: ${campaign.name}`);
                console.log('='.repeat(50));
                console.log('');
                console.log(formatCampaignSettings(campaign));
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
                                { name: 'Edit General Settings', value: 'general' },
                                { name: 'Edit Privacy Settings', value: 'privacy' },
                                { name: 'Edit Entity Features', value: 'entity' },
                                { name: 'Back to Campaign Dashboard', value: 'back' }
                            ]
                        }
                    ])
                );

                // Handle selected action
                switch (action) {
                    case 'general':
                        // Use catchAll to handle errors internally
                        yield* Effect.catchAll(
                            editGeneralSettings(campaign),
                            (error) => Effect.sync(() => {
                                console.error(`Error updating general settings: ${error}`);
                                return;
                            })
                        );
                        break;
                    case 'privacy':
                        yield* Effect.catchAll(
                            editPrivacySettings(campaign),
                            (error) => Effect.sync(() => {
                                console.error(`Error updating privacy settings: ${error}`);
                                return;
                            })
                        );
                        break;
                    case 'entity':
                        yield* Effect.catchAll(
                            editEntityFeatures(campaign),
                            (error) => Effect.sync(() => {
                                console.error(`Error updating entity features: ${error}`);
                                return;
                            })
                        );
                        break;
                    case 'back':
                        exitSettings = true;
                        break;
                }
            } catch (error) {
                // Handle any unexpected errors at the top level
                console.error(`Unexpected error in settings view: ${error}`);

                // Allow user to acknowledge error and continue
                yield* Effect.promise(() =>
                    inquirer.prompt([{
                        type: 'input',
                        name: 'continue',
                        message: 'An error occurred. Press Enter to continue'
                    }])
                );
            }
        }

        yield* Effect.logInfo('Returning to campaign dashboard');
        // Use catchAll to ensure no errors escape, then use type assertion
    }).pipe(
        Effect.catchAll(() => Effect.succeed(undefined))
    ) as Effect.Effect<void, never, never>;
};
