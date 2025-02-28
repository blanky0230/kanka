import { Effect, pipe } from "effect";
import { getOrganisationMember, getOrganisationMembers, createOrganisationMember, updateOrganisationMember, deleteOrganisationMember } from "../api/organisation-members.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all members of an organisation
 */
export const getOrganisationMembersExample = (organisationId: number) => pipe(
    getOrganisationMembers(organisationId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} organisation members`)),
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
 * Example: Get an organisation member by ID
 */
export const getOrganisationMemberExample = (organisationId: number, memberId: number) => pipe(
    getOrganisationMember(organisationId, memberId),
    Effect.tap((response) => Effect.logInfo(`Organisation Member: ${response.data.id}`)),
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
 * Example: Create a new organisation member
 */
export const createOrganisationMemberExample = (organisationId: number, characterId: number) => pipe(
    createOrganisationMember(organisationId, {
        organisation_id: organisationId,
        character_id: characterId,
        role: "Member",
        is_private: false,
        status_id: 0, // Active member
    }),
    Effect.tap((response) => Effect.logInfo(`Created organisation member with ID: ${response.data.id}`)),
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
 * Example: Update an organisation member
 */
export const updateOrganisationMemberExample = (organisationId: number, memberId: number) => pipe(
    updateOrganisationMember(organisationId, memberId, {
        role: "Leader",
        status_id: 1, // Different status
    }),
    Effect.tap((response) => Effect.logInfo(`Updated organisation member with ID: ${response.data.id}`)),
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
 * Example: Delete an organisation member
 */
export const deleteOrganisationMemberExample = (organisationId: number, memberId: number) => pipe(
    deleteOrganisationMember(organisationId, memberId),
    Effect.tap(() => Effect.logInfo(`Deleted organisation member with ID: ${memberId}`)),
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
