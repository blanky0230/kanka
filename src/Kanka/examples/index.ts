import { Effect } from "effect";

// Export all examples
export * from "./abilities.js";
export * from "./abilities-factory.js";
export * from "./creatures-factory.js";
export * from "./races-factory.js";
export * from "./maps-factory.js";
export * from "./tags-factory.js";
export * from "./calendars.js";
export * from "./campaigns.js";
export * from "./characters.js";
export * from "./conversations.js";
export * from "./creatures.js";
export * from "./dice-rolls.js";
export * from "./entities.js";
export * from "./events.js";
export * from "./families.js";
export * from "./families-factory.js";
export * from "./organisations-factory.js";
export * from "./items-factory.js";
export * from "./notes-factory.js";
export * from "./events-factory.js";
export * from "./journals-factory.js";
export * from "./quests-factory.js";
export * from "./items.js";
export * from "./journals.js";
// export * from "./locations.js"; // Removed in favor of factory implementation
export * from "./map-groups.js";
export * from "./map-layers.js";
export * from "./map-markers.js";
export * from "./maps.js";
export * from "./notes.js";
export * from "./organisation-members.js";
export * from "./organisations.js";
export * from "./posts.js";
export * from "./quests.js";
export * from "./races.js";
export * from "./tags.js";
export * from "./timelines.js";
export * from "./entity-events.js";
export * from "./inventory.js";
export * from "./entity-mentions.js";
export * from "./entity-tags.js";
export * from "./entity-permissions.js";
export * from "./relations.js";
export * from "./entity-inventory.js";
export * from "./entity-abilities.js";
export * from "./entity-image.js";
export * from "./entity-assets.js";
export * from "./last-sync.js";
export * from "./bookmarks.js";
export * from "./dashboard-widgets.js";
export * from "./default-thumbnails.js";
export * from "./images.js";
export * from "./templates.js";
export * from "./campaign-styles.js";
export * from "./visibilities.js";
export * from "./permissions-test.js";
export * from "./generic-entity-api.js";
export * from "./characters-factory.js";
export * from "./locations-factory.js";
export * from "./validation-example.js";

