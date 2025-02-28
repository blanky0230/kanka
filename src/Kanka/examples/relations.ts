import { Effect, pipe } from "effect";
import {
    getEntityRelations,
    getEntityRelation,
    createEntityRelation,
    updateEntityRelation,
    deleteEntityRelation,
    getCampaignRelations
} from "../api/relations.js";
import { RelationVisibility } from "../schemas/relations.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all relations of an entity
 */
export const getEntityRelationsExample = (entityId: number) => pipe(
    getEntityRelations(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} relations for entity ${entityId}`)),
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
 * Example: Get a specific relation
 */
export const getEntityRelationExample = (entityId: number, relationId: number) => pipe(
    getEntityRelation(entityId, relationId),
    Effect.tap((response) => Effect.logInfo(`Relation: ${response.data.relation} between entities ${response.data.owner_id} and ${response.data.target_id}`)),
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
 * Example: Create a relation between two entities
 */
export const createEntityRelationExample = (entityId: number, targetEntityId: number) => pipe(
    createEntityRelation(entityId, {
        owner_id: entityId,
        target_id: targetEntityId,
        relation: "Connected to",
        visibility_id: RelationVisibility.All
    }),
    Effect.tap((response) => Effect.logInfo(`Created relation: ${response.data.relation} between entities ${response.data.owner_id} and ${response.data.target_id}`)),
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
 * Example: Create a two-way relation between entities
 */
export const createTwoWayRelationExample = (entityId: number, targetEntityId: number) => pipe(
    createEntityRelation(entityId, {
        owner_id: entityId,
        target_id: targetEntityId,
        relation: "Friends with",
        two_way: true,
        visibility_id: RelationVisibility.All
    }),
    Effect.tap((response) => Effect.logInfo(`Created two-way relation: ${response.data.relation} between entities ${response.data.owner_id} and ${response.data.target_id}`)),
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
 * Example: Update a relation
 */
export const updateEntityRelationExample = (entityId: number, relationId: number) => pipe(
    updateEntityRelation(entityId, relationId, {
        relation: "Updated relation",
        attitude: 50,
        colour: "#00FF00"
    }),
    Effect.tap((response) => Effect.logInfo(`Updated relation: ${response.data.relation} with attitude ${response.data.attitude}`)),
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
 * Example: Delete a relation
 */
export const deleteEntityRelationExample = (entityId: number, relationId: number) => pipe(
    deleteEntityRelation(entityId, relationId),
    Effect.tap(() => Effect.logInfo(`Deleted relation ${relationId} from entity ${entityId}`)),
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
 * Example: Get all relations in a campaign
 */
export const getCampaignRelationsExample = () => pipe(
    getCampaignRelations(),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} relations in the campaign`)),
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
