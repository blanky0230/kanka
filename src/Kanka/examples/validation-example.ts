import { Effect, pipe, Schema } from "effect";
import {
    validateWithSchema,
    validateRequest,
    validateResponse,
    validateWithSchemaAndCache,
    clearValidationCache,
    createValidator,
    createLoggingValidator,
    createPartialValidator,
    getValidationCacheStats,
    setValidationCacheMaxSize,
    ValidationOptions,
    ValidationErrorSeverity
} from "../api/validation.js";
import { Character, CharacterSchema, CreateCharacterParams } from "../schemas/characters.js";
import { get, post } from "../api/client.js";
import { SingleResponse } from "../schemas/common.js";
import { configFromEnv, makeConfig } from "../config.js";
import { KankaSchemaValidationError } from "../api/validation.js";
import { KankaError } from "../errors.js";

// Type assertion helper for schemas
const asSchema = <A>(schema: unknown): Schema.Schema<A, unknown> =>
    schema as Schema.Schema<A, unknown>;

/**
 * Example: Validate data against a schema
 */
export const validateDataExample = (data: unknown) => pipe(
    validateWithSchema(asSchema<Character>(CharacterSchema), data),
    Effect.tap((character) => Effect.logInfo(`Validated character: ${(character as Character).name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaSchemaValidationError) {
            return Effect.logError(`Validation error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    })
);

/**
 * Example: Get a character with validation
 */
