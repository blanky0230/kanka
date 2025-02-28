import { Effect, pipe } from "effect";
import {
    getEntityAttributes,
    getEntityAttribute,
    createEntityAttribute,
    updateEntityAttribute,
    deleteEntityAttribute
} from "../api/attributes.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all attributes for an entity
 */
export const getEntityAttributesExample = (entityId: number) => pipe(
    getEntityAttributes(entityId),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} attributes for entity ${entityId}`)),
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
 * Example: Get an attribute by ID for an entity
 */
export const getEntityAttributeExample = (entityId: number, attributeId: number) => pipe(
    getEntityAttribute(entityId, attributeId),
    Effect.tap((response) => Effect.logInfo(`Attribute: ${response.data.name}`)),
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
 * Example: Create a new attribute for an entity
 */
export const createEntityAttributeExample = (entityId: number) => pipe(
    createEntityAttribute(entityId, {
        name: "New Attribute",
        value: "This is a test attribute created with the Kanka API client",
        type_id: 1, // Standard type
        is_private: false,
        is_pinned: true,
    }),
    Effect.tap((response) => Effect.logInfo(`Created attribute: ${response.data.name}`)),
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
 * Example: Update an attribute for an entity
 */
export const updateEntityAttributeExample = (entityId: number, attributeId: number) => pipe(
    updateEntityAttribute(entityId, attributeId, {
        name: "Updated Attribute",
        value: "This is an updated attribute",
        is_pinned: false,
    }),
    Effect.tap((response) => Effect.logInfo(`Updated attribute: ${response.data.name}`)),
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
 * Example: Delete an attribute from an entity
 */
export const deleteEntityAttributeExample = (entityId: number, attributeId: number) => pipe(
    deleteEntityAttribute(entityId, attributeId),
    Effect.tap(() => Effect.logInfo(`Deleted attribute with ID: ${attributeId}`)),
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