// Import all example functions
import { getAllAbilitiesExample, getAbilityExample, createAbilityExample, updateAbilityExample, deleteAbilityExample } from "./abilities.js";
import { getAllAbilitiesFactoryExample, getFilteredAbilitiesExample, getAbilityFactoryExample, createAbilityFactoryExample, updateAbilityFactoryExample, deleteAbilityFactoryExample, runAbilityExamples } from "./abilities-factory.js";
import { getAllCalendarsExample, getCalendarExample, createCalendarExample, advanceCalendarDateExample, getCalendarRemindersExample } from "./calendars.js";
import { getAllCampaignsExample, getCampaignExample, createCampaignExample } from "./campaigns.js";
import { getAllCharactersExample, getCharacterExample, createCharacterExample } from "./characters.js";
import { getAllConversationsExample, getConversationExample, createConversationExample, getConversationParticipantsExample, getConversationMessagesExample } from "./conversations.js";
import { getAllCreaturesExample, getCreatureExample, createCreatureExample, updateCreatureExample, deleteCreatureExample } from "./creatures.js";
import { getAllCreaturesFactoryExample, getFilteredCreaturesExample, getCreatureFactoryExample, createCreatureFactoryExample, updateCreatureFactoryExample, deleteCreatureFactoryExample, runCreatureExamples } from "./creatures-factory.js";
import { getAllRacesFactoryExample, getFilteredRacesExample, getRaceFactoryExample, createRaceFactoryExample, updateRaceFactoryExample, deleteRaceFactoryExample, runRaceExamples } from "./races-factory.js";
import { getAllMapsFactoryExample, getFilteredMapsExample, getMapFactoryExample, createMapFactoryExample, updateMapFactoryExample, deleteMapFactoryExample, runMapExamples } from "./maps-factory.js";
import { getAllTagsFactoryExample, getFilteredTagsExample, getTagFactoryExample, createTagFactoryExample, updateTagFactoryExample, deleteTagFactoryExample, runTagExamples } from "./tags-factory.js";
import { getAllDiceRollsExample, getDiceRollExample, createDiceRollExample, updateDiceRollExample, deleteDiceRollExample } from "./dice-rolls.js";
import { getAllEntitiesExample, getFilteredEntitiesExample, getEntityExample, getRecentEntitiesExample } from "./entities.js";
import { getAllEventsExample, getEventExample, createEventExample } from "./events.js";
import { getAllFamiliesExample, getFamilyExample, createFamilyExample, getFamilyTreeExample, createFamilyTreeExample } from "./families.js";
import { getAllFamiliesFactoryExample, getFilteredFamiliesExample, getFamilyFactoryExample, createFamilyFactoryExample, updateFamilyFactoryExample, deleteFamilyFactoryExample, getFamilyTreeFactoryExample, createFamilyTreeFactoryExample, updateFamilyTreeFactoryExample, deleteFamilyTreeFactoryExample, runFamilyExamples } from "./families-factory.js";
import { getAllOrganisationsFactoryExample, getFilteredOrganisationsExample, getOrganisationFactoryExample, createOrganisationFactoryExample, updateOrganisationFactoryExample, deleteOrganisationFactoryExample, runOrganisationExamples } from "./organisations-factory.js";
import { getAllItemsExample, getItemExample, createItemExample } from "./items.js";
import { getAllItemsFactoryExample, getFilteredItemsExample, getItemFactoryExample, createItemFactoryExample, updateItemFactoryExample, deleteItemFactoryExample, runItemExamples } from "./items-factory.js";
import { getAllNotesFactoryExample, getFilteredNotesExample, getNoteFactoryExample, createNoteFactoryExample, updateNoteFactoryExample, deleteNoteFactoryExample, runNoteExamples } from "./notes-factory.js";
import { getAllEventsFactoryExample, getFilteredEventsExample, getEventFactoryExample, createEventFactoryExample, updateEventFactoryExample, deleteEventFactoryExample, runEventExamples } from "./events-factory.js";
import { getAllJournalsFactoryExample, getFilteredJournalsExample, getJournalFactoryExample, createJournalFactoryExample, updateJournalFactoryExample, deleteJournalFactoryExample, runJournalExamples } from "./journals-factory.js";
import { getAllQuestsFactoryExample, getFilteredQuestsExample, getQuestFactoryExample, createQuestFactoryExample, updateQuestFactoryExample, deleteQuestFactoryExample, getQuestElementsFactoryExample, getQuestElementFactoryExample, createQuestElementFactoryExample, updateQuestElementFactoryExample, deleteQuestElementFactoryExample, runQuestExamples } from "./quests-factory.js";
import { getAllJournalsExample, getJournalExample, createJournalExample, updateJournalExample, deleteJournalExample } from "./journals.js";
// Removed import from locations.js
import { getMapGroupsExample, getMapGroupExample, createMapGroupExample, updateMapGroupExample, deleteMapGroupExample } from "./map-groups.js";
import { getMapLayersExample, getMapLayerExample, createMapLayerExample, updateMapLayerExample, deleteMapLayerExample } from "./map-layers.js";
import { getMapMarkersExample, getMapMarkerExample, createMapMarkerExample, updateMapMarkerExample, deleteMapMarkerExample } from "./map-markers.js";
import { getAllMapsExample, getMapExample, createMapExample, updateMapExample, deleteMapExample } from "./maps.js";
import { getAllNotesExample, getNoteExample, createNoteExample } from "./notes.js";
import { getOrganisationMembersExample, createOrganisationMemberExample } from "./organisation-members.js";
import { getAllOrganisationsExample, getOrganisationExample, createOrganisationExample } from "./organisations.js";
import { getEntityPostsExample, getEntityPostExample, createEntityPostExample, updateEntityPostExample, deleteEntityPostExample, getDeletedPostsExample, recoverPostsExample } from "./posts.js";
import { getAllQuestsExample, getQuestExample, createQuestExample, updateQuestExample, deleteQuestExample, getQuestElementsExample, getQuestElementExample, createQuestElementExample, updateQuestElementExample, deleteQuestElementExample } from "./quests.js";
import { getAllRacesExample, getRaceExample, createRaceExample, updateRaceExample, deleteRaceExample } from "./races.js";
import { getAllTagsExample, getTagExample, createTagExample, updateTagExample, deleteTagExample } from "./tags.js";
import { getAllTimelinesExample, getTimelineExample, createTimelineExample, getTimelineErasExample, getTimelineEraExample, createTimelineEraExample, updateTimelineEraExample, deleteTimelineEraExample, getTimelineElementsExample, getTimelineElementExample, createTimelineElementExample, updateTimelineElementExample, deleteTimelineElementExample } from "./timelines.js";
import { getEntityAttributesExample, getEntityAttributeExample, createEntityAttributeExample, updateEntityAttributeExample, deleteEntityAttributeExample } from "./attributes.js";
import { getEntityEventsExample, getEntityEventExample, createEntityEventExample, updateEntityEventExample, deleteEntityEventExample } from "./entity-events.js";
import { getInventoriesExample, getInventoryExample, createInventoryExample, updateInventoryExample, deleteInventoryExample } from "./inventory.js";
import { getEntityMentionsExample } from "./entity-mentions.js";
import { getEntityTagsExample, getEntityTagExample, createEntityTagExample, updateEntityTagExample, deleteEntityTagExample } from "./entity-tags.js";
import { getEntityPermissionsExample, createEntityPermissionForRoleExample, createEntityPermissionForUserExample } from "./entity-permissions.js";
import { getEntityRelationsExample, getEntityRelationExample, createEntityRelationExample, createTwoWayRelationExample, updateEntityRelationExample, deleteEntityRelationExample, getCampaignRelationsExample } from "./relations.js";
import { getEntityInventoriesExample, getEntityInventoryExample, createEntityInventoryExample, createEntityInventoryWithNameExample, updateEntityInventoryExample, deleteEntityInventoryExample } from "./entity-inventory.js";
import { getEntityAbilitiesExample, getEntityAbilityExample, createEntityAbilityExample, updateEntityAbilityExample, deleteEntityAbilityExample } from "./entity-abilities.js";
import { uploadEntityImageExample, removeEntityImageExample } from "./entity-image.js";
import { getEntityAssetsExample, getEntityAssetExample, createEntityLinkAssetExample, createEntityAliasAssetExample, deleteEntityAssetExample } from "./entity-assets.js";
import { getCharactersWithLastSyncExample, getItemsWithLastSyncExample, syncWorkflowExample } from "./last-sync.js";
import { getAllBookmarksExample, getBookmarkExample, createEntityBookmarkExample, createRandomEntityBookmarkExample, updateBookmarkExample, deleteBookmarkExample } from "./bookmarks.js";
import { getAllDashboardWidgetsExample, getDashboardWidgetExample, createPreviewWidgetExample, createRecentWidgetExample, createRandomWidgetExample, createCalendarWidgetExample, createHeaderWidgetExample, createCampaignWidgetExample, updateDashboardWidgetExample, deleteDashboardWidgetExample } from "./dashboard-widgets.js";
import { getAllDefaultThumbnailsExample, createDefaultThumbnailExample, deleteDefaultThumbnailExample } from "./default-thumbnails.js";
import { getAllImagesExample, getImageExample, createImageExample, updateImageExample, deleteImageExample } from "./images.js";
import { getAllTemplatesExample, switchTemplateStatusExample } from "./templates.js";
import { getAllCampaignStylesExample, getCampaignStyleExample, createCampaignStyleExample, updateCampaignStyleExample, deleteCampaignStyleExample } from "./campaign-styles.js";
import { getVisibilitiesExample } from "./visibilities.js";
import { testPermissionsExample } from "./permissions-test.js";
import { characterApiExample, locationApiExample, customQueryParamExample } from "./generic-entity-api.js";
import { getAllCharactersFactoryExample, getFilteredCharactersExample, getCharacterFactoryExample, createCharacterFactoryExample, updateCharacterFactoryExample, deleteCharacterFactoryExample, runCharacterExamples } from "./characters-factory.js";
import { getAllLocationsExample, getFilteredLocationsExample, getLocationExample, createLocationExample, updateLocationExample, deleteLocationExample, runLocationExamples } from "./locations-factory.js";