export const getCharacterWithValidationExample = (characterId: number) => pipe(
    get<SingleResponse<Character>>(`characters/${characterId}`),
    Effect.flatMap((response) => validateWithSchema(asSchema<Character>(CharacterSchema), response.data)),
    Effect.tap((character) => Effect.logInfo(`Character: ${(character as Character).name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaSchemaValidationError) {
            return Effect.logError(`Validation error: ${error.message}`);
            // You can also access detailed validation errors
            // return Effect.logError(`Validation error details: ${error.formatDetails()}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(configFromEnv)
);

/**
 * Example: Create a character with request validation
 */
export const createCharacterWithValidationExample = (params: unknown) => pipe(
    validateRequest(asSchema<Character>(CharacterSchema))(params),
    Effect.flatMap((validatedParams) =>
        post<SingleResponse<Character>>("characters", validatedParams)
    ),
    Effect.flatMap((response) => validateResponse(asSchema<Character>(CharacterSchema))(response.data)),
    Effect.tap((character) => Effect.logInfo(`Created character: ${(character as Character).name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaSchemaValidationError) {
            return Effect.logError(`Validation error: ${error.message}`);
            // You can also access detailed validation errors
            // return Effect.logError(`Validation error details: ${error.formatDetails()}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    }),
    Effect.provide(configFromEnv)
);

/**
 * Example: Using validation with error handling
 */
export const validationWithErrorHandlingExample = (data: unknown) => pipe(
    validateWithSchema(asSchema<Character>(CharacterSchema), data),
    Effect.tap((character) => Effect.logInfo(`Validated character: ${(character as Character).name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaSchemaValidationError) {
            return Effect.logError(`Validation error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    })
);

/**
 * Example: Using validation with caching for performance
 */
export const validationWithCachingExample = (data: unknown) => pipe(
    validateWithSchemaAndCache(asSchema<Character>(CharacterSchema), data, { useCache: true }),
    Effect.tap((character) => Effect.logInfo(`Validated character with caching: ${(character as Character).name}`)),
    Effect.catchAll((error) => {
        if (error instanceof KankaSchemaValidationError) {
            return Effect.logError(`Validation error: ${error.message}`);
        }
        return Effect.logError(`Unknown error: ${String(error)}`);
    })
);

/**
 * Example: Disable validation in production
 */
export const disableValidationInProductionExample = (characterId: number) => {
    // Create a config with validation disabled
    const prodConfig = makeConfig({
        enableValidation: process.env.NODE_ENV === "production" ? false : true,
    });

    return pipe(
        get<SingleResponse<Character>>(`characters/${characterId}`),
        Effect.flatMap((response) => validateWithSchema(asSchema<Character>(CharacterSchema), response.data)),
        Effect.tap((character) => Effect.logInfo(`Character: ${(character as Character).name}`)),
        Effect.catchAll((error) => {
            if (error instanceof KankaSchemaValidationError) {
                return Effect.logError(`Validation error: ${error.message}`);
            }
            return Effect.logError(`Unknown error: ${String(error)}`);
        }),
        // Use the production config
        Effect.provide(prodConfig)
    );
};

/**
 * Example: Using partial validation for incomplete data
 */
export const partialValidationExample = (data: unknown) => {
    const partialValidator = createPartialValidator(asSchema<Character>(CharacterSchema));

    return pipe(
        partialValidator(data),
        Effect.tap((character) => Effect.logInfo(`Partially validated character: ${(character as Partial<Character>).name}`)),
        Effect.catchAll((error) => {
            if (error instanceof KankaSchemaValidationError) {
                return Effect.logError(`Validation error: ${error.message}`);
            }
            return Effect.logError(`Unknown error: ${String(error)}`);
        })
    );
};

/**
 * Example: Using a custom validator with specific options
 */
export const customValidatorExample = (data: unknown) => {
    // Create a validator with custom options
    const strictValidator = createValidator({
        strictMode: true,
        useCache: true,
        errorHandler: (error) => {
            // Custom error handling logic
            console.warn(`Custom error handler: ${error.message}`);
            return error;
        }
    });

    return pipe(
        strictValidator(asSchema<Character>(CharacterSchema), data),
        Effect.tap((character) => Effect.logInfo(`Strictly validated character: ${(character as Character).name}`)),
        Effect.catchAll((error) => {
            if (error instanceof KankaSchemaValidationError) {
                return Effect.logError(`Validation error: ${error.message}`);
            }
            return Effect.logError(`Unknown error: ${String(error)}`);
        })
    );
};

/**
 * Example: Using a logging validator that doesn't fail
 */
export const loggingValidatorExample = (data: unknown) => {
    // Create a validator that logs errors but doesn't fail
    const logValidator = createLoggingValidator(asSchema<Character>(CharacterSchema));

    // This will log validation errors but always return the data
    const result = logValidator(data);

    return Effect.succeed(result);
};

/**
 * Example: Monitoring validation cache performance
 */
export const monitorCachePerformanceExample = () => {
    // Get cache statistics
    const stats = getValidationCacheStats();

    return Effect.logInfo(
        `Cache stats: Hits=${stats.hits}, Misses=${stats.misses}, Size=${stats.size}`
    );
};

/**
 * Example: Managing validation cache size
 */
export const manageCacheSizeExample = () => {
    // Set maximum cache size
    setValidationCacheMaxSize(100);

    return Effect.logInfo("Set validation cache max size to 100 items");
};

/**
 * Run validation examples
 */
export const runValidationExamples = async () => {
    // Example data
    const validCharacterData: Character = {
        id: 1,
        name: "Gandalf",
        entry: "<p>The Grey Wizard</p>",
        created_at: "2023-01-01T00:00:00.000000Z",
        updated_at: "2023-01-01T00:00:00.000000Z",
        created_by: null,
        updated_by: null,
        is_private: false,
        image: null,
        image_full: null,
        image_thumb: null,
        has_custom_image: false,
        tags: null,
        is_template: false,
        entity_id: 1,
        is_personality_visible: true,
        location_id: null,
        title: "The Grey",
        type: "NPC"
    };

    // Invalid data (missing required fields)
    const invalidCharacterData = {
        name: "Gandalf",
        // Missing required fields
    };

    // Partial data (some fields missing but that's ok)
    const partialCharacterData = {
        name: "Frodo",
        title: "Ring Bearer",
        type: "PC"
    };

    // Clear the validation cache before running examples
    clearValidationCache();

    try {
        console.log("=== Basic Validation Examples ===");
        // Run basic examples
        await Effect.runPromise(validateDataExample(validCharacterData));
        await Effect.runPromise(validateDataExample(invalidCharacterData));

        console.log("\n=== API Validation Examples ===");
        // Get a character with validation (replace with a real character ID)
        // await Effect.runPromise(getCharacterWithValidationExample(123));

        // Create a character with validation
        // await Effect.runPromise(createCharacterWithValidationExample({
        //     name: "Frodo Baggins",
        //     entry: "<p>The Ring Bearer</p>",
        //     title: "Ring Bearer",
        //     type: "PC"
        // }));

        console.log("\n=== Error Handling Examples ===");
        // Validation with error handling
        await Effect.runPromise(validationWithErrorHandlingExample(validCharacterData));
        await Effect.runPromise(validationWithErrorHandlingExample(invalidCharacterData));

        console.log("\n=== Caching Examples ===");
        // Validation with caching for performance
        await Effect.runPromise(validationWithCachingExample(validCharacterData));
        await Effect.runPromise(validationWithCachingExample(validCharacterData)); // Second call should use cache
        await Effect.runPromise(monitorCachePerformanceExample());
        await Effect.runPromise(manageCacheSizeExample());

        console.log("\n=== Advanced Validation Examples ===");
        // Partial validation
        await Effect.runPromise(partialValidationExample(partialCharacterData));

        // Custom validator
        await Effect.runPromise(customValidatorExample(validCharacterData));

        // Logging validator
        await Effect.runPromise(loggingValidatorExample(invalidCharacterData));

        console.log("\n=== Environment-specific Validation ===");
        // Disable validation in production
        // await Effect.runPromise(disableValidationInProductionExample(123));
    } catch (error) {
        console.error("Error running validation examples:", error);
    }
};
