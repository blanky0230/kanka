# Kanka API Client

A fully featured API client and CLI for the [Kanka](https://kanka.io) API using Effect.ts.

## Features

- **Interactive CLI**: Terminal-based user interface for managing your Kanka campaigns
- **Type-safe**: Full TypeScript support with proper types for all API operations
- **Error Handling**: Comprehensive error handling using Effect.js
- **Testability**: Easy to test with Effect.js's testing utilities
- **Configurability**: Flexible configuration options

## Getting Started

You can set up your environment variables in two ways:

1. **Interactive Setup**: Run the following command to interactively set up your environment variables:
   ```
   just setup-env
   ```
   This will guide you through setting up all required and optional environment variables.

2. **Manual Setup**: Create a `.env` file in the root of the repository based on the `.env.example` file.

## CLI Usage

The Kanka CLI provides a convenient terminal interface for interacting with your Kanka campaigns.

### Prerequisites

- Node.js 18+ or Bun runtime
- A Kanka account with API access
- An API token from Kanka

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

### Running the CLI

To run the CLI application:

```
bun kanka
```

This will launch the main menu where you can select from available commands.

Available commands:

- `bun kanka campaigns` - List and interact with campaigns
- `bun kanka config` - Configure API settings

### CLI Features

- **Campaign Management**:
  - List and select campaigns
  - View campaign details and settings
  - Access campaign URLs

- **Entity Management**:
  - Browse entities by type or view all entities
  - Create new entities of any supported type
  - Edit existing entities (name, description, image URL, privacy settings)
  - Delete entities with confirmation

- **Member Management**:
  - View campaign members and their roles

## Project Structure

The Kanka API client and CLI are organized as follows:

- `src/Kanka/api/`: API client implementation
  - `client.ts`: Core HTTP client
  - `campaigns/`: Campaign-related API functions
  - `entities/`: Entity-related API functions
- `src/Kanka/cli/`: CLI implementation
  - `index.ts`: Main entry point
  - `components/`: UI components for different views
  - `services/`: Business logic for CLI operations

## Environment Variables

The following environment variables are used:

- `KANKA_API_KEY`: Your Kanka API key (required)
- `KANKA_BASE_URL`: The base URL for the Kanka API (defaults to `https://app.kanka.io/api/1.0`)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on contributing to this project.