/**
 * Run the examples
 */
export const runExamples = async () => {
    // To run an example, uncomment one of the following lines:

    // Campaign examples
    await Effect.runPromise(getAllCampaignsExample);
    await Effect.runPromise(getCampaignExample(273024));
    // await Effect.runPromise(createCampaignExample);

    // Entity examples
    // await Effect.runPromise(getAllEntitiesExample);
    // await Effect.runPromise(getFilteredEntitiesExample);
    // await Effect.runPromise(getEntityExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getRecentEntitiesExample);

    // Character examples
    // await Effect.runPromise(getAllCharactersExample);
    // await Effect.runPromise(getCharacterExample(123)); // Replace with a real character ID
    // await Effect.runPromise(createCharacterExample);

    // Location examples
    // await Effect.runPromise(getAllLocationsExample);
    // await Effect.runPromise(getLocationExample(123)); // Replace with a real location ID
    // await Effect.runPromise(createLocationExample);

    // Family examples
    // await Effect.runPromise(getAllFamiliesExample);
    // await Effect.runPromise(getFamilyExample(123)); // Replace with a real family ID
    // await Effect.runPromise(createFamilyExample);
    // await Effect.runPromise(getFamilyTreeExample(123)); // Replace with a real family ID
    // await Effect.runPromise(createFamilyTreeExample(123)); // Replace with a real family ID

    // Organisation examples
    // await Effect.runPromise(getAllOrganisationsExample);
    // await Effect.runPromise(getOrganisationExample(123)); // Replace with a real organisation ID
    // await Effect.runPromise(createOrganisationExample);

    // Organisation Member examples
    // await Effect.runPromise(getOrganisationMembersExample(123)); // Replace with a real organisation ID
    // await Effect.runPromise(createOrganisationMemberExample(123, 456)); // Replace with real organisation and character IDs

    // Item examples
    // await Effect.runPromise(getAllItemsExample);
    // await Effect.runPromise(getItemExample(123)); // Replace with a real item ID
    // await Effect.runPromise(createItemExample);

    // Note examples
    // await Effect.runPromise(getAllNotesExample);
    // await Effect.runPromise(getNoteExample(123)); // Replace with a real note ID
    // await Effect.runPromise(createNoteExample);

    // Event examples
    // await Effect.runPromise(getAllEventsExample);
    // await Effect.runPromise(getEventExample(123)); // Replace with a real event ID
    // await Effect.runPromise(createEventExample);

    // Calendar examples
    // await Effect.runPromise(getAllCalendarsExample);
    // await Effect.runPromise(getCalendarExample(123)); // Replace with a real calendar ID
    // await Effect.runPromise(createCalendarExample);
    // await Effect.runPromise(advanceCalendarDateExample(123)); // Replace with a real calendar ID
    // await Effect.runPromise(getCalendarRemindersExample(123)); // Replace with a real calendar ID

    // Timeline examples
    // await Effect.runPromise(getAllTimelinesExample);
    // await Effect.runPromise(getTimelineExample(123)); // Replace with a real timeline ID
    // await Effect.runPromise(createTimelineExample);

    // Timeline Era examples
    // await Effect.runPromise(getTimelineErasExample(123)); // Replace with a real timeline ID
    // await Effect.runPromise(getTimelineEraExample(123, 456)); // Replace with real timeline and era IDs
    // await Effect.runPromise(createTimelineEraExample(123)); // Replace with a real timeline ID
    // await Effect.runPromise(updateTimelineEraExample(123, 456)); // Replace with real timeline and era IDs
    // await Effect.runPromise(deleteTimelineEraExample(123, 456)); // Replace with real timeline and era IDs

    // Timeline Element examples
    // await Effect.runPromise(getTimelineElementsExample(123)); // Replace with a real timeline ID
    // await Effect.runPromise(getTimelineElementExample(123, 456)); // Replace with real timeline and element IDs
    // await Effect.runPromise(createTimelineElementExample(123, 456)); // Replace with real timeline and era IDs
    // await Effect.runPromise(updateTimelineElementExample(123, 456)); // Replace with real timeline and element IDs
    // await Effect.runPromise(deleteTimelineElementExample(123, 456)); // Replace with real timeline and element IDs

    // Creature examples
    // await Effect.runPromise(getAllCreaturesExample);
    // await Effect.runPromise(getCreatureExample(123)); // Replace with a real creature ID
    // await Effect.runPromise(createCreatureExample);
    // await Effect.runPromise(updateCreatureExample(123)); // Replace with a real creature ID
    // await Effect.runPromise(deleteCreatureExample(123)); // Replace with a real creature ID

    // Race examples
    // await Effect.runPromise(getAllRacesExample);
    // await Effect.runPromise(getRaceExample(123)); // Replace with a real race ID
    // await Effect.runPromise(createRaceExample);
    // await Effect.runPromise(updateRaceExample(123)); // Replace with a real race ID
    // await Effect.runPromise(deleteRaceExample(123)); // Replace with a real race ID

    // Quest examples
    // await Effect.runPromise(getAllQuestsExample);
    // await Effect.runPromise(getQuestExample(123)); // Replace with a real quest ID
    // await Effect.runPromise(createQuestExample);
    // await Effect.runPromise(updateQuestExample(123)); // Replace with a real quest ID
    // await Effect.runPromise(deleteQuestExample(123)); // Replace with a real quest ID
    // await Effect.runPromise(getQuestElementsExample(123)); // Replace with a real quest ID
    // await Effect.runPromise(getQuestElementExample(123, 456)); // Replace with real quest and element IDs
    // await Effect.runPromise(createQuestElementExample(123)); // Replace with a real quest ID
    // await Effect.runPromise(updateQuestElementExample(123, 456)); // Replace with real quest and element IDs
    // await Effect.runPromise(deleteQuestElementExample(123, 456)); // Replace with real quest and element IDs

    // Map examples
    // await Effect.runPromise(getAllMapsExample);
    // await Effect.runPromise(getMapExample(123)); // Replace with a real map ID
    // await Effect.runPromise(createMapExample);
    // await Effect.runPromise(updateMapExample(123)); // Replace with a real map ID
    // await Effect.runPromise(deleteMapExample(123)); // Replace with a real map ID

    // Map Marker examples
    // await Effect.runPromise(getMapMarkersExample(123)); // Replace with a real map ID
    // await Effect.runPromise(getMapMarkerExample(123, 456)); // Replace with real map and marker IDs
    // await Effect.runPromise(createMapMarkerExample(123)); // Replace with a real map ID
    // await Effect.runPromise(updateMapMarkerExample(123, 456)); // Replace with real map and marker IDs
    // await Effect.runPromise(deleteMapMarkerExample(123, 456)); // Replace with real map and marker IDs

    // Map Group examples
    // await Effect.runPromise(getMapGroupsExample(123)); // Replace with a real map ID
    // await Effect.runPromise(getMapGroupExample(123, 456)); // Replace with real map and group IDs
    // await Effect.runPromise(createMapGroupExample(123)); // Replace with a real map ID
    // await Effect.runPromise(updateMapGroupExample(123, 456)); // Replace with real map and group IDs
    // await Effect.runPromise(deleteMapGroupExample(123, 456)); // Replace with real map and group IDs

    // Map Layer examples
    // await Effect.runPromise(getMapLayersExample(123)); // Replace with a real map ID
    // await Effect.runPromise(getMapLayerExample(123, 456)); // Replace with real map and layer IDs
    // await Effect.runPromise(createMapLayerExample(123)); // Replace with a real map ID
    // await Effect.runPromise(updateMapLayerExample(123, 456)); // Replace with real map and layer IDs
    // await Effect.runPromise(deleteMapLayerExample(123, 456)); // Replace with real map and layer IDs

    // Journal examples
    // await Effect.runPromise(getAllJournalsExample);
    // await Effect.runPromise(getJournalExample(123)); // Replace with a real journal ID
    // await Effect.runPromise(createJournalExample);
    // await Effect.runPromise(updateJournalExample(123)); // Replace with a real journal ID
    // await Effect.runPromise(deleteJournalExample(123)); // Replace with a real journal ID

    // Ability examples
    // await Effect.runPromise(getAllAbilitiesExample);
    // await Effect.runPromise(getAbilityExample(123)); // Replace with a real ability ID
    // await Effect.runPromise(createAbilityExample);
    // await Effect.runPromise(updateAbilityExample(123)); // Replace with a real ability ID
    // await Effect.runPromise(deleteAbilityExample(123)); // Replace with a real ability ID

    // Tag examples
    // await Effect.runPromise(getAllTagsExample);
    // await Effect.runPromise(getTagExample(123)); // Replace with a real tag ID
    // await Effect.runPromise(createTagExample);
    // await Effect.runPromise(updateTagExample(123)); // Replace with a real tag ID
    // await Effect.runPromise(deleteTagExample(123)); // Replace with a real tag ID

    // Dice Roll examples
    // await Effect.runPromise(getAllDiceRollsExample);
    // await Effect.runPromise(getDiceRollExample(123)); // Replace with a real dice roll ID
    // await Effect.runPromise(createDiceRollExample);
    // await Effect.runPromise(updateDiceRollExample(123)); // Replace with a real dice roll ID
    // await Effect.runPromise(deleteDiceRollExample(123)); // Replace with a real dice roll ID

    // Post examples
    // await Effect.runPromise(getEntityPostsExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityPostExample(123, 456)); // Replace with real entity and post IDs
    // await Effect.runPromise(createEntityPostExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(updateEntityPostExample(123, 456)); // Replace with real entity and post IDs
    // await Effect.runPromise(deleteEntityPostExample(123, 456)); // Replace with real entity and post IDs
    // await Effect.runPromise(getDeletedPostsExample);
    // await Effect.runPromise(recoverPostsExample([123, 456])); // Replace with real post IDs

    // Attribute examples
    // await Effect.runPromise(getEntityAttributesExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityAttributeExample(123, 456)); // Replace with real entity and attribute IDs
    // await Effect.runPromise(createEntityAttributeExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(updateEntityAttributeExample(123, 456)); // Replace with real entity and attribute IDs
    // await Effect.runPromise(deleteEntityAttributeExample(123, 456)); // Replace with real entity and attribute IDs

    // Entity Event examples
    // await Effect.runPromise(getEntityEventsExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityEventExample(123, 456)); // Replace with real entity and event IDs
    // await Effect.runPromise(createEntityEventExample(123, 789)); // Replace with real entity and calendar IDs
    // await Effect.runPromise(updateEntityEventExample(123, 456)); // Replace with real entity and event IDs
    // await Effect.runPromise(deleteEntityEventExample(123, 456)); // Replace with real entity and event IDs

    // Inventory examples
    // await Effect.runPromise(getInventoriesExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getInventoryExample(123, 456)); // Replace with real entity and inventory IDs
    // await Effect.runPromise(createInventoryExample(123, 789)); // Replace with real entity and item IDs
    // await Effect.runPromise(updateInventoryExample(123, 456)); // Replace with real entity and inventory IDs
    // await Effect.runPromise(deleteInventoryExample(123, 456)); // Replace with real entity and inventory IDs

    // Entity Mentions examples
    // await Effect.runPromise(getEntityMentionsExample(123)); // Replace with a real entity ID

    // Entity Tags examples
    // await Effect.runPromise(getEntityTagsExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityTagExample(123, 456)); // Replace with real entity and entity tag IDs
    // await Effect.runPromise(createEntityTagExample(123, 456)); // Replace with real entity and tag IDs
    // await Effect.runPromise(updateEntityTagExample(123, 456, 789)); // Replace with real entity, entity tag, and tag IDs
    // await Effect.runPromise(deleteEntityTagExample(123, 456)); // Replace with real entity and entity tag IDs

    // Entity Permissions examples
    // await Effect.runPromise(getEntityPermissionsExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(createEntityPermissionForRoleExample(123, 456)); // Replace with real entity and campaign role IDs
    // await Effect.runPromise(createEntityPermissionForUserExample(123, 456)); // Replace with real entity and user IDs

    // Relations examples
    // await Effect.runPromise(getEntityRelationsExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityRelationExample(123, 456)); // Replace with real entity and relation IDs
    // await Effect.runPromise(createEntityRelationExample(123, 456)); // Replace with real entity and target entity IDs
    // await Effect.runPromise(createTwoWayRelationExample(123, 456)); // Replace with real entity and target entity IDs
    // await Effect.runPromise(updateEntityRelationExample(123, 456)); // Replace with real entity and relation IDs
    // await Effect.runPromise(deleteEntityRelationExample(123, 456)); // Replace with real entity and relation IDs
    // await Effect.runPromise(getCampaignRelationsExample());

    // Entity Inventory examples
    // await Effect.runPromise(getEntityInventoriesExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityInventoryExample(123, 456)); // Replace with real entity and inventory IDs
    // await Effect.runPromise(createEntityInventoryExample(123, 789)); // Replace with real entity and item IDs
    // await Effect.runPromise(createEntityInventoryWithNameExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(updateEntityInventoryExample(123, 456)); // Replace with real entity and inventory IDs
    // await Effect.runPromise(deleteEntityInventoryExample(123, 456)); // Replace with real entity and inventory IDs

    // Entity Abilities examples
    // await Effect.runPromise(getEntityAbilitiesExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityAbilityExample(123, 456)); // Replace with real entity and ability IDs
    // await Effect.runPromise(createEntityAbilityExample(123, 789)); // Replace with real entity and ability IDs
    // await Effect.runPromise(updateEntityAbilityExample(123, 456)); // Replace with real entity and ability IDs
    // await Effect.runPromise(deleteEntityAbilityExample(123, 456)); // Replace with real entity and ability IDs

    // Entity Image examples
    // Note: uploadEntityImageExample requires a File object which is not easily created in examples
    // await Effect.runPromise(removeEntityImageExample(123)); // Replace with a real entity ID

    // Entity Assets examples
    // await Effect.runPromise(getEntityAssetsExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(getEntityAssetExample(123, 456)); // Replace with real entity and asset IDs
    // await Effect.runPromise(createEntityLinkAssetExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(createEntityAliasAssetExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(deleteEntityAssetExample(123, 456)); // Replace with real entity and asset IDs

    // Last Sync examples
    // await Effect.runPromise(getCharactersWithLastSyncExample("2023-01-01T00:00:00.000000Z")); // Replace with a real timestamp
    // await Effect.runPromise(getItemsWithLastSyncExample("2023-01-01T00:00:00.000000Z")); // Replace with a real timestamp
    // await Effect.runPromise(syncWorkflowExample("2023-01-01T00:00:00.000000Z")); // Replace with a real timestamp

    // Bookmark examples
    // await Effect.runPromise(getAllBookmarksExample);
    // await Effect.runPromise(getBookmarkExample(123)); // Replace with a real bookmark ID
    // await Effect.runPromise(createEntityBookmarkExample(123, "Character Bookmark")); // Replace with a real entity ID
    // await Effect.runPromise(createRandomEntityBookmarkExample("character", "Random Character")); // Creates a bookmark for a random character
    // await Effect.runPromise(updateBookmarkExample(123, "Updated Bookmark")); // Replace with a real bookmark ID
    // await Effect.runPromise(deleteBookmarkExample(123)); // Replace with a real bookmark ID

    // Dashboard Widget examples
    // await Effect.runPromise(getAllDashboardWidgetsExample);
    // await Effect.runPromise(getDashboardWidgetExample(123)); // Replace with a real dashboard widget ID
    // await Effect.runPromise(createPreviewWidgetExample(123)); // Replace with a real entity ID
    // await Effect.runPromise(createRecentWidgetExample());
    // await Effect.runPromise(createRandomWidgetExample());
    // await Effect.runPromise(createCalendarWidgetExample(123)); // Replace with a real calendar ID
    // await Effect.runPromise(createHeaderWidgetExample());
    // await Effect.runPromise(createCampaignWidgetExample());
    // await Effect.runPromise(updateDashboardWidgetExample(123, 1)); // Replace with a real dashboard widget ID and position
    // await Effect.runPromise(deleteDashboardWidgetExample(123)); // Replace with a real dashboard widget ID

    // Default Thumbnails examples
    // Note: This is a premium campaign feature. If the campaign isn't premium, the API endpoint will result in a 404.
    // await Effect.runPromise(getAllDefaultThumbnailsExample);
    // Note: createDefaultThumbnailExample requires a File object which is only available in browser environments
    // await Effect.runPromise(createDefaultThumbnailExample(1, new File([], "image.jpg"))); // Replace with a real entity type ID and image file
    // await Effect.runPromise(deleteDefaultThumbnailExample(1)); // Replace with a real entity type ID

    // Image examples
    // await Effect.runPromise(getAllImagesExample);
    // await Effect.runPromise(getImageExample("image-id")); // Replace with a real image ID
    // Note: createImageExample requires a File object which is only available in browser environments
    // await Effect.runPromise(createImageExample(new File([], "image.jpg"))); // Replace with a real image file
    // await Effect.runPromise(updateImageExample("image-id", "New Image Name")); // Replace with a real image ID and name
    // await Effect.runPromise(deleteImageExample("image-id")); // Replace with a real image ID

    // Template examples
    // await Effect.runPromise(getAllTemplatesExample);
    // await Effect.runPromise(switchTemplateStatusExample(123)); // Replace with a real entity ID

    // Campaign Style examples
    // Note: This is a premium campaign feature. If the campaign isn't premium, the API endpoint will result in a 404.
    // await Effect.runPromise(getAllCampaignStylesExample);
    // await Effect.runPromise(getCampaignStyleExample(123)); // Replace with a real style ID
    // await Effect.runPromise(createCampaignStyleExample("Custom Style", "body { background-color: #f0f0f0; }")); // Create a new style
    // await Effect.runPromise(updateCampaignStyleExample(123, { name: "Updated Style" })); // Replace with a real style ID
    // await Effect.runPromise(deleteCampaignStyleExample(123)); // Replace with a real style ID

    // Visibilities examples
    // await Effect.runPromise(getVisibilitiesExample);

    // Permission Test examples
    // await Effect.runPromise(testPermissionsExample(273024, 30, 123, 1)); // Replace with real campaign, user, entity, and entity type IDs

    // Generic Entity API Factory examples
    // const characterApi = characterApiExample();
    // await Effect.runPromise(characterApi.getAllCharactersExample);
    // await Effect.runPromise(characterApi.getCharacterExample(123)); // Replace with a real character ID

    // const locationApi = locationApiExample();
    // await Effect.runPromise(locationApi.getAllLocationsExample);

    // const customApi = customQueryParamExample();
    // await Effect.runPromise(customApi.getCharactersWithCustomParamsExample);

    // Characters Factory API examples
    // await Effect.runPromise(getAllCharactersFactoryExample);
    // await Effect.runPromise(getFilteredCharactersExample);
    // await Effect.runPromise(getCharacterFactoryExample(123)); // Replace with a real character ID
    // await Effect.runPromise(createCharacterFactoryExample);
    // await Effect.runPromise(updateCharacterFactoryExample(123)); // Replace with a real character ID
    // await Effect.runPromise(deleteCharacterFactoryExample(123)); // Replace with a real character ID
    // await runCharacterExamples(); // Run all character examples

    // Locations Factory API examples
    // await Effect.runPromise(getAllLocationsFactoryExample);
    // await Effect.runPromise(getFilteredLocationsExample);
    // await Effect.runPromise(getLocationFactoryExample(123)); // Replace with a real location ID
    // await Effect.runPromise(createLocationFactoryExample);
    // await Effect.runPromise(updateLocationFactoryExample(123)); // Replace with a real location ID
    // await Effect.runPromise(deleteLocationFactoryExample(123)); // Replace with a real location ID
    // await runLocationExamples(); // Run all location examples

    // Families Factory API examples
    // await Effect.runPromise(getAllFamiliesFactoryExample);
    // await Effect.runPromise(getFilteredFamiliesExample);
    // await Effect.runPromise(getFamilyFactoryExample(123)); // Replace with a real family ID
    // await Effect.runPromise(createFamilyFactoryExample);
    // await Effect.runPromise(updateFamilyFactoryExample(123)); // Replace with a real family ID
    // await Effect.runPromise(deleteFamilyFactoryExample(123)); // Replace with a real family ID
    // await Effect.runPromise(getFamilyTreeFactoryExample(123)); // Replace with a real family ID
    // await Effect.runPromise(createFamilyTreeFactoryExample(123)); // Replace with a real family ID
    // await Effect.runPromise(updateFamilyTreeFactoryExample(123)); // Replace with a real family ID
    // await Effect.runPromise(deleteFamilyTreeFactoryExample(123)); // Replace with a real family ID
    // await runFamilyExamples(); // Run all family examples

    // Organisations Factory API examples
    // await Effect.runPromise(getAllOrganisationsFactoryExample);
    // await Effect.runPromise(getFilteredOrganisationsExample);
    // await Effect.runPromise(getOrganisationFactoryExample(123)); // Replace with a real organisation ID
    // await Effect.runPromise(createOrganisationFactoryExample);
    // await Effect.runPromise(updateOrganisationFactoryExample(123)); // Replace with a real organisation ID
    // await Effect.runPromise(deleteOrganisationFactoryExample(123)); // Replace with a real organisation ID
    // await runOrganisationExamples(); // Run all organisation examples

    // Items Factory API examples
    // await Effect.runPromise(getAllItemsFactoryExample);
    // await Effect.runPromise(getFilteredItemsExample);
    // await Effect.runPromise(getItemFactoryExample(123)); // Replace with a real item ID
    // await Effect.runPromise(createItemFactoryExample);
    // await Effect.runPromise(updateItemFactoryExample(123)); // Replace with a real item ID
    // await Effect.runPromise(deleteItemFactoryExample(123)); // Replace with a real item ID
    // await runItemExamples(); // Run all item examples

    // Notes Factory API examples
    // await Effect.runPromise(getAllNotesFactoryExample);
    // await Effect.runPromise(getFilteredNotesExample);
    // await Effect.runPromise(getNoteFactoryExample(123)); // Replace with a real note ID
    // await Effect.runPromise(createNoteFactoryExample);
    // await Effect.runPromise(updateNoteFactoryExample(123)); // Replace with a real note ID
    // await Effect.runPromise(deleteNoteFactoryExample(123)); // Replace with a real note ID
    // await runNoteExamples(); // Run all note examples

    // Abilities Factory API examples
    // await Effect.runPromise(getAllAbilitiesFactoryExample);
    // await Effect.runPromise(getFilteredAbilitiesExample);
    // await Effect.runPromise(getAbilityFactoryExample(123)); // Replace with a real ability ID
    // await Effect.runPromise(createAbilityFactoryExample);
    // await Effect.runPromise(updateAbilityFactoryExample(123)); // Replace with a real ability ID
    // await Effect.runPromise(deleteAbilityFactoryExample(123)); // Replace with a real ability ID
    // await runAbilityExamples(); // Run all ability examples

    // Creatures Factory API examples
    // await Effect.runPromise(getAllCreaturesFactoryExample);
    // await Effect.runPromise(getFilteredCreaturesExample);
    // await Effect.runPromise(getCreatureFactoryExample(123)); // Replace with a real creature ID
    // await Effect.runPromise(createCreatureFactoryExample);
    // await Effect.runPromise(updateCreatureFactoryExample(123)); // Replace with a real creature ID
    // await Effect.runPromise(deleteCreatureFactoryExample(123)); // Replace with a real creature ID
    // await runCreatureExamples(); // Run all creature examples

    // Races Factory API examples
    // await Effect.runPromise(getAllRacesFactoryExample);
    // await Effect.runPromise(getFilteredRacesExample);
    // await Effect.runPromise(getRaceFactoryExample(123)); // Replace with a real race ID
    // await Effect.runPromise(createRaceFactoryExample);
    // await Effect.runPromise(updateRaceFactoryExample(123)); // Replace with a real race ID
    // await Effect.runPromise(deleteRaceFactoryExample(123)); // Replace with a real race ID
    // await runRaceExamples(); // Run all race examples

    // Maps Factory API examples
    // await Effect.runPromise(getAllMapsFactoryExample);
    // await Effect.runPromise(getFilteredMapsExample);
    // await Effect.runPromise(getMapFactoryExample(123)); // Replace with a real map ID
    // await Effect.runPromise(createMapFactoryExample);
    // await Effect.runPromise(updateMapFactoryExample(123)); // Replace with a real map ID
    // await Effect.runPromise(deleteMapFactoryExample(123)); // Replace with a real map ID
    // await runMapExamples(); // Run all map examples

    // Tags Factory API examples
    // await Effect.runPromise(getAllTagsFactoryExample);
    // await Effect.runPromise(getFilteredTagsExample);
    // await Effect.runPromise(getTagFactoryExample(123)); // Replace with a real tag ID
    // await Effect.runPromise(createTagFactoryExample);
    // await Effect.runPromise(updateTagFactoryExample(123)); // Replace with a real tag ID
    // await Effect.runPromise(deleteTagFactoryExample(123)); // Replace with a real tag ID
    // await runTagExamples(); // Run all tag examples

    // console.log("Examples are commented out. Uncomment one to run it.");
};
