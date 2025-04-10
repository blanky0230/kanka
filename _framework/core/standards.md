# Framework Standards

This document outlines the core standards for our codebase. All developers should follow these standards when implementing new features or modifying existing code.

## Table of Contents

- [General Principles](#general-principles)
- [Code Organization](#code-organization)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Documentation](#documentation)

## General Principles

1. **Context Discovery**: Always explore the existing context before making changes. This includes understanding the current codebase structure, patterns in use, and existing implementations.

2. **Configuration Proximity**: Keep configuration close to where it's used. This makes code more maintainable and easier to understand.

3. **Stepwise Verification**: Verify each step in multi-stage operations to ensure correct behavior and make debugging easier.

4. **Stakeholder Priority**: Prioritize changes based on stakeholder needs and business value.

## Code Organization

1. **File Size**: No file shall be larger than ~500 lines, regardless of whether it's source code, markdown, or any other text format. If a file would exceed this limit, split it into logical components.

2. **Module Structure**: Organize code into well-defined modules with clear responsibilities.

3. **Naming Conventions**:
   - Use descriptive, meaningful names
   - Follow language-specific conventions (camelCase for JavaScript/TypeScript, snake_case for Python, etc.)
   - Prefix interfaces with "I" in TypeScript

4. **Code Header**: Include a standard header in all code files:
   ```typescript
   /**
    * [filename]
    * [description]
    * Created: [date]
    * Framework principles applied: [principles]
    */
   ```

## Testing

Refer to [testing-standards.md](./testing-standards.md) for comprehensive testing guidelines.

Key testing principles:

1. **Complete Coverage**: Aim for high test coverage, especially for business logic.
2. **Behavioral Testing**: Test the behavior of code, not its implementation details.
3. **Isolated Testing**: Test components in isolation when possible.
4. **Effect.js Testing**: When testing Effect.js services, follow the Comprehensive Coverage Pattern.

## Error Handling

Refer to [resolution.md](../processes/resolution.md) for detailed error handling processes.

1. **Explicit Error Types**: Define explicit error types for different failure scenarios.
2. **Graceful Recovery**: Implement graceful recovery mechanisms where appropriate.
3. **Informative Error Messages**: Provide clear and informative error messages.

## Documentation

1. **Code Comments**: Comment code with the "why", not the "what".
2. **API Documentation**: Document all public APIs with examples.
3. **Architecture Documentation**: Maintain up-to-date architectural documentation.
4. **The 4 C's**: Documentation should be:
   - Concise: Avoid unnecessary words
   - Correct: Accurate and up-to-date
   - Consistent: Use consistent terminology
   - Clear: Easy to understand
