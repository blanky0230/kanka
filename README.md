# Kanka API Client

A fully featured API client for the [Kanka](https://kanka.io) API using Effect.ts.

## Features

- **Type-safe**: Full TypeScript support with proper types for all API responses
- **Error Handling**: Comprehensive error handling using Effect.js
- **Testability**: Easy to test with Effect.js's testing utilities
- **Configurability**: Flexible configuration options
- **Resource Mapping**: Map all API resources to proper TypeScript interfaces

## Getting Started

You can set up your environment variables in two ways:

1. **Interactive Setup**: Run the following command to interactively set up your environment variables:
   ```
   just setup-env
   ```
   This will guide you through setting up all required and optional environment variables.

2. **Manual Setup**: Create a `.env` file in the root of the repository based on the `.env.example` file.

## Configuration

The client can be configured in several ways:

### Using explicit configuration

```typescript
import { Effect } from "effect";
import { makeConfig, getCampaigns } from "./Kanka";

const program = Effect.gen(function* (_) {
  const campaigns = yield* getCampaigns();
  console.log(`Found ${campaigns.data.length} campaigns`);
});

Effect.runPromise(
  program.pipe(
    Effect.provide(
      makeConfig({ apiKey: "your-api-key" })
    )
  )
);
```

### Using environment variables

```typescript
import { Effect } from "effect";
import { configFromEnv, getCampaigns } from "./Kanka";

const program = Effect.gen(function* (_) {
  const campaigns = yield* getCampaigns();
  console.log(`Found ${campaigns.data.length} campaigns`);
});

Effect.runPromise(
  program.pipe(
    Effect.provide(configFromEnv)
  )
);
```

The following environment variables are used:

- `KANKA_API_KEY`: Your Kanka API key (required)
- `KANKA_BASE_URL`: The base URL for the Kanka API (defaults to `https://app.kanka.io/api/1.0`)

## Basic Usage

### Campaigns

```typescript
import { Effect } from "effect";
import { makeConfig, getCampaigns, getCampaign, createCampaign } from "./Kanka";

// Get all campaigns
const getAllCampaigns = Effect.gen(function* (_) {
  const campaigns = yield* getCampaigns();
  console.log(`Found ${campaigns.data.length} campaigns`);
  return campaigns;
});

// Get a specific campaign
const getSpecificCampaign = Effect.gen(function* (_) {
  const campaign = yield* getCampaign(123); // Replace with a real campaign ID
  console.log(`Campaign: ${campaign.data.name}`);
  return campaign;
});

// Create a new campaign
const createNewCampaign = Effect.gen(function* (_) {
  const campaign = yield* createCampaign({
    name: "My New Campaign",
    entry: "This is a test campaign created with the Kanka API client",
    locale: "en",
    visibility: "private",
  });
  console.log(`Created campaign: ${campaign.data.name}`);
  return campaign;
});

// Run with configuration
Effect.runPromise(
  getAllCampaigns.pipe(
    Effect.provide(
      makeConfig({ apiKey: "your-api-key" })
    )
  )
);
```

## Error Handling

```typescript
import { Effect } from "effect";
import { makeConfig, getCampaigns } from "./Kanka";
import { KankaError, KankaApiError, KankaAuthenticationError } from "./Kanka";

const program = Effect.gen(function* (_) {
  const campaigns = yield* getCampaigns();
  console.log(`Found ${campaigns.data.length} campaigns`);
  return campaigns;
});

Effect.runPromise(
  program.pipe(
    Effect.catchTag("KankaAuthenticationError", (error) => {
      console.error("Authentication failed:", error.message);
      return Effect.fail(error);
    }),
    Effect.catchTag("KankaApiError", (error) => {
      console.error("API error:", error.message);
      return Effect.fail(error);
    }),
    Effect.catchAll((error) => {
      console.error("Unknown error:", error);
      return Effect.fail(error);
    }),
    Effect.provide(
      makeConfig({ apiKey: "your-api-key" })
    )
  )
);
```

## API Reference

### Configuration

- `makeConfig(config)`: Create a configuration layer with the provided config
- `configFromEnv`: Create a configuration layer from environment variables

### Campaigns

- `getCampaigns(params?)`: Get all campaigns
- `getCampaign(id)`: Get a campaign by ID
- `createCampaign(params)`: Create a new campaign
- `updateCampaign(id, params)`: Update a campaign
- `deleteCampaign(id)`: Delete a campaign
- `getCampaignMembers(campaignId, params?)`: Get campaign members
- `getCampaignMember(campaignId, userId)`: Get a campaign member
- `addCampaignMember(campaignId, params)`: Add a member to a campaign
- `updateCampaignMember(campaignId, userId, params)`: Update a campaign member
- `removeCampaignMember(campaignId, userId)`: Remove a member from a campaign
- `followCampaign(campaignId)`: Follow a campaign
- `unfollowCampaign(campaignId)`: Unfollow a campaign
- `boostCampaign(campaignId)`: Boost a campaign
- `unboostCampaign(campaignId)`: Unboost a campaign

## Examples

For more detailed usage examples, see the `examples.ts` file in the `src/Kanka` directory. This file contains ready-to-use examples for common operations with the Kanka API client.

## Project Structure

The Kanka API client is organized as follows:

- `src/Kanka/config.ts`: Configuration management
- `src/Kanka/errors.ts`: Error types and handling
- `src/Kanka/examples.ts`: Usage examples
- `src/Kanka/api/`: API client implementation
  - `client.ts`: Core HTTP client
  - `campaigns.ts`: Campaign-related API functions
- `src/Kanka/schemas/`: TypeScript interfaces and schemas
  - `common.ts`: Common types and interfaces
  - `campaigns.ts`: Campaign-related types and interfaces
