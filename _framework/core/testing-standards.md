# Testing Standards

This document outlines the testing standards for our codebase, with a focus on specific patterns and techniques for different types of code constructs.

## Table of Contents

- [General Testing Principles](#general-testing-principles)
- [Testing Effect.js Services](#testing-effectjs-services)
  - [The Comprehensive Coverage Pattern](#the-comprehensive-coverage-pattern)
  - [Handling Dependency Injection in Tests](#handling-dependency-injection-in-tests)
- [Example Implementations](#example-implementations)

## General Testing Principles

1. **Complete Coverage**: Aim for 100% line coverage for business logic and API implementations.
2. **Behavioral Testing**: Focus on testing the expected behavior of code, not just its internal implementation.
3. **Isolated Components**: Test individual components in isolation when possible, using mocks for dependencies.
4. **Stepwise Verification**: Verify each step in multi-stage operations to ensure correct behavior.

## Testing Effect.js Services

### The Comprehensive Coverage Pattern

When testing services implemented with Effect.js that use dependency injection and Effect types, use the following approach:

1. **Test Request Objects** - Verify that request objects are correctly constructed with the expected properties.

2. **Test URL Construction** - If the service handles URL paths, test that paths are correctly constructed.

3. **Test Direct Implementation** - Create a test that directly executes the implementation code to ensure coverage:
   - Create mock client services that return appropriate Effect values
   - Provide these mocks to the service implementation through proper Layer and Effect.provideService
   - Execute all methods in the service to ensure complete coverage
   - Verify the mocks were called with the expected parameters

4. **Behavioral Testing** - In addition to direct implementation tests, include behavioral tests that verify the service behaves as expected:
   - Test with different parameters
   - Test error handling
   - Test edge cases

### Handling Dependency Injection in Tests

When testing code that uses Effect.js's dependency injection, follow these steps to ensure proper service resolution:

```typescript
// 1. Create mocks for all required services
const mockClient = {
  get: getMock,
  put: mockFn(),
  post: mockFn(),
  del: mockFn(),
  patch: patchMock
};

// 2. Create a Layer for the mock services
const mockClientLayer = Layer.succeed(ClientServices, mockClient);

// 3. Create a program that uses the Layer
const program = pipe(
  Effect.gen(function* () {
    // Get the service using the Layer
    const service = yield* Effect.provide(
      ServiceTag,
      Layer.merge(mockClientLayer, ServiceImplLayer)
    );
    
    // Call the methods on the service
    const result = yield* service.method(params);
    
    return result;
  }),
  // 4. CRITICAL: Also directly provide the service to the Effect
  // This ensures the service is available during execution
  Effect.provideService(ClientServices, mockClient)
);

// 5. Run the program and verify results
const result = await Effect.runPromise(program);
```

The critical insight is that both `Layer.merge()` and `Effect.provideService()` are needed to ensure proper service resolution during test execution.

## Example Implementations

Below is an example of a test for an Effect.js-based API client that achieves 100% coverage:

```typescript
describe("Direct Implementation", () => {
  it("API implementation - directly executes implementation code", async () => {
    // Setup mocks
    const getMock = mock((path, params) => Effect.succeed({/*...*/}));
    const patchMock = mock((path, data, params) => Effect.succeed({/*...*/}));
    
    const mockClient = {
      get: getMock,
      put: mock(() => Effect.succeed({})),
      post: mock(() => Effect.succeed({})),
      del: mock(() => Effect.succeed({})),
      patch: patchMock
    };
    
    // Create Layer with mock client
    const mockClientLayer = Layer.succeed(ClientServices, mockClient);
    
    // Create and execute program
    const program = pipe(
      Effect.gen(function* () {
        // Get service with mock client
        const api = yield* Effect.provide(
          ApiService,
          Layer.merge(mockClientLayer, ApiServiceImpl)
        );
        
        // Call all methods to ensure coverage
        const listResult = yield* api.list(new ListRequest({/*...*/}));
        const getByIdResult = yield* api.getById(new GetByIdRequest({/*...*/}));
        const updateResult = yield* api.update(new UpdateRequest({/*...*/}));
        
        return { listResult, getByIdResult, updateResult };
      }),
      // Critical: Also provide service directly
      Effect.provideService(ClientServices, mockClient)
    );
    
    // Run program and verify results
    const result = await Effect.runPromise(program);
    
    // Verify mock calls
    expect(getMock).toHaveBeenCalledWith("resources", null);
    expect(getMock).toHaveBeenCalledWith("resources/123", undefined);
    expect(patchMock).toHaveBeenCalledWith("resources/123", expect.objectContaining({
      id: 123,
      name: "Updated Resource"
    }), undefined);
    
    // Verify results
    expect(result).toBeDefined();
  });
});
```

This approach should be followed for all Effect.js-based services to ensure complete coverage and behavioral verification.
