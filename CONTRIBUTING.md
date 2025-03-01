# Contributing to Kanka API Client

This guide provides comprehensive information for contributors to the Kanka API Client project. It consolidates documentation from various sources to help both new and experienced developers understand the project architecture, implementation patterns, and best practices.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Implementation Workflow](#implementation-workflow)
6. [Coding Standards](#coding-standards)
7. [Architectural Improvements](#architectural-improvements)
8. [Schema Validation](#schema-validation)
9. [Error Handling](#error-handling)
10. [Pagination Helpers](#pagination-helpers)
11. [Middleware Support](#middleware-support)
12. [Testing](#testing)
13. [Team Collaboration](#team-collaboration)
14. [Code Review Checklist](#code-review-checklist)
15. [Troubleshooting](#troubleshooting)
16. [Best Practices](#best-practices)
17. [Further Reading](#further-reading)

## Introduction

The Kanka API Client is a TypeScript library for interacting with the [Kanka](https://kanka.io) API. It provides a type-safe, functional approach to working with the API, using Effect.ts for error handling and type safety.

This document serves as the main entry point for understanding how to contribute to the project, including our architectural improvement strategy, coding standards, and implementation patterns.

## Project Overview

The Kanka API Client offers:

- **Type-safe**: Full TypeScript support with proper types for all API responses
- **Error Handling**: Comprehensive error handling using Effect.js
- **Testability**: Easy to test with Effect.js's testing utilities
- **Configurability**: Flexible configuration options
- **Resource Mapping**: Map all API resources to proper TypeScript interfaces

We have successfully implemented several architectural improvements:

- Generic Entity API Factory
- Enhanced Type Safety with Schema Validation
- Resource-Based Organization
- Improved Error Handling
- Pagination Helpers
- Middleware Support

## Getting Started

1. **Set up your development environment**
   ```bash
   # Clone the repository
   git clone https://github.com/your-org/kanka-api-client.git
   cd kanka-api-client

   # Install dependencies
   npm install

   # Build the project
   npm run build
   ```

2. **Configure your API token**
   Create a `.env` file with your Kanka API token:
   ```
   KANKA_API_TOKEN=your_api_token_here
   ```

   Alternatively, run the interactive setup:
   ```
   just setup-env
   ```

3. **Run an example**
   ```bash
   npm run example
   ```

4. **Understand the structure**: Look at existing files in `schemas`, `api`, and `examples` folders
5. **Follow the patterns**: Use existing implementations as templates for new work
6. **Ask questions**: If something isn't clear, ask for help

## Project Structure

The Kanka API Client is organized as follows:

```
src/Kanka/
  api/            # API implementation files
  schemas/        # Schema definitions
  examples/       # Example usage
  config.ts       # Configuration
  errors.ts       # Error types
  index.ts        # Main exports
```

As we implement Resource-Based Organization (A3), we'll transition to a resource-based structure:

```
src/Kanka/resources/
  characters/
    schema.ts
    api.ts
    examples.ts
  locations/
    schema.ts
    api.ts
    examples.ts
```

## Implementation Workflow

1. **Read API documentation** in `data/` directory to understand the endpoint
2. **Create schema file** with interfaces and Schema validators
   ```typescript
   // Example: src/Kanka/schemas/characters.ts
   export interface Character extends TaggableEntity {
     is_template: boolean;
     entity_id: number;
     // ...other properties
   }
   
   export const CharacterSchema = Schema.Struct({
     // Schema definition
   });
   ```
3. **Implement API functions** in api file
   ```typescript
   // Example: src/Kanka/api/characters.ts
   export const getCharacters = (params?: {
     page?: number;
     perPage?: number;
   }) => {
     return get<PaginatedResponse<Character>>("characters", {
       page: params?.page,
       per_page: params?.perPage,
     });
   };
   ```
4. **Add examples** demonstrating usage
   ```typescript
   // Example: src/Kanka/examples/characters.ts
   export const getAllCharactersExample = pipe(
     getCharacters(),
     Effect.tap((response) => Effect.logInfo(`Found ${response.data.length} characters`)),
     Effect.catchAll((error) => Effect.logError(`Error: ${String(error)}`)),
     Effect.provide(configFromEnv)
   );
   ```
5. **Update implementation plan** to track progress

## Coding Standards

### Functional Programming Principles

- Use **Effect.ts** for error handling and type safety
  ```typescript
  // Good
  return pipe(
    getCharacter(id),
    Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`))
  );
  
  // Avoid
  try {
    return await getCharacter(id);
  } catch (error) {
    console.error(error);
  }
  ```
- Prefer `unknown` over `any` for type safety
  ```typescript
  // Good
  const parseResponse = (data: unknown): Character => { /* ... */ }
  
  // Avoid
  const parseResponse = (data: any): Character => { /* ... */ }
  ```
- Use **Schema validation** for runtime type checking
  ```typescript
  const validatedData = pipe(
    Schema.decode(CharacterSchema)(responseData),
    Effect.getOrElse(() => defaultValue)
  );
  ```
- Use **pure functions** whenever possible
  ```typescript
  // Pure function (good)
  const formatName = (firstName: string, lastName: string) => `${firstName} ${lastName}`;
  
  // Impure function (avoid)
  let counter = 0;
  const incrementCounter = () => { counter++; return counter; };
  ```
- Leverage **function composition** with `pipe()` from Effect.ts
  ```typescript
  const result = pipe(
    getCharacter(123),
    Effect.map((response) => response.data),
    Effect.map(formatCharacterName)
  );
  ```
- Maintain **immutability** in all data structures
  ```typescript
  // Good
  const updatedUser = { ...user, name: "New Name" };
  
  // Avoid
  user.name = "New Name";
  ```
- Avoid classes and mutable state
- Use **higher-order functions** for code reuse
  ```typescript
  const withLogging = <T>(effect: Effect.Effect<T>) => 
    pipe(
      effect,
      Effect.tap((result) => Effect.logInfo(`Result: ${JSON.stringify(result)}`))
    );
  ```
- Prefer composition over inheritance

### Naming and Documentation

- Follow consistent naming: `get[Entities]`, `get[Entity]`, etc.
- Document all functions and interfaces with **JSDoc comments**
  ```typescript
  /**
   * Get a character by ID
   * @param id The character ID
   * @returns An Effect with the character data
   */
  export const getCharacter = (id: number) => {
    // ...
  };
  ```
- Use `.js` extension in imports (despite using TypeScript)
  ```typescript
  // Correct
  import { Character } from "../schemas/characters.js";
  
  // Incorrect
  import { Character } from "../schemas/characters";
  ```

## Architectural Improvements

We have implemented several architectural improvements to make the codebase more maintainable, reduce duplication, and improve type safety:

### A1: Generic Entity API Factory

The Generic Entity API Factory creates standard API operations (get, create, update, delete) for any entity type, reducing code duplication.

```typescript
// Instead of writing this for every entity:
export const getCharacters = () => get<PaginatedResponse<Character>>("characters");

// We can generate it:
const characterApi = createEntityApi<Character>("characters", CharacterSchema);
export const getCharacters = characterApi.getAll;
```

The factory:
- Reduces code duplication across entity types
- Standardizes our API interfaces
- Provides consistent error handling
- Supports schema validation
- Allows for customization of entity-specific behavior

### A2: Enhanced Type Safety with Schema Validation

Schema validation ensures that data received from the API matches the expected structure at runtime:

```typescript
// Validation with API calls
const getCharacterWithValidation = (characterId) => pipe(
  get(`characters/${characterId}`),
  Effect.flatMap(validateResponse(CharacterSchema)),
  Effect.tap((character) => Effect.logInfo(`Character: ${character.name}`)),
  Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
  Effect.provide(configFromEnv)
);
```

The validation system:
- Provides runtime validation of API requests and responses
- Offers detailed validation error messages
- Supports custom validation rules
- Includes caching for improved performance
- Enables strict or lenient validation modes

### A3: Resource-Based Organization

Resource-Based Organization groups related files by resource rather than by type:

Current structure:
```
src/Kanka/
  schemas/
    characters.ts
    locations.ts
  api/
    characters.ts
    locations.ts
  examples/
    characters.ts
    locations.ts
```

New structure:
```
src/Kanka/resources/
  characters/
    schema.ts
    api.ts
    examples.ts
  locations/
    schema.ts
    api.ts
    examples.ts
```

This organization:
- Organizes API endpoints by resource type
- Provides a consistent interface for all resources
- Supports middleware and error handling
- Includes pagination helpers
- Enables validation integration

### A4: Improved Error Handling

The error handling system provides comprehensive error handling utilities:

```typescript
// Create a retry handler
const retryHandler = createRetryHandler({ maxRetries: 3 });

// Create a timeout handler
const timeoutHandler = createTimeoutHandler(5000);

// Create a logging handler
const loggingHandler = createLoggingHandler({ logLevel: 'warn' });

// Create a fallback handler
const fallbackHandler = createFallbackHandler([]);

// Combine handlers
const errorHandler = createErrorHandler({
  retry: { maxRetries: 3 },
  timeout: 5000,
  logging: { logLevel: 'warn' },
  fallback: []
});

// Apply error handling to an API call
const result = await pipe(
  getCharacters(),
  errorHandler,
  Effect.provide(configFromEnv),
  Effect.runPromise
);
```

The error handling system:
- Provides comprehensive error handling utilities
- Supports retry logic with exponential backoff
- Includes timeout handling
- Offers logging capabilities
- Enables fallback strategies

## Schema Validation

Schema validation ensures that data received from the API matches the expected structure at runtime. This is important for several reasons:

1. **Type Safety**: Ensures runtime data matches compile-time types
2. **Error Detection**: Catches API changes or inconsistencies early
3. **Better Error Messages**: Provides detailed information about validation failures
4. **Documentation**: Schemas serve as documentation for data structures

### Basic Validation

```typescript
import { Effect, pipe } from "effect";
import { validateWithSchema } from "./api/validation.js";
import { CharacterSchema } from "./schemas/characters.js";

const validateData = (data) => pipe(
  validateWithSchema(CharacterSchema, data),
  Effect.tap((character) => Effect.logInfo(`Validated character: ${character.name}`)),
  Effect.catchAll((error) => Effect.logError(`Validation error: ${error.message}`))
);

Effect.runPromise(validateData(someData));
```

### Validation with API Calls

```typescript
import { Effect, pipe } from "effect";
import { get } from "./api/client.js";
import { validateResponse } from "./api/validation.js";
import { CharacterSchema } from "./schemas/characters.js";
import { configFromEnv } from "./config.js";

const getCharacterWithValidation = (characterId) => pipe(
  get(`characters/${characterId}`),
  Effect.flatMap(validateResponse(CharacterSchema)),
  Effect.tap((character) => Effect.logInfo(`Character: ${character.name}`)),
  Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
  Effect.provide(configFromEnv)
);

Effect.runPromise(getCharacterWithValidation(123));
```

### Request Validation

```typescript
import { Effect, pipe } from "effect";
import { post } from "./api/client.js";
import { validateRequest } from "./api/validation.js";
import { CreateCharacterParamsSchema } from "./schemas/characters.js";
import { configFromEnv } from "./config.js";

const createCharacterWithValidation = (params) => pipe(
  validateRequest(CreateCharacterParamsSchema)(params),
  Effect.flatMap((validatedParams) => post("characters", validatedParams)),
  Effect.catchAll((error) => Effect.logError(`Error: ${error.message}`)),
  Effect.provide(configFromEnv)
);

Effect.runPromise(createCharacterWithValidation({
  name: "Frodo",
  entry: "<p>The Ring Bearer</p>",
  title: "Ring Bearer",
  type: "PC"
}));
```

## Error Handling

- Use specific error types from `errors.ts`
  ```typescript
  if (response.status === 404) {
    return Effect.fail(new KankaEntityNotFoundError({
      message: `Character with ID ${id} not found`,
    }));
  }
  ```
- Catch and transform network/API errors appropriately
  ```typescript
  return pipe(
    getCharacter(id),
    Effect.catchAll((error) => {
      if (error instanceof KankaNetworkError) {
        return Effect.fail(new Error({
          message: `Network error: ${error.message}`,
          cause: error,
        }));
      }
      return Effect.fail(error);
    })
  );
  ```
- Provide meaningful error messages
- Use Effect.ts for composable error handling
- Add context to errors to make debugging easier

## Pagination Helpers

The pagination helpers simplify working with paginated responses:

```typescript
// Fetch all pages
const allCharacters = await pipe(
  fetchAllPages((page) => getCharacters({ page })),
  Effect.provide(configFromEnv),
  Effect.runPromise
);

// Stream all pages
const characterStream = streamAllPages((page) => getCharacters({ page }));

// Process items one by one
await pipe(
  characterStream,
  Stream.tap(character => Effect.logInfo(`Processing ${character.name}`)),
  Stream.runDrain,
  Effect.provide(configFromEnv),
  Effect.runPromise
);

// Fetch a range of pages
const charactersPage2to5 = await pipe(
  fetchPageRange((page) => getCharacters({ page }), 2, 5),
  Effect.provide(configFromEnv),
  Effect.runPromise
);

// Create a paginator
const paginator = createPaginator((page) => getCharacters({ page }));

// Navigate through pages
const firstPage = await pipe(
  paginator.first(),
  Effect.provide(configFromEnv),
  Effect.runPromise
);

const nextPage = await pipe(
  paginator.next(),
  Effect.provide(configFromEnv),
  Effect.runPromise
);
```

## Middleware Support

The middleware system enables request/response transformation:

```typescript
// Create a logging middleware
const loggingMiddleware = createLoggingMiddleware({
  logRequests: true,
  logResponses: true,
  logErrors: true
});

// Create a caching middleware
const cachingMiddleware = createCachingMiddleware({
  ttl: 60000 // 1 minute
});

// Combine middlewares
const combinedMiddleware = combineMiddlewares([
  loggingMiddleware,
  cachingMiddleware
]);

// Apply middleware to an API call
const result = await pipe(
  getCharacters(),
  combinedMiddleware,
  Effect.provide(configFromEnv),
  Effect.runPromise
);
```

## Testing

- Include examples for all API functions
- Test with real entity IDs when possible
- Verify error handling for invalid inputs
  ```typescript
  // Test error handling
  const invalidIdTest = pipe(
    getCharacter(-1),
    Effect.catchAll((error) => {
      expect(error).toBeInstanceOf(KankaValidationError);
      return Effect.succeed(true);
    })
  );
  ```
- Write unit tests for utility functions
- Create integration tests for API endpoints

## Team Collaboration

- When working on architectural improvements, review the questions for clarification in the IMPLEMENTATION_PLAN.md file
- Add your thoughts and feedback to the team discussion sections in the implementation plan
- Share your insights on potential edge cases or special requirements for different entity types
- Propose solutions to technical challenges identified in the implementation plan
- Regularly check for updates to the implementation plan as the project evolves

## Code Review Checklist

Before submitting your code for review, check that:

- [ ] The code follows functional programming principles
  - No mutable state or side effects
  - Uses pure functions
  - Uses function composition with pipe()
- [ ] Types are properly defined and used
  - No `any` types (use `unknown` instead)
  - Proper Schema validation
  - Consistent interface naming
- [ ] Error handling is comprehensive
  - All potential errors are caught and handled
  - Error messages are clear and helpful
  - Uses appropriate error types
- [ ] Functions are pure and side-effect free
  - No external state modification
  - Same input always produces same output
- [ ] Code is well-documented with JSDoc comments
  - All public functions have JSDoc comments
  - Parameters and return types are documented
  - Complex logic is explained
- [ ] Examples are included for new functionality
  - At least one example for each new function
  - Examples show typical usage patterns
- [ ] Code leverages existing utilities and patterns
  - Reuses common functions
  - Follows established patterns
  - Doesn't reinvent existing functionality

## Troubleshooting

### Common Validation Errors

#### Missing Required Fields

```
Validation error: Required field 'name' is missing
```

This means a required field is missing from the data. Check the schema to see which fields are required.

#### Invalid Type

```
Validation error: Field 'id' has invalid type: expected number, received string
```

This means a field has the wrong type. Check the schema to see the expected type.

#### Invalid Value

```
Validation error: Field 'type' has invalid value: must be one of ["NPC", "PC"]
```

This means a field has a value that doesn't match the constraints. Check the schema for constraints.

### Debugging Validation

To get more detailed validation errors, use the `formatDetails()` method:

```typescript
pipe(
  validateWithSchema(CharacterSchema, data),
  Effect.catchAll((error) => {
    if (error instanceof KankaSchemaValidationError) {
      console.error(`Validation error details: ${error.formatDetails()}`);
    }
    return Effect.fail(error);
  })
);
```

### Cache Issues

If you're experiencing issues with cached validation results, try clearing the cache:

```typescript
import { clearValidationCache } from "./api/validation.js";

clearValidationCache();
```

## Best Practices

### Schema Validation

1. **Always validate API responses**: This ensures the data matches your expectations and catches API changes early.

2. **Validate request parameters**: This prevents sending invalid data to the API.

3. **Use partial validation for updates**: When updating an entity, use partial validation to allow missing fields.

4. **Handle validation errors gracefully**: Provide helpful error messages to users.

5. **Use caching for performance**: Enable validation caching for frequently validated data.

6. **Consider disabling validation in production**: For performance-critical applications, consider disabling validation in production.

### Error Handling

1. **Use `Effect.catchAll` to handle errors**: This ensures all errors are caught and handled.

2. **Provide specific error messages**: This helps users understand what went wrong.

3. **Log errors for debugging**: This helps you diagnose issues.

4. **Consider recovery strategies**: For non-critical errors, consider recovering instead of failing.

### Performance

1. **Use caching for validation**: This improves performance for frequently validated data.

2. **Consider batch operations**: For large datasets, use batch operations instead of individual requests.

3. **Use pagination**: For large collections, use pagination to limit the amount of data transferred.

4. **Monitor cache performance**: Use `getValidationCacheStats()` to monitor cache performance.

### Code Organization

1. **Group related functionality**: Keep related code together.

2. **Use descriptive names**: Use clear, descriptive names for functions and variables.

3. **Document your code**: Add comments and JSDoc to explain complex logic.

4. **Write examples**: Provide examples for common use cases.

5. **Follow the functional programming style**: Use pure functions and immutability.

## Further Reading

- [Effect.ts Documentation](https://effect.website/)
- [Kanka API Documentation](https://kanka.io/en/docs/1.0)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Functional Programming in TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html)
