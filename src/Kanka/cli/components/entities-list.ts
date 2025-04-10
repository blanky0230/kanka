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
import {
    EntitiesApiService,
    EntityListByTypeRequest,
    EntityListRequest,
    EntityCreateRequest,
    EntityUpdateRequest,
    EntityDeleteRequest
} from '../../api/entities/entities.js';
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
const displayEntityDetails = (campaign: Campaign, entity: Entity): Effect.Effect<void, unknown, unknown> => {
    return Effect.gen(function* (_): Generator<any, void, any> {
        let exitDetails = false;

        while (!exitDetails) {
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

            const { action } = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: 'Select an action:',
                        choices: [
                            { name: 'Back to Entities List', value: 'back' },
                            { name: 'Edit Entity', value: 'edit' },
                            { name: 'Delete Entity', value: 'delete' }
                        ]
                    }
                ])
            );

            switch (action) {
                case 'back':
                    exitDetails = true;
                    break;
                case 'edit':
                    yield* editEntity(campaign, entity);
                    // Refresh entity data after edit
                    const refreshedEntity = yield* fetchEntityById(campaign, entity.id as number, entity.type);
                    if (refreshedEntity) {
                        Object.assign(entity, refreshedEntity);
                    }
                    break;
                case 'delete':
                    const deleted = yield* deleteEntity(campaign, entity);
                    if (deleted) {
                        exitDetails = true;
                    }
                    break;
            }
        }
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
                    yield* displayEntityDetails(campaign, selection as Entity);
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
                    yield* displayEntityDetails(campaign, selection as Entity);
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
            // Create type selection options
            const entityTypes: Array<{ name: string; value: EntityType | 'all' | 'back' | 'create' }> = [
                { name: 'All Entities', value: 'all' },
                { name: 'Characters', value: 'character' },
                { name: 'Locations', value: 'location' },
                { name: 'Items', value: 'item' },
                { name: 'Families', value: 'family' },
                { name: 'Organizations', value: 'organization' },
                { name: 'Notes', value: 'note' },
                { name: 'Events', value: 'event' },
                { name: 'Create New Entity', value: 'create' },
                { name: 'Back to Campaign Dashboard', value: 'back' }
            ];

            // Present type selection
            const { selection } = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selection',
                        message: 'Select an entity type to browse or create:',
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
            } else if (selection === 'create') {
                yield* Effect.catchAll(
                    selectEntityTypeAndCreate(campaign),
                    (error) => Effect.logInfo(`Error creating entity: ${String(error)}`)
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

/**
 * Helper to fetch a single entity by ID and type
 */
const fetchEntityById = (
    campaign: Campaign,
    entityId: number,
    entityType: string
): Effect.Effect<Entity | null, unknown, unknown> => {
    return Effect.gen(function* (_): Generator<any, Entity | null, any> {
        const entitiesApi = yield* EntitiesApiService;

        try {
            if (!entityId || !campaign.id || typeof campaign.id !== 'number') {
                throw new Error("Campaign ID must be a valid number");
            }

            const request = new EntityListByTypeRequest({
                campaignId: mkEntityId(campaign.id),
                entityType: entityType as EntityType,
                params: null
            });

            const response = yield* entitiesApi.listByType(request);
            const entitiesArray = Array.isArray(response.data) ? response.data : Array.from(response.data || []);

            const entity = entitiesArray.find(e => e.id === entityId);
            return entity || null;
        } catch (error) {
            yield* Effect.logError(`Error fetching entity: ${error}`);
            return null;
        }
    });
};

/**
 * Select entity type for creation
 */
const selectEntityTypeAndCreate = (campaign: Campaign): Effect.Effect<void, unknown, unknown> => {
    return Effect.gen(function* (_) {
        // Clear screen for better UX
        console.clear();
        console.log('='.repeat(50));
        console.log(`CREATE NEW ENTITY - SELECT TYPE`);
        console.log('='.repeat(50));
        console.log('');

        // Create entity type options
        const entityTypes = [
            { name: 'Character', value: 'character' },
            { name: 'Location', value: 'location' },
            { name: 'Item', value: 'item' },
            { name: 'Family', value: 'family' },
            { name: 'Organization', value: 'organization' },
            { name: 'Note', value: 'note' },
            { name: 'Event', value: 'event' },
            { name: 'Back to Menu', value: 'back' }
        ];

        // Get user selection
        const { selection } = yield* Effect.promise(() =>
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selection',
                    message: 'Select entity type to create:',
                    choices: entityTypes
                }
            ])
        );

        if (selection !== 'back') {
            yield* createEntity(campaign, selection as EntityType);
        }
    });
};

/**
 * Create a new entity
 */
