import { Effect, pipe } from "effect";
import { getOrganisationsFactory, getOrganisationFactory, createOrganisationFactory, updateOrganisationFactory, deleteOrganisationFactory } from "../api/organisations-factory.js";
import { CreateOrganisationParams, UpdateOrganisationParams } from "../schemas/organisations.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all organisations using the factory API
 */
export const getAllOrganisationsFactoryExample = pipe(
    getOrganisationsFactory(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} organisations`)),
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
 * Example: Get all organisations with filtering
 */
export const getFilteredOrganisationsExample = pipe(
    getOrganisationsFactory({
        name: "Guild of Adventurers",
        is_private: false,
        is_defunct: false,
        type: "Guild",
        tags: [1, 2, 3], // Replace with real tag IDs
        organisation_id: 4, // Replace with real parent organisation ID
    }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} filtered organisations`)),
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
 * Example: Get an organisation by ID using the factory API
 */
export const getOrganisationFactoryExample = (organisationId: number) => pipe(
    getOrganisationFactory(organisationId),
    Effect.tap((response) => Effect.logInfo(`Organisation: ${response.data.name}`)),
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
 * Example: Create a new organisation using the factory API
 */
export const createOrganisationFactoryExample = pipe(
    createOrganisationFactory({
        name: "New Organisation",
        entry: "This is a test organisation created with the Kanka API client factory",
        type: "Guild",
        is_defunct: false,
        is_private: false,
    } as CreateOrganisationParams),
    Effect.tap((response) => Effect.logInfo(`Created organisation: ${response.data.name}`)),
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
 * Example: Update an organisation using the factory API
 */
export const updateOrganisationFactoryExample = (organisationId: number) => pipe(
    updateOrganisationFactory(organisationId, {
        name: "Updated Organisation",
        entry: "This is an updated organisation using the factory API",
        type: "Company",
    } as UpdateOrganisationParams),
    Effect.tap((response) => Effect.logInfo(`Updated organisation: ${response.data.name}`)),
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
 * Example: Delete an organisation using the factory API
 */
export const deleteOrganisationFactoryExample = (organisationId: number) => pipe(
    deleteOrganisationFactory(organisationId),
    Effect.tap(() => Effect.logInfo(`Deleted organisation with ID: ${organisationId}`)),
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
 * Run all organisation examples
 */
export const runOrganisationExamples = async () => {
    // Get all organisations
    await Effect.runPromise(getAllOrganisationsFactoryExample);

    // Get filtered organisations
    await Effect.runPromise(getFilteredOrganisationsExample);

    // Get a specific organisation (replace with a real organisation ID)
    // await Effect.runPromise(getOrganisationFactoryExample(123));

    // Create a new organisation
    // await Effect.runPromise(createOrganisationFactoryExample);

    // Update an organisation (replace with a real organisation ID)
    // await Effect.runPromise(updateOrganisationFactoryExample(123));

    // Delete an organisation (replace with a real organisation ID)
    // await Effect.runPromise(deleteOrganisationFactoryExample(123));
};
