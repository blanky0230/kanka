import { Effect, pipe } from "effect";
import { getCharacters } from "../api/characters.js";
import { getItems } from "../api/items.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all characters with last sync
 * 
 * This example demonstrates how to use the lastSync parameter to get only
 * characters that have changed since the last sync.
 */
export const getCharactersWithLastSyncExample = (lastSync?: string) => pipe(
    getCharacters({ lastSync }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters updated since ${lastSync || 'the beginning'}`)),
    Effect.tap((response) => Effect.logInfo(`New sync timestamp: ${response.sync}`)),
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
 * Example: Get all items with last sync
 * 
 * This example demonstrates how to use the lastSync parameter to get only
 * items that have changed since the last sync.
 */
export const getItemsWithLastSyncExample = (lastSync?: string) => pipe(
    getItems({ lastSync }),
    Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} items updated since ${lastSync || 'the beginning'}`)),
    Effect.tap((response) => Effect.logInfo(`New sync timestamp: ${response.sync}`)),
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
 * Example: Implementing a sync workflow
 * 
 * This example demonstrates a simple sync workflow where we:
 * 1. Get all characters with the last sync timestamp
 * 2. Store the new sync timestamp
 * 3. Get all items with the last sync timestamp
 * 4. Update the sync timestamp
 * 
 * In a real application, you would store the sync timestamp in a database
 * or local storage and use it for all API calls.
 */
export const syncWorkflowExample = (initialLastSync?: string) => pipe(
    Effect.gen(function* (_) {
        // Start with the initial last sync timestamp
        let lastSync = initialLastSync;

        // Get all characters that have changed since the last sync
        const charactersResponse = yield* getCharacters({ lastSync });
        yield* Effect.logInfo(`Found ${charactersResponse.data.length} characters updated since ${lastSync || 'the beginning'}`);

        // Update the last sync timestamp
        lastSync = charactersResponse.sync;
        yield* Effect.logInfo(`Updated sync timestamp: ${lastSync}`);

        // Get all items that have changed since the last sync
        const itemsResponse = yield* getItems({ lastSync });
        yield* Effect.logInfo(`Found ${itemsResponse.data.length} items updated since ${lastSync || 'the beginning'}`);

        // Update the last sync timestamp again
        lastSync = itemsResponse.sync;
        yield* Effect.logInfo(`Final sync timestamp: ${lastSync}`);

        // Return the final sync timestamp
        return lastSync;
    }),
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
