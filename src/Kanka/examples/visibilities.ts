import { Effect, pipe } from "effect";
import { getVisibilities } from "../api/visibilities.js";
import { configFromEnv } from "../config.js";
import { KankaError } from "../errors.js";

/**
 * Example: Get all visibilities
 */
export const getVisibilitiesExample = pipe(
    getVisibilities(),
    Effect.tap((visibilities) => Effect.logInfo(`Found ${visibilities.length} visibilities`)),
    Effect.tap((visibilities) => Effect.logInfo(`Visibilities: ${JSON.stringify(visibilities, null, 2)}`)),
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
