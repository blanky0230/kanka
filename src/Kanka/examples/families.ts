import { Effect, pipe } from "effect";
import { getFamily, getFamilies, createFamily, updateFamily, deleteFamily, getFamilyTree, createFamilyTree, updateFamilyTree, deleteFamilyTree } from "../api/families.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all families
 */
export const getAllFamiliesExample = pipe(
    getFamilies(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} families`)),
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
 * Example: Get a family by ID
 */
export const getFamilyExample = (familyId: number) => pipe(
    getFamily(familyId),
    Effect.tap((response) => Effect.logInfo(`Family: ${response.data.name}`)),
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
 * Example: Create a new family
 */
export const createFamilyExample = pipe(
    createFamily({
        name: "New Family",
        entry: "This is a test family created with the Kanka API client",
        type: "Noble House",
        is_extinct: false,
        is_private: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Created family: ${response.data.name}`)),
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
 * Example: Update a family
 */
export const updateFamilyExample = (familyId: number) => pipe(
    updateFamily(familyId, {
        name: "Updated Family",
        entry: "This is an updated family",
        type: "Clan",
    }),
    Effect.tap((response) => Effect.logInfo(`Updated family: ${response.data.name}`)),
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
 * Example: Delete a family
 */
export const deleteFamilyExample = (familyId: number) => pipe(
    deleteFamily(familyId),
    Effect.tap(() => Effect.logInfo(`Deleted family with ID: ${familyId}`)),
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
 * Example: Get a family tree
 */
export const getFamilyTreeExample = (familyId: number) => pipe(
    getFamilyTree(familyId),
    Effect.tap((response) => Effect.logInfo(`Family tree retrieved with ${response.data.length} nodes`)),
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
 * Example: Create a family tree
 */
export const createFamilyTreeExample = (familyId: number) => pipe(
    createFamilyTree(familyId, {
        tree: [
            {
                entity_id: 76, // Replace with a real entity ID
                uuid: "root-node",
                relations: [
                    {
                        entity_id: 77, // Replace with a real entity ID
                        uuid: "spouse",
                        role: "Spouse",
                        children: [
                            {
                                entity_id: 78, // Replace with a real entity ID
                                uuid: "child-1"
                            }
                        ]
                    }
                ]
            }
        ]
    }),
    Effect.tap(() => Effect.logInfo(`Family tree created`)),
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
