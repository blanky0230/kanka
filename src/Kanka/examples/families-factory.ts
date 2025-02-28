import { Effect, pipe } from "effect";
import { getFamiliesFactory, getFamilyFactory, createFamilyFactory, updateFamilyFactory, deleteFamilyFactory, getFamilyTreeFactory, createFamilyTreeFactory, updateFamilyTreeFactory, deleteFamilyTreeFactory } from "../api/families-factory.js";
import { CreateFamilyParams, UpdateFamilyParams, FamilyTree } from "../schemas/families.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all families using the factory API
 */
export const getAllFamiliesFactoryExample = pipe(
    getFamiliesFactory(),
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
 * Example: Get all families with filtering
 */
export const getFilteredFamiliesExample = pipe(
    getFamiliesFactory({
        name: "House Stark",
        is_private: false,
        is_extinct: false,
        type: "Noble House",
        tags: [1, 2, 3], // Replace with real tag IDs
        family_id: 4, // Replace with real parent family ID
        location_id: 5, // Replace with real location ID
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered families`)),
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
 * Example: Get a family by ID using the factory API
 */
export const getFamilyFactoryExample = (familyId: number) => pipe(
    getFamilyFactory(familyId),
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
 * Example: Create a new family using the factory API
 */
export const createFamilyFactoryExample = pipe(
    createFamilyFactory({
        name: "New Family",
        entry: "This is a test family created with the Kanka API client factory",
        type: "Noble House",
        is_extinct: false,
        is_private: false,
    } as CreateFamilyParams),
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
 * Example: Update a family using the factory API
 */
export const updateFamilyFactoryExample = (familyId: number) => pipe(
    updateFamilyFactory(familyId, {
        name: "Updated Family",
        entry: "This is an updated family using the factory API",
        type: "Clan",
    } as UpdateFamilyParams),
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
 * Example: Delete a family using the factory API
 */
export const deleteFamilyFactoryExample = (familyId: number) => pipe(
    deleteFamilyFactory(familyId),
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
 * Example: Get a family tree using the factory API
 */
export const getFamilyTreeFactoryExample = (familyId: number) => pipe(
    getFamilyTreeFactory(familyId),
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
 * Example: Create a family tree using the factory API
 */
export const createFamilyTreeFactoryExample = (familyId: number) => pipe(
    createFamilyTreeFactory(familyId, {
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
    } as FamilyTree),
    Effect.tap(() => Effect.logInfo(`Family tree created using factory API`)),
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
 * Example: Update a family tree using the factory API
 */
export const updateFamilyTreeFactoryExample = (familyId: number) => pipe(
    updateFamilyTreeFactory(familyId, {
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
                            },
                            {
                                entity_id: 79, // Replace with a real entity ID
                                uuid: "child-2"
                            }
                        ]
                    }
                ]
            }
        ]
    } as FamilyTree),
    Effect.tap(() => Effect.logInfo(`Family tree updated using factory API`)),
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
 * Example: Delete a family tree using the factory API
 */
export const deleteFamilyTreeFactoryExample = (familyId: number) => pipe(
    deleteFamilyTreeFactory(familyId),
    Effect.tap(() => Effect.logInfo(`Family tree deleted using factory API`)),
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
 * Run all family examples
 */
export const runFamilyExamples = async () => {
    // Get all families
    await Effect.runPromise(getAllFamiliesFactoryExample);

    // Get filtered families
    await Effect.runPromise(getFilteredFamiliesExample);

    // Get a specific family (replace with a real family ID)
    // await Effect.runPromise(getFamilyFactoryExample(123));

    // Create a new family
    // await Effect.runPromise(createFamilyFactoryExample);

    // Update a family (replace with a real family ID)
    // await Effect.runPromise(updateFamilyFactoryExample(123));

    // Delete a family (replace with a real family ID)
    // await Effect.runPromise(deleteFamilyFactoryExample(123));

    // Get a family tree (replace with a real family ID)
    // await Effect.runPromise(getFamilyTreeFactoryExample(123));

    // Create a family tree (replace with a real family ID)
    // await Effect.runPromise(createFamilyTreeFactoryExample(123));

    // Update a family tree (replace with a real family ID)
    // await Effect.runPromise(updateFamilyTreeFactoryExample(123));

    // Delete a family tree (replace with a real family ID)
    // await Effect.runPromise(deleteFamilyTreeFactoryExample(123));
};
