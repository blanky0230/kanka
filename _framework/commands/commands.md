# Framework Commands

This document outlines the commands available in the Prompt Files Collaboration Framework for the Kanka API Client.

## Table of Contents

- [Discovery Commands](#discovery-commands)
- [Development Commands](#development-commands)
- [Testing Commands](#testing-commands)
- [Documentation Commands](#documentation-commands)

## Discovery Commands

These commands help you discover information and patterns in the codebase.

### `<DISCOVER>`

The primary discovery command searches for terms across framework documentation files.

**Usage:**
```bash
<DISCOVER>search_term</DISCOVER>
```

**Example:**
```bash
<DISCOVER>Effect.js</DISCOVER>
```

This will search for "Effect.js" across all markdown files in the framework directory.

## Development Commands

Commands to assist in the development workflow.

### `<AUDIT>`

Performs an audit of code to ensure compliance with framework standards.

**Usage:**
```bash
<AUDIT />
```

This command analyzes the codebase for adherence to established patterns and principles.

## Testing Commands

Commands for testing code and ensuring quality.

### `<TEST>`

Runs tests for specified modules or the entire project.

**Usage:**
```bash
<TEST>module_name</TEST>
```

**Example:**
```bash
<TEST>campaigns</TEST>
```

### `<COVERAGE>`

Analyzes test coverage for the codebase.

**Usage:**
```bash
<COVERAGE />
```

## Documentation Commands

Commands to help with documentation management.

### `<DOC_ADD>`

Adds documentation for a new feature or component.

**Usage:**
```bash
<DOC_ADD>
<component>Component name</component>
<description>Description of the component</description>
</DOC_ADD>
```

### `<DOC_UPDATE>`

Updates existing documentation.

**Usage:**
```bash
<DOC_UPDATE>
<file>File path</file>
<section>Section to update</section>
<content>New content</content>
</DOC_UPDATE>
```

## Advanced Commands

These commands provide more sophisticated functionality.

### `<PRINCIPLE_CHECK>`

Verifies adherence to framework principles for a given implementation.

**Usage:**
```bash
<PRINCIPLE_CHECK>
<file>path/to/file.ts</file>
<principle>PRINCIPLE_NAME</principle>
</PRINCIPLE_CHECK>
```

**Example:**
```bash
<PRINCIPLE_CHECK>
<file>src/Kanka/api/campaigns/campaigns.ts</file>
<principle>CONTEXT_DISCOVERY</principle>
</PRINCIPLE_CHECK>
```

## Integration Commands

Commands to help with integrations and external services.

### `<API_DOC>`

Generates API documentation from code.

**Usage:**
```bash
<API_DOC>
<module>Module name</module>
<format>Format (md/html)</format>
</API_DOC>
```

**Example:**
```bash
<API_DOC>
<module>campaigns</module>
<format>md</format>
</API_DOC>
