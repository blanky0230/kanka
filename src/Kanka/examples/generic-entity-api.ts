import { Effect, pipe } from "effect";
import { createEntityApi } from "../api/createEntityApi.js";
import { Character, CharacterSchema, CreateCharacterParams, UpdateCharacterParams } from "../schemas/characters.js";
import { Location, LocationSchema, CreateLocationParams, UpdateLocationParams } from "../schemas/locations.js";
import { KankaError } from "../errors.js";
import { configFromEnv } from "../config.js";

/**
 * Example: Using the Generic Entity API Factory for Characters
 */
export const characterApiExample = () => {
    // Create a Character API using the factory
    const characterApi = createEntityApi<Character, CreateCharacterParams, UpdateCharacterParams>({
        basePath: "characters",
        schema: CharacterSchema,
    });

    // Example: Get all characters
    const getAllCharactersExample = pipe(
        characterApi.getAll(),
        Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    // Example: Get a character by ID
    const getCharacterExample = (characterId: number) => pipe(
        characterApi.getOne(characterId),
        Effect.tap((response) => Effect.logInfo(`Character: ${response.data.name}`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    // Example: Create a new character
    const createCharacterExample = (params: CreateCharacterParams) => pipe(
        characterApi.create(params),
        Effect.tap((response) => Effect.logInfo(`Created character: ${response.data.name}`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    // Example: Update a character
    const updateCharacterExample = (characterId: number, params: UpdateCharacterParams) => pipe(
        characterApi.update(characterId, params),
        Effect.tap((response) => Effect.logInfo(`Updated character: ${response.data.name}`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    // Example: Delete a character
    const deleteCharacterExample = (characterId: number) => pipe(
        characterApi.delete(characterId),
        Effect.tap(() => Effect.logInfo(`Deleted character with ID: ${characterId}`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    return {
        getAllCharactersExample,
        getCharacterExample,
        createCharacterExample,
        updateCharacterExample,
        deleteCharacterExample,
    };
};

/**
 * Example: Using the Generic Entity API Factory for Locations
 */
export const locationApiExample = () => {
    // Create a Location API using the factory
    const locationApi = createEntityApi<Location, CreateLocationParams, UpdateLocationParams>({
        basePath: "locations",
        schema: LocationSchema,
    });

    // Example: Get all locations
    const getAllLocationsExample = pipe(
        locationApi.getAll(),
        Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} locations`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    // Example: Get a location by ID
    const getLocationExample = (locationId: number) => pipe(
        locationApi.getOne(locationId),
        Effect.tap((response) => Effect.logInfo(`Location: ${response.data.name}`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    return {
        getAllLocationsExample,
        getLocationExample,
    };
};

/**
 * Example: Using a custom query parameter transformer
 */
export const customQueryParamExample = () => {
    // Create a Character API with a custom query parameter transformer
    const characterApi = createEntityApi<Character, CreateCharacterParams, UpdateCharacterParams>({
        basePath: "characters",
        schema: CharacterSchema,
        transformQueryParams: (params) => {
            const queryParams: Record<string, string | number | boolean | undefined> = {};

            // Standard parameters
            if (typeof params.page === 'number') queryParams.page = params.page;
            if (typeof params.perPage === 'number') queryParams.per_page = params.perPage;

            // Custom transformation for a specific parameter
            if (typeof params.name === 'string') {
                queryParams.name = params.name.toLowerCase(); // Convert name to lowercase
            }

            // Add custom parameter
            if (typeof params.customParam === 'string') {
                queryParams.custom_param = params.customParam;
            }

            return queryParams;
        }
    });

    // Example: Get characters with custom parameters
    const getCharactersWithCustomParamsExample = pipe(
        characterApi.getAll({
            name: "GANDALF", // Will be transformed to lowercase
            customParam: "special-value"
        }),
        Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters`)),
        Effect.catchAll((error: KankaError) => Effect.logError(`Error: ${error.message}`)),
        Effect.provide(configFromEnv)
    );

    return {
        getCharactersWithCustomParamsExample,
    };
};
