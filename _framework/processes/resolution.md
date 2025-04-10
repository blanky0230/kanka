# Error Resolution Protocol

This document outlines the standard process for handling errors and debugging issues in our codebase. Following these guidelines will help ensure consistent error handling and efficient debugging.

## Table of Contents

- [Error Handling Principles](#error-handling-principles)
- [Handling Effect.js Errors](#handling-effectjs-errors)
- [Debugging Process](#debugging-process)
- [Service-Not-Found Errors](#service-not-found-errors)

## Error Handling Principles

1. **Explicit Error Types**: Define specific error types for different failure scenarios to make error handling more precise.

2. **Effect-Based Error Handling**: Use Effect.js's error channel for handling errors in a type-safe way.

3. **Informative Error Messages**: Provide clear, actionable error messages that help diagnose the issue.

4. **Error Logging**: Log errors with appropriate context to aid in debugging.

5. **Graceful Degradation**: Implement fallback behavior where appropriate to ensure the system remains functional.

## Handling Effect.js Errors

When working with Effect.js, follow these guidelines for error handling:

```typescript
// Define explicit error types
class DatabaseConnectionError {
  readonly _tag = 'DatabaseConnectionError'
  constructor(readonly message: string, readonly cause?: Error) {}
}

// Use pipe to handle errors
return pipe(
  databaseOperation,
  Effect.catchTag('DatabaseConnectionError', (error) => {
    // Log the error
    console.error(`Database connection failed: ${error.message}`)
    // Return a fallback or retry
    return fallbackOperation
  })
)
```

## Debugging Process

Follow the Stepwise Verification principle when debugging issues:

1. **Isolate the Problem**: Determine where the issue is occurring by isolating components.

2. **Verify Inputs**: Check that inputs to the component are as expected.

3. **Inspect State**: Examine the state at various points in the execution path.

4. **Review Dependencies**: Ensure all dependencies are correctly provided and functioning.

5. **Test Incrementally**: Make small changes and test after each change.

## Service-Not-Found Errors

When encountering "Service not found" errors in Effect.js applications, follow this resolution process:

1. **Check Service Definition**: Ensure the service tag is correctly defined and imported.

2. **Review Layer Construction**: Verify that the service is properly provided in the Layer.

3. **Double-Provide Services**: In test environments, both provide the service via Layer and directly to the Effect:

   ```typescript
   // This two-step approach ensures the service is available
   // 1. Create a Layer with the service
   const mockServiceLayer = Layer.succeed(ServiceTag, mockService);
   
   // 2. Create a program that uses the service
   const program = pipe(
     Effect.gen(function* () {
       // Get the service via the Layer
       const service = yield* Effect.provide(
         ServiceTag,
         mockServiceLayer
       );
       
       // Use the service
       return yield* service.method();
     }),
     // ALSO directly provide the service to the Effect
     Effect.provideService(ServiceTag, mockService)
   );
   ```

4. **Check Service Implementation**: Ensure the service implementation matches the expected interface.

5. **Review Layer Merging Order**: When merging layers, ensure the correct precedence.

Remember that the key insight for solving "Service not found" errors in tests is to both provide the service through Layer construction AND directly to the Effect using `Effect.provideService()`.

## Conclusion

By following these error handling and debugging guidelines, we can create more robust applications and resolve issues more efficiently. The Stepwise Verification principle should be central to our approach to debugging and error resolution.
