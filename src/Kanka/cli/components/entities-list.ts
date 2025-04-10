/**
 * entities-list.ts
 * Component for displaying and interacting with campaign entities
 * Created: 2025-04-10
 * Framework principles applied: STAKEHOLDER_PRIORITY, CONTEXT_DISCOVERY, STEPWISE_VERIFICATION
 */

import { Context, Effect } from 'effect';
import inquirer from 'inquirer';
import { Campaign } from '../../api/campaigns/types.js';
import { Entity, EntityType } from '../../api/entities/types.js';
import { EntitiesApiService, EntityListByTypeRequest, EntityListRequest } from '../../api/entities/entities.js';
import terminalImage from 'terminal-image';
import { mkEntityId } from '../../schemas/common.js';

/**
 * Fetch and render entity image
 */
const fetchAndRenderImage = async (imageUrl: string | null | undefined): Promise<string> => {
    if (!imageUrl) {
        return "No image available";
    }

    try {
        // Fetch the image from the URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        // Get the image as a buffer
        const buffer = await response.arrayBuffer();

        // Render the image in the terminal
        const renderedImage = await terminalImage.buffer(Buffer.from(buffer), {
            width: 800,
            height: 400
        });

        return renderedImage;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error rendering image: ${errorMessage}`);
        return `Image URL: ${imageUrl} (Failed to render image)`;
    }
};

/**
 * Format entity details for display
 */
const formatEntityDetails = (entity: Entity): string => {
    const details = [
        `ID: ${entity.id}`,
        `Name: ${entity.name}`,
        `Type: ${entity.type}`
    ];

    if (entity.entry) {
        // Limit description length for display
        const truncatedEntry = entity.entry.length > 500
            ? entity.entry.substring(0, 500) + '...'
            : entity.entry;
        details.push(`Description: ${truncatedEntry}`);
    } else {
        details.push(`Description: None`);
    }

    // Add image URL for reference even if we'll render it separately
    if (entity.image) {
        details.push(`Image URL: ${entity.image}`);
    } else {
        details.push(`Image: None`);
    }

    // Add created/updated timestamps
    if (entity.created_at) {
        details.push(`Created: ${entity.created_at}`);
    }
    if (entity.updated_at) {
        details.push(`Updated: ${entity.updated_at}`);
    }

    return details.join('\n');
};

/**
 * Display entity details in a modal view
 */
const displayEntityDetails = (entity: Entity): Effect.Effect<void, never, never> => {
    return Effect.gen(function* (_) {
        console.clear();
        console.log('='.repeat(50));
        console.log(`ENTITY DETAILS: ${entity.name}`);
        console.log('='.repeat(50));
        console.log('');
        console.log(formatEntityDetails(entity));
        console.log('');

        // If entity has an image, render it
        if (entity.image) {
            console.log("Loading image...");

            try {
                const renderedImage = yield* Effect.promise(() => fetchAndRenderImage(entity.image));
                console.log(renderedImage);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.log(`Could not render image: ${errorMessage}`);
            }
        }

        console.log('-'.repeat(50));

        yield* Effect.promise(() =>
            inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to return to entities list' }])
        );
    });
};

/**
 * Display entities by type
 */
const displayEntitiesByType = (
    campaign: Campaign,
    entityType: EntityType
): Effect.Effect<void, unknown, unknown> => {
    return Effect.gen(function* (_) {
        const entitiesApi = yield* EntitiesApiService;

        try {
            // Ensure campaign ID is a number for the API request
            if (!campaign.id || typeof campaign.id !== 'number') {
                throw new Error("Campaign ID must be a valid number");
            }

            // Create request for entities by type
            const request = new EntityListByTypeRequest({
                campaignId: mkEntityId(campaign.id),
                entityType: entityType,
                params: null
            });

            // Fetch entities
            const response = yield* entitiesApi.listByType(request);
            const entitiesArray = Array.isArray(response.data) ? response.data : Array.from(response.data || []);

            if (entitiesArray.length === 0) {
                console.log(`No ${entityType}s found in this campaign.`);
                yield* Effect.promise(() =>
                    inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to return to entity types' }])
                );
                return;
            }

            // Sort entities by name
            entitiesArray.sort((a: Entity, b: Entity) => a.name.localeCompare(b.name));

            let exitList = false;
            while (!exitList) {
                // Clear screen for better UX
                console.clear();

                // Display header
                console.log('='.repeat(50));
                console.log(`${entityType.toUpperCase()}S: ${campaign.name}`);
                console.log('='.repeat(50));
                console.log(`Total ${entityType}s: ${entitiesArray.length}`);
                console.log('');

                // Create entity selection options
                const choices = entitiesArray.map((entity: Entity) => ({
                    name: `${entity.name} (ID: ${entity.id})`,
                    value: entity
                }));

                // Add back option
                choices.push({
                    name: 'Back to Entity Types',
                    value: 'back' as unknown as Entity
                });

                // Present entity selection
                const { selection } = yield* Effect.promise(() =>
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'selection',
                            message: `Select a ${entityType} to view details:`,
                            choices,
                            pageSize: 15
                        }
                    ])
                );

                // Handle selection
                if (selection === 'back') {
                    exitList = true;
                } else {
                    // Display details for selected entity
                    yield* displayEntityDetails(selection as Entity);
                }
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            yield* Effect.logError(`Error fetching ${entityType}s: ${errorMessage}`);
            console.log(`Error fetching ${entityType}s: ${errorMessage}`);
            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to return to entity types' }])
            );
        }
    });
};

/**
 * Display all entities without filtering by type
 */
const displayAllEntities = (campaign: Campaign): Effect.Effect<void, unknown, unknown> => {
    return Effect.gen(function* (_) {
        const entitiesApi = yield* EntitiesApiService;

        try {
            // Ensure campaign ID is a number for the API request
            if (!campaign.id || typeof campaign.id !== 'number') {
                throw new Error("Campaign ID must be a valid number");
            }

            // Create request for all entities
            const request = new EntityListRequest({
                campaignId: mkEntityId(campaign.id),
                params: null
            });

            // Fetch entities
            const response = yield* entitiesApi.list(request);
            const entitiesArray = Array.isArray(response.data) ? response.data : Array.from(response.data || []);

            if (entitiesArray.length === 0) {
                console.log('No entities found in this campaign.');
                yield* Effect.promise(() =>
                    inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to return to entity types' }])
                );
                return;
            }

            // Sort entities by name
            entitiesArray.sort((a: Entity, b: Entity) => a.name.localeCompare(b.name));

            let exitList = false;
            while (!exitList) {
                // Clear screen for better UX
                console.clear();

                // Display header
                console.log('='.repeat(50));
                console.log(`ALL ENTITIES: ${campaign.name}`);
                console.log('='.repeat(50));
                console.log(`Total Entities: ${entitiesArray.length}`);
                console.log('');

                // Create entity selection options
                const choices = entitiesArray.map((entity: Entity) => ({
                    name: `${entity.name} (${entity.type}, ID: ${entity.id})`,
                    value: entity
                }));

                // Add back option
                choices.push({
                    name: 'Back to Entity Types',
                    value: 'back' as unknown as Entity
                });

                // Present entity selection
                const { selection } = yield* Effect.promise(() =>
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'selection',
                            message: 'Select an entity to view details:',
                            choices,
                            pageSize: 15
                        }
                    ])
                );

                // Handle selection
                if (selection === 'back') {
                    exitList = true;
                } else {
                    // Display details for selected entity
                    yield* displayEntityDetails(selection as Entity);
                }
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            yield* Effect.logError(`Error fetching entities: ${errorMessage}`);
            console.log(`Error fetching entities: ${errorMessage}`);
            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to return to entity types' }])
            );
        }
    });
};

/**
 * Display entity type selection menu
 */
export const displayEntityMenu = (campaign: Campaign): Effect.Effect<void, any, any> => {
    return Effect.gen(function* (_) {
        let exitMenu = false;
        while (!exitMenu) {
            // Clear screen for better UX
            console.clear();

            // Display header
            console.log('='.repeat(50));
            console.log(`ENTITY TYPES: ${campaign.name}`);
            console.log('='.repeat(50));
            console.log('');

            // Create type selection options
            const entityTypes: Array<{ name: string; value: EntityType | 'all' | 'back' }> = [
                { name: 'All Entities', value: 'all' },
                { name: 'Characters', value: 'character' },
                { name: 'Locations', value: 'location' },
                { name: 'Items', value: 'item' },
                { name: 'Families', value: 'family' },
                { name: 'Organizations', value: 'organization' },
                { name: 'Notes', value: 'note' },
                { name: 'Events', value: 'event' },
                { name: 'Back to Campaign Dashboard', value: 'back' }
            ];

            // Present type selection
            const { selection } = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selection',
                        message: 'Select an entity type to browse:',
                        choices: entityTypes,
                        pageSize: 15
                    }
                ])
            );

            // Handle selection
            if (selection === 'back') {
                exitMenu = true;
            } else if (selection === 'all') {
                yield* Effect.catchAll(
                    displayAllEntities(campaign),
                    (error) => Effect.logInfo(`Error displaying all entities: ${String(error)}`)
                );
            } else {
                yield* Effect.catchAll(
                    displayEntitiesByType(campaign, selection as EntityType),
                    (error) => Effect.logInfo(`Error displaying entities by type: ${String(error)}`)
                );
            }
        }

        yield* Effect.logInfo('Returning to campaign dashboard');
    }).pipe(
        Effect.catchAll(error => {
            console.error(`Error in entity menu: ${error}`);
            return Effect.succeed(undefined);
        })
    );
};
