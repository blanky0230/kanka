/**
 * Kanka API Client
 *
 * A fully featured API client for the Kanka API using Effect.ts
 *
 * This client provides a type-safe way to interact with the Kanka API
 * using Effect.js for composable and testable API functions.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import { makeConfig, getCampaigns } from "./Kanka";
 *
 * const program = Effect.gen(function* (_) {
 *   const campaigns = yield* getCampaigns();
 *   console.log(`Found ${campaigns.data.length} campaigns`);
 * });
 *
 * Effect.runPromise(
 *   program.pipe(
 *     Effect.provide(
 *       makeConfig({ apiKey: "your-api-key" })
 *     )
 *   )
 * );
 * ```
 */

// Re-export all modules
export * from "./config.js";
export * from "./errors.js";
export * from "./schemas/index.js";
export * from "./api/index.js";
export * from "./examples.js";
