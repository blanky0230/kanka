# Getting Started with the Kanka API Client Framework

This guide will help you get started with the Prompt Files Collaboration Framework for the Kanka API Client project.

## Table of Contents

- [Introduction](#introduction)
- [Framework Structure](#framework-structure)
- [Development Workflow](#development-workflow)
- [Using Framework Commands](#using-framework-commands)
- [Testing Effect.js Services](#testing-effectjs-services)
- [Framework Principles](#framework-principles)

## Introduction

The Prompt Files Collaboration Framework provides a structured approach to developing the Kanka API Client. It ensures consistent code quality, maintainability, and adherence to best practices across the project.

The framework is implemented at the **Comprehensive** level, which includes:
- Detailed documentation
- Standardized processes
- Custom commands
- Code templates
- Semantic search capabilities

## Framework Structure

The framework consists of:

```
.clinerules                           # Entry point and configuration
_framework/
  ├── core/
  │   ├── principles.md               # Core principles and their application
  │   ├── standards.md                # Code and documentation standards
  │   └── testing-standards.md        # Detailed testing guidelines
  ├── commands/
  │   └── commands.md                 # Documentation of all framework commands
  ├── processes/
  │   └── resolution.md               # Error resolution protocols
  └── templates/
      ├── effect-service.ts.template  # Template for Effect.js services
      └── effect-test.ts.template     # Template for testing Effect.js services
```

## Development Workflow

### 1. Start with Discovery

Before implementing new features, use the `<DISCOVER>` command to find relevant patterns and standards:

```
<DISCOVER>testing</DISCOVER>
```

This helps you understand existing patterns and approaches before writing new code.

### 2. Create New Files Using Templates

When creating new Effect.js services, start with the templates:

1. Copy the template:
   ```bash
   cp _framework/templates/effect-service.ts.template src/Kanka/api/your-module/your-service.ts
   ```

2. Modify the template to match your specific service requirements.

3. Create corresponding test files:
   ```bash
   cp _framework/templates/effect-test.ts.template src/Kanka/api/your-module/your-service.test.ts
   ```

### 3. Follow the Git Workflow

```bash
# Get latest architecture changes
git checkout architecture/feature-name

# Create feature branch
git checkout -b feature/your-feature-name

# Make incremental commits
git commit -m "[FEAT] Add new functionality" --no-gpg-sign
git commit -m "[REFACTOR] Improve code structure" --no-gpg-sign
git commit -m "[FIX] Fix edge case" --no-gpg-sign

# Before submitting for review, rebase
git rebase architecture/feature-name --no-gpg-sign

# Push to origin
git push origin feature/your-feature-name
```

## Using Framework Commands

The framework provides several commands to assist development. See [commands.md](./_framework/commands/commands.md) for full documentation.

### Key Commands

- `<DISCOVER>term</DISCOVER>`: Search for terms in framework documentation
- `<AUDIT />`: Analyze code for adherence to standards
- `<TEST>module_name</TEST>`: Run tests for a specific module
- `<COVERAGE />`: Generate a coverage report

Example:
```
<DISCOVER>dependency injection</DISCOVER>
```

## Testing Effect.js Services

Testing Effect.js services requires special consideration. Follow the approach documented in [testing-standards.md](./_framework/core/testing-standards.md).

### Key Testing Concepts

1. **Dual Dependency Provision**: Services must be provided both through layers and directly to effects:

```typescript
const program = pipe(
  Effect.gen(function* () {
    // First, get the service using the Layer approach
    const service = yield* Effect.provide(
      YourService,
      Layer.merge(mockDependenciesLayer, YourServiceLive)
    );
    
    // Use the service
    return yield* service.method(request);
  }),
  // CRITICAL: Also directly provide the dependency service
  Effect.provideService(DependencyService, mockDependency)
);
```

2. **Complete Method Coverage**: Test all methods in a service to ensure 100% line coverage.

3. **Behavioral Testing**: Test both implementation and behavior to ensure correctness.

## Framework Principles

The framework is guided by four core principles in order of precedence:

1. **STAKEHOLDER_PRIORITY**: Development driven by stakeholder needs
   - Prioritize features that deliver value to stakeholders
   - Design APIs with the end user experience in mind

2. **CONFIGURATION_PROXIMITY**: Keep configuration close to its usage
   - Store configuration near the components that use it
   - Keep related code together

3. **CONTEXT_DISCOVERY**: Make context easily discoverable
   - Use descriptive names and comments
   - Make code self-documenting

4. **STEPWISE_VERIFICATION**: Verify complex operations step-by-step
   - Break down complex operations into discrete steps
   - Test each step individually

For detailed descriptions of these principles, see [principles.md](./_framework/core/principles.md).

## Next Steps

To get started:

1. Explore the framework documentation:
   - Read [standards.md](./_framework/core/standards.md) for code standards
   - Review [testing-standards.md](./_framework/core/testing-standards.md) for testing guidelines
   - Understand [principles.md](./_framework/core/principles.md) for guiding principles

2. Try the discovery command to find relevant information:
   ```
   <DISCOVER>testing</DISCOVER>
   ```

3. Use the templates when creating new services:
   - `_framework/templates/effect-service.ts.template`
   - `_framework/templates/effect-test.ts.template`

4. Follow the error resolution process in [resolution.md](./_framework/processes/resolution.md) when debugging

5. Refer to [commands.md](./_framework/commands/commands.md) for available commands

The Kanka API Client project now has a complete foundation for consistent, high-quality development based on established patterns and principles.
