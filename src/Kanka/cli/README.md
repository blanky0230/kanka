# Kanka Terminal UI

A terminal-based user interface for interacting with Kanka campaigns and resources.

## Overview

This Terminal UI provides a convenient way to access and manage your Kanka campaigns directly from the command line. It uses the Kanka API client library to communicate with the Kanka platform and provides an intuitive interface for navigating through campaigns and their entities.

## Features

- List and select from available campaigns
- View campaign details
- Navigate campaign entities (characters, locations, etc.)
- Create, edit, and delete entities of all types
- View campaign members
- Access campaign settings
- Direct links to web UI when needed

## Architecture

The Terminal UI follows the same architecture principles as the main Kanka API client:

- Effect.js for functional programming and effect handling
- Clean separation of concerns with well-defined components
- Type safety across all interactions

Components are organized as follows:

- `cli/index.ts`: Main entry point and command registration
- `cli/main.ts`: Application bootstrap
- `cli/components/`: UI components for different views
- `cli/services/`: Business logic for CLI operations
- `cli/utils/`: Helper utilities for the CLI

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Kanka account with API access
- An API token from Kanka

### Installation

The CLI is included in the main package. No separate installation is needed.

### Configuration

Create a `.env` file in the project root with the following variables:

```
KANKA_API_KEY=your_api_key_here
KANKA_BASE_URL=https://app.kanka.io/api/1.0
```

Alternatively, you can use the `config` command to set these values:

```
bun kanka config
```

### Usage

To run the CLI application:

```
bun kanka
```

This will launch the main menu where you can select from available commands.

Available commands:

- `bun kanka campaigns` - List and interact with campaigns
- `bun kanka config` - Configure API settings

## Development

### Adding new commands

1. Create a new component in `cli/components/`
2. Add the command to `cli/index.ts`
3. Implement the required functionality

### Testing

CLI components can be tested by mocking API responses and validating UI flows.

## Future Enhancements

- Batch operations
- Export/import functionality
- Interactive maps
- Timeline visualization

## Contributing

Follow the same contribution guidelines as the main Kanka API client project. All CLI-related code should be in the `src/Kanka/cli` directory.
