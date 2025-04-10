# Kanka API & CLI Components

This directory contains the core components of the Kanka API client and CLI application.

## Structure

- **api/**: Core API client implementation
  - `client.ts`: Base HTTP client with authentication and error handling
  - `campaigns/`: Campaign-related API endpoints
  - `entities/`: Entity-related API endpoints (characters, locations, etc.)
- **cli/**: Command-line interface components
  - `components/`: UI components for different views
  - `services/`: Business logic for CLI operations
  - `utils/`: Helper utilities
- **schemas/**: TypeScript type definitions and schemas

## API Client Usage

While the CLI is the recommended way to interact with Kanka, the API client can also be used directly for custom applications or scripts.

### Configuration

```typescript
import { Effect } from "effect";
import { makeConfig } from "./config";

// Create a configuration layer
const configLayer = makeConfig({
  apiKey: "your-api-key",
  baseUrl: "https://app.kanka.io/api/1.0"
});

// Use environment variables
import { configFromEnv } from "./config";
```

### Basic Example

```typescript
import { Effect } from "effect";
import { configFromEnv } from "./config";
import { EntitiesApiService } from "./api/entities/entities";
import { EntityListRequest, EntityCreateRequest } from "./api/entities/entities";
import { mkEntityId } from "./schemas/common";

// List entities in a campaign
const listEntities = Effect.gen(function* (_) {
  const entitiesApi = yield* EntitiesApiService;
  
  const request = new EntityListRequest({
    campaignId: mkEntityId(123), // Replace with actual campaign ID
    params: null
  });
  
  const response = yield* entitiesApi.list(request);
  return response;
});

// Run the program
Effect.runPromise(
  listEntities.pipe(
    Effect.provide(configFromEnv)
  )
);
```

### Error Handling

```typescript
import { Effect } from "effect";

const program = listEntities.pipe(
  Effect.catchAll(error => {
    console.error("Error:", error);
    return Effect.fail(error);
  }),
  Effect.provide(configFromEnv)
);

Effect.runPromise(program);
```

## Entity Operations

The API client now supports full CRUD operations for all entity types:

- **List entities**: Get all entities or filter by type
- **Create entities**: Create new entities of unknown supported type
- **Update entities**: Modify existing entities
- **Delete entities**: Remove entities from campaigns

## CLI Usage

For most users, the CLI interface is the recommended way to interact with Kanka. See the [CLI README](./cli/README.md) for details on using the command-line interface.

To run the CLI:

```bash
bun kanka
```

## API Reference

The API client implements the following operations:

### Campaigns
- List, get, create, update, and delete campaigns
- Manage campaign members
- Campaign settings management

### Entities
- List all entities
- Filter entities by type
- Create entities
- Update entity details
- Delete entities

See the corresponding API modules for detailed method signatures and parameters.