const createEntity = (campaign: Campaign, entityType: EntityType): Effect.Effect<void, unknown, unknown> => {
    return Effect.gen(function* (_) {
        const entitiesApi = yield* EntitiesApiService;

        try {
            if (!campaign.id || typeof campaign.id !== 'number') {
                throw new Error("Campaign ID must be a valid number");
            }

            // Get entity details from user
            console.clear();
            console.log('='.repeat(50));
            console.log(`CREATE NEW ${entityType.toUpperCase()}`);
            console.log('='.repeat(50));
            console.log('');

            // Collect entity information
            const entityData = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Entity name:',
                        validate: (input) => input.length > 0 ? true : 'Name is required'
                    },
                    {
                        type: 'editor',
                        name: 'entry',
                        message: 'Entity description (press ctrl+s to save, ESC to cancel):',
                    },
                    {
                        type: 'input',
                        name: 'image',
                        message: 'Image URL (optional):',
                    },
                    {
                        type: 'confirm',
                        name: 'is_private',
                        message: 'Make this entity private?',
                        default: false
                    }
                ])
            );

            // Create request object
            const createRequest = new EntityCreateRequest({
                campaignId: mkEntityId(campaign.id),
                entityType: entityType,
                data: entityData
            });

            // Create entity
            console.log('Creating entity...');
            const result = yield* entitiesApi.create(createRequest);

            console.log('Entity created successfully!');
            console.log(`Name: ${result.data.name}`);
            console.log(`ID: ${result.data.id}`);

            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            yield* Effect.logError(`Error creating entity: ${errorMessage}`);
            console.log(`Error creating entity: ${errorMessage}`);

            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
            );
        }
    });
};

/**
 * Edit an existing entity
 */
const editEntity = (campaign: Campaign, entity: Entity): Effect.Effect<void, unknown, unknown> => {
    return Effect.gen(function* (_) {
        const entitiesApi = yield* EntitiesApiService;

        try {
            if (!campaign.id || typeof campaign.id !== 'number') {
                throw new Error("Campaign ID must be a valid number");
            }

            // Show edit form
            console.clear();
            console.log('='.repeat(50));
            console.log(`EDIT ${entity.type.toUpperCase()}: ${entity.name}`);
            console.log('='.repeat(50));
            console.log('');

            // Collect updated entity information
            const entityData = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Entity name:',
                        default: entity.name,
                        validate: (input) => input.length > 0 ? true : 'Name is required'
                    },
                    {
                        type: 'editor',
                        name: 'entry',
                        message: 'Entity description (press ctrl+s to save, ESC to cancel):',
                        default: entity.entry || ''
                    },
                    {
                        type: 'input',
                        name: 'image',
                        message: 'Image URL (optional):',
                        default: entity.image || ''
                    },
                    {
                        type: 'confirm',
                        name: 'is_private',
                        message: 'Make this entity private?',
                        default: entity.is_private || false
                    }
                ])
            );

            // Create update request
            const updateRequest = new EntityUpdateRequest({
                campaignId: mkEntityId(campaign.id),
                entityType: entity.type as EntityType,
                id: mkEntityId(entity.id as number),
                data: entityData
            });

            // Update entity
            console.log('Updating entity...');
            const result = yield* entitiesApi.update(updateRequest);

            console.log('Entity updated successfully!');
            console.log(`Name: ${result.data.name}`);

            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            yield* Effect.logError(`Error updating entity: ${errorMessage}`);
            console.log(`Error updating entity: ${errorMessage}`);

            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
            );
        }
    });
};

/**
 * Delete an entity
 */
const deleteEntity = (campaign: Campaign, entity: Entity): Effect.Effect<boolean, unknown, unknown> => {
    return Effect.gen(function* (_) {
        const entitiesApi = yield* EntitiesApiService;

        try {
            if (!campaign.id || typeof campaign.id !== 'number') {
                throw new Error("Campaign ID must be a valid number");
            }

            // Confirm deletion
            const { confirm } = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: `Are you sure you want to delete ${entity.name}? This cannot be undone.`,
                        default: false
                    }
                ])
            );

            if (!confirm) {
                return false;
            }

            // Create delete request
            const deleteRequest = new EntityDeleteRequest({
                campaignId: mkEntityId(campaign.id),
                entityType: entity.type as EntityType,
                id: mkEntityId(entity.id as number)
            });

            // Delete entity
            console.log('Deleting entity...');
            yield* entitiesApi.delete(deleteRequest);

            console.log('Entity deleted successfully!');

            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
            );

            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            yield* Effect.logError(`Error deleting entity: ${errorMessage}`);
            console.log(`Error deleting entity: ${errorMessage}`);

            yield* Effect.promise(() =>
                inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue' }])
            );

            return false;
        }
    });
};
