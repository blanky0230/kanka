import { Effect, pipe } from "effect";
import { getOrganisation, getOrganisations, createOrganisation, updateOrganisation, deleteOrganisation } from "../api/organisations.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all organisations
 */
export const getAllOrganisationsExample = pipe(
    getOrganisations(),
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
 * Example: Get an organisation by ID
 */
export const getOrganisationExample = (organisationId: number) => pipe(
    getOrganisation(organisationId),
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
 * Example: Create a new organisation
 */
export const createOrganisationExample = pipe(
    createOrganisation({
        name: "New Organisation",
        entry: "This is a test organisation created with the Kanka API client",
        type: "Guild",
        is_defunct: false,
        is_private: false,
    }),
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
 * Example: Update an organisation
 */
export const updateOrganisationExample = (organisationId: number) => pipe(
    updateOrganisation(organisationId, {
        name: "Updated Organisation",
        entry: "This is an updated organisation",
        type: "Company",
    }),
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
 * Example: Delete an organisation
 */
export const deleteOrganisationExample = (organisationId: number) => pipe(
    deleteOrganisation(organisationId),
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
