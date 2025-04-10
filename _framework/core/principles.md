# Framework Principles

This document outlines the core principles of the Prompt Files Collaboration Framework for the Kanka API Client. These principles guide all development, documentation, and decision-making in the project.

## Principle Hierarchy

The principles are listed in order of precedence. When principles conflict, the higher-ranked principle takes precedence:

1. **STAKEHOLDER_PRIORITY**
2. **CONFIGURATION_PROXIMITY**
3. **CONTEXT_DISCOVERY**
4. **STEPWISE_VERIFICATION**

## STAKEHOLDER_PRIORITY

The needs and priorities of stakeholders drive development decisions.

### Definition

Stakeholder Priority means that development efforts should be aligned with the needs and priorities of the project's stakeholders. Features and improvements are prioritized based on stakeholder value.

### Application

- Development prioritizes features that deliver the most value to the identified stakeholders
- API design decisions consider the needs of both implementers and consumers
- Documentation is tailored to the specific needs of different stakeholders
- User experience is designed with the end user's requirements as the primary focus

### Examples

- Implementing frequently requested API endpoints before less-demanded ones
- Simplifying API interfaces to reduce cognitive load for consumers
- Providing detailed implementation notes for the Dev Team
- Creating clear usage examples for End Users

## CONFIGURATION_PROXIMITY

Configuration should be kept close to where it's used.

### Definition

Configuration Proximity means that configuration and settings should be located as close as possible to the code that uses them. This reduces cognitive load and makes code more maintainable.

### Application

- Configuration is stored near the components that use it
- API endpoints keep their validation rules, request transformations, and response formatting together
- Unit tests are placed alongside the code they test
- Documentation for components is stored with or near the component definition

### Examples

- Storing endpoint-specific configuration in the same file or module as the endpoint handler
- Keeping validation schemas in the same directory as the types they validate
- Maintaining test files alongside the corresponding implementation files

## CONTEXT_DISCOVERY

Ensure that context and intent are discoverable without extensive external documentation.

### Definition

Context Discovery means that developers should be able to understand the purpose, usage, and context of code without extensive external documentation. Code should be self-documenting, and necessary context should be easily discoverable.

### Application

- Code includes clear comments explaining "why" not just "what"
- File and function naming clearly indicates purpose
- Code organization follows intuitive patterns
- Type annotations provide clear expectations for inputs and outputs

### Examples

- Using descriptive variable and function names
- Including summary comments at the top of files explaining their purpose
- Using TypeScript interfaces to document expected data structures
- Adding examples in comments for complex logic

## STEPWISE_VERIFICATION

Complex operations should be verified step by step.

### Definition

Stepwise Verification means that complex operations should be broken down into discrete steps that can be individually verified. This makes debugging easier and improves code quality.

### Application

- Complex operations are broken into discrete, testable steps
- Each step has clear inputs and outputs
- Error handling is implemented at each step
- Tests verify each step individually and in combination

### Examples

- Breaking API requests into validation, processing, and response formatting steps
- Unit testing each step in isolation
- Implementing clear error messages for each potential failure point
- Using Effect.js for explicit error handling at each stage

## Applying Multiple Principles

Most implementations should incorporate multiple principles. Here are examples of how these principles can be applied together:

### API Development Example

1. **STAKEHOLDER_PRIORITY**: Implement the API endpoint most requested by End Users
2. **CONFIGURATION_PROXIMITY**: Keep endpoint configuration, validation, and handling in the same module
3. **CONTEXT_DISCOVERY**: Use descriptive names and include comments explaining the endpoint's purpose and usage
4. **STEPWISE_VERIFICATION**: Break the request handling into validation, processing, and response steps with tests for each

### Documentation Example

1. **STAKEHOLDER_PRIORITY**: Create separate documentation for Dev Team and End Users
2. **CONFIGURATION_PROXIMITY**: Store API documentation alongside the implementation
3. **CONTEXT_DISCOVERY**: Include code examples and clear explanations
4. **STEPWISE_VERIFICATION**: Structure documentation to follow the same steps as the implementation

## Conclusion

These principles form the foundation of our development approach for the Kanka API Client. All code, documentation, and decisions should align with these principles, with higher-ranked principles taking precedence when conflicts arise.
