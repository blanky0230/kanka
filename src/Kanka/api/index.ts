/**
 * Kanka API Client
 * 
 * This module provides a client for interacting with the Kanka API.
 * It includes functions for making requests to the API, handling errors,
 * and working with the various resources available in the API.
 * 
 * @module Kanka/api
 */

// Re-export all API modules
export * from './client.js';
export * from './createEntityApi.js';
export * from './errorHandlers.js';
export * from './middleware.js';
export * from './pagination.js';
export * from './resources.js';
export * from './validation.js';

// Re-export entity-specific APIs
export * from './abilities.js';
export * from './abilities-factory.js';
export * from './attributes.js';
export * from './bookmarks.js';
export * from './calendars.js';
export * from './campaign-styles.js';
export * from './campaigns.js';
export * from './characters.js';
export * from './characters-factory.js';
export * from './conversations.js';
export * from './creatures.js';
export * from './creatures-factory.js';
export * from './dashboard-widgets.js';
export * from './default-thumbnails.js';
export * from './dice-rolls.js';
export * from './entities.js';
export * from './entity-abilities.js';
export * from './entity-assets.js';
export * from './entity-events.js';
export * from './entity-image.js';
export * from './entity-inventory.js';
export * from './entity-mentions.js';
export * from './entity-permissions.js';
export * from './entity-tags.js';
export * from './events.js';
export * from './events-factory.js';
export * from './families.js';
export * from './families-factory.js';
export * from './images.js';
export * from './inventory.js';
export * from './items.js';
export * from './items-factory.js';
export * from './journals.js';
export * from './journals-factory.js';
export * from './locations.js';
export * from './locations-factory.js';
export * from './map-groups.js';
export * from './map-layers.js';
export * from './map-markers.js';
export * from './maps.js';
export * from './maps-factory.js';
export * from './notes.js';
export * from './notes-factory.js';
export * from './organisation-members.js';
export * from './organisations.js';
export * from './organisations-factory.js';
export * from './permissions-test.js';
export * from './posts.js';
export * from './quests.js';
export * from './quests-factory.js';
export * from './races.js';
export * from './races-factory.js';
export * from './relations.js';
export * from './tags.js';
export * from './tags-factory.js';
export * from './templates.js';
export * from './timelines.js';
export * from './visibilities.js';
