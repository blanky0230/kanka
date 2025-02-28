import { Effect, pipe } from "effect";
import { getMapGroup, getMapGroups, createMapGroup, updateMapGroup, deleteMapGroup } from "../api/map-groups.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all map groups for a map
 */
export const getMapGroupsExample = (mapId: number) => pipe(
    getMapGroups(mapId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} map groups`)),
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
 * Example: Get a map group by ID
 */
export const getMapGroupExample = (mapId: number, groupId: number) => pipe(
    getMapGroup(mapId, groupId),
    Effect.tap((response) => Effect.logInfo(`Map Group: ${response.data.name}`)),
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
 * Example: Create a new map group
 */
export const createMapGroupExample = (mapId: number) => pipe(
    createMapGroup(mapId, {
        name: "New Map Group",
        map_id: mapId,
        is_shown: true,
        position: 1,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created map group with ID: ${response.data.id}`)),
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
 * Example: Update a map group
 */
export const updateMapGroupExample = (mapId: number, groupId: number) => pipe(
    updateMapGroup(mapId, groupId, {
        name: "Updated Map Group",
        is_shown: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated map group with ID: ${response.data.id}`)),
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
 * Example: Delete a map group
 */
export const deleteMapGroupExample = (mapId: number, groupId: number) => pipe(
    deleteMapGroup(mapId, groupId),
    Effect.tap(() => Effect.logInfo(`Deleted map group with ID: ${groupId}`)),
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
