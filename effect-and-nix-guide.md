# Effect Usage in Kanka Project

This document provides an overview of how the Effect library is used in the Kanka project, with examples and explanations of common patterns.

## Table of Contents

- [Effect Usage in Kanka Project](#effect-usage-in-kanka-project)
  - [Core Pattern Overview](#core-pattern-overview)
  - [Schema-Based Request Modeling](#schema-based-request-modeling)
  - [Context Tags for Dependency Injection](#context-tags-for-dependency-injection)
  - [Layer Composition Patterns](#layer-composition-patterns)
  - [Effect Generators](#effect-generators)
  - [Error Handling](#error-handling)
  - [Configuration Management](#configuration-management)
- [Nix-Based Development Environment](#nix-based-development-environment)
  - [Understanding devenv.nix](#understanding-devenvnix)
  - [Using devenv.yaml](#using-devenvyaml)
  - [Leveraging flake.nix](#leveraging-flakenix)
  - [Adding Custom Dependencies](#adding-custom-dependencies)
  - [Deployment with flake.nix](#deployment-with-flakenix)

## Core Pattern Overview

The Kanka project leverages Effect to create a well-structured, type-safe, and testable architecture for API interactions. The core patterns include:

1. **Schema-based modeling** of requests and responses
2. **Context Tags** for dependency injection
3. **Layers** for composing services
4. **Effect generators** for handling async workflows
5. **Pipe** for functional composition

## Schema-Based Request Modeling

Effect provides Schema-based request modeling with the `Schema.TaggedRequest` pattern, as shown in `campaigns.ts`:

```typescript
export class CampaingListRequest extends Schema.TaggedRequest<CampaingListRequest>()("Campaigns", {
    failure: Schema.String,
    success: PaginatedResponseSchema(CampaignSchema),
    payload: { url: Schema.Literal("campaigns"), params: Schema.NullishOr(Schema.Any) }
}) { }

export class CampaignById extends Schema.TaggedRequest<CampaignById>()("CampaignById", {
    failure: Schema.String,
    success: Schema.Struct({ data: CampaignSchema }),
    payload: {
        id: EntityIdSchema
    }
}) { }
```

This approach:
- Clearly defines the success and failure types for each request
- Provides strong typing for request payloads
- Enables runtime validation
- Makes the API contract explicit

## Documentation-Driven Schema Development

The Kanka project follows a systematic approach to transform API documentation into strongly-typed Effect-based clients. This section explains how to go from API documentation to a fully functional Effect-based client.

### From API Documentation to Schema

The process begins with API documentation like `data/campaigns.md` that defines endpoints, request/response formats, and data models. For example, the Campaigns API documentation provides this response structure:

```json
{
    "data": {
        "id": 1,
        "name": "Thaelia",
        "locale": "fr",
        "entry": "\r\n<p>Aenean sit amet vehicula [character:133].</p>\r\n",
        "entry_parsed": "\r\n<p>Aenean sit amet vehicula <a href=\"...\">Lorem Ipsum</a>.</p>\r\n",
        "image": "{path}",
        "image_full": "{url}",
        "image_thumb": "{url}",
        "visibility": "public",
        "visibility_id": 2,
        "created_at": "2017-11-02T16:29:34.000000Z",
        "updated_at": "2020-05-23T22:00:02.000000Z",
        "members": [
            {
                "id": 1,
                "user": {
                    "id": 1,
                    "name": "Ilestis",
                    "avatar": "{url}"
                }
            }
        ],
        "setting": [],
        "ui_settings": [],
        "default_images": [],
        "css": "..."
    }
}
```

From this documentation, we create corresponding schemas in `types.ts`:

```typescript
export const CampaignSchema = Schema.Struct({
    ...TaggedEntitySchema.fields,
    locale: Schema.NullishOr(Schema.String),
    visibility: CampaignVisibilitySchema,
    visibility_id: Schema.Number,
    entry: Schema.NullishOr(Schema.String),
    entry_parsed: Schema.optional(Schema.String),
    // Other fields from the documentation...
})
```

### Workflow for Creating Schemas from Documentation

1. **Analyze API Documentation**:
   - Identify all data structures and their relationships
   - Note required vs. optional fields
   - Understand special formats (dates, enums, etc.)

2. **Create Base Schemas**:
   - Start with the smallest, most atomic types
   - Build composite schemas for complex structures
   - Use Schema combinators to handle optionality and nullability

3. **Define Request/Response Contracts**:
   - Create tagged requests for each API endpoint
   - Define success and failure types
   - Map request parameters to payload schemas

### Example: Creating the Campaign API Client

Taking the Campaigns API as an example:

1. **Define Data Types** (from `types.ts`):
   ```typescript
   // Create schemas for nested structures
   const CampaignMemberUserSchema = Schema.Struct({
       id: Schema.Number,
       name: Schema.String,
       avatar: Schema.NullishOr(Schema.String),
   });
   
   // Build the main schema
   export const CampaignSchema = Schema.Struct({
       ...TaggedEntitySchema.fields,
       locale: Schema.NullishOr(Schema.String),
       // Other fields...
   })
   ```

2. **Create Request Models** (from `campaigns.ts`):
   ```typescript
   export class CampaingListRequest extends Schema.TaggedRequest<CampaingListRequest>()("Campaigns", {
       failure: Schema.String,
       success: PaginatedResponseSchema(CampaignSchema),
       payload: { url: Schema.Literal("campaigns"), params: Schema.NullishOr(Schema.Any) }
   }) { }
   ```

3. **Implement Service Layer**:
   ```typescript
   export class CampgaignsApiService extends Context.Tag("CampaignsAPI")<
       CampgaignsApiService,
       { list: (req: CampaingListRequest) => Effect.Effect<CampaingList, string | ParseError> }
   >() { }
   
   export const CampaignsApiLive = Layer.effect(
       CampgaignsApiService,
       Effect.gen(function* () {
           const client = yield* ClientServices;
           return {
               list: (req: CampaingListRequest) => {
                   // Implementation...
               }
           }
       })
   )
   ```

### Benefits of Documentation-Driven Schema Development

- **Type Safety**: Full end-to-end type safety from API to client code
- **Validation**: Runtime validation of API responses against schemas
- **Discoverability**: Clear connection between documentation and implementation
- **Maintainability**: When the API changes, you update the schema in one place
- **Code Generation Potential**: This pattern could be automated with code generation

This approach ensures that your client implementation remains faithful to the API documentation, reducing the risk of integration errors and making changes easier to manage over time.

## Context Tags for Dependency Injection

The project uses Context Tags for dependency injection, providing a clean way to define services and their dependencies:

```typescript
// From campaigns.ts
export class CampgaignsApiService extends Context.Tag("CampaignsAPI")<
    CampgaignsApiService,
    { list: (req: CampaingListRequest) => Effect.Effect<CampaingList, string | ParseError> }
>() { }

// From client.ts
export class HttpService extends Context.Tag("HttpService")<
    HttpService,
    { fetch: typeof fetch }
>() { }

// From config.ts
export class KankaConfigTag extends Context.Tag("KankaConfig")<KankaConfigTag, KankaConfig>() { }
```

Benefits:
- Services are clearly defined with their interfaces
- Dependencies are explicit and testable
- Services can be mocked for testing
- Runtime errors are type-safe

## Layer Composition Patterns

Layers are used to compose services together and handle dependencies, as seen in these examples:

```typescript
// From campaigns.ts
export const CampaignsApiLive = Layer.effect(
    CampgaignsApiService,
    Effect.gen(function* () {
        const client = yield* ClientServices;
        return {
            list: (req: CampaingListRequest) => {
                const task = Effect.request(
                    req,
                    RequestResolver.fromEffect((_) => client.get(req.url, req.params))
                ).pipe(
                    Effect.tap(Effect.log)
                );
                return pipe(
                    task,
                    Effect.annotateLogs("campaigns", "c")
                );
            }
        }
    })
)

// From scratchpad.ts
const AppConfigLive = Layer.merge(HttpServiceLive, ConfigFromEnv)
const ApiLive = CampaignsApiLive.pipe(
    Layer.provideMerge(ClientServicesLive),
    Layer.provide(AppConfigLive),
)
```

Layer patterns used:
- `Layer.effect`: Create a layer from an effect
- `Layer.merge`: Combine layers horizontally
- `Layer.provide`: Provide a layer's services to another layer
- `Layer.provideMerge`: Provide and merge layers

## Effect Generators

The project uses generator functions with `Effect.gen` to handle async workflows in a synchronous-looking style:

```typescript
// From client.ts
const request = (path: string, options: RequestOptions) => Effect.gen(function* (_) {
    const urlBase = yield* Url.fromString(path, baseUrl);
    let url = urlBase;
    if (options.params) {
        url = Url.setUrlParams(urlBase, UrlParams.fromInput(options.params));
    }

    // Build request options
    const requestOptions: RequestInit = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
    };

    if (options.body) {
        requestOptions.body = JSON.stringify(options.body);
    }
    return yield* Effect.tryPromise({
        try: async () => await (await http.fetch(url, requestOptions)).json(),
        catch: Effect.fail,
    })
});

// From scratchpad.ts
const program = Effect.gen(function* () {
    const campaigns = yield* CampgaignsApiService; // =>
    return yield* campaigns.list(
        new CampaingListRequest({
            url: "campaigns",
            params: null,
        })
    );
});
```

Benefits:
- Sequential code style for async operations
- Error handling is built-in
- Dependencies are clearly expressed with `yield*`
- Type inference works well with this pattern

## Error Handling

Error handling is built into the Effect type system:

```typescript
// From client.ts
return yield* Effect.tryPromise({
    try: async () => await (await http.fetch(url, requestOptions)).json(),
    catch: Effect.fail,
})

// From config.ts
if (!apiKey) {
    yield* Effect.logWarning("No KANKA_API_KEY environment variable found");
}
```

Error handling approaches:
- Error types are defined in request schemas
- `Effect.tryPromise` for converting promise failures
- `Effect.fail` for explicit failure cases
- `Effect.logWarning` for non-fatal issues
- Error information is preserved in the Effect type

## Configuration Management

The project manages configuration using Effect:

```typescript
// From config.ts
export const getConfig = KankaConfigTag.pipe(Effect.map((config) => config));

export const ConfigFromEnv = Layer.effect(
    KankaConfigTag,
    Effect.gen(function* (_) {
        // Use environment variables if available
        const apiKey =
            typeof process !== "undefined"
                ? process.env.KANKA_API_KEY || DEFAULT_CONFIG.apiKey
                : DEFAULT_CONFIG.apiKey;

        const baseUrl =
            typeof process !== "undefined"
                ? process.env.KANKA_BASE_URL || DEFAULT_CONFIG.baseUrl
                : DEFAULT_CONFIG.baseUrl;

        if (!apiKey) {
            yield* Effect.logWarning("No KANKA_API_KEY environment variable found");
        }

        return {
            apiKey,
            baseUrl,
        };
    })
);
```

Configuration patterns:
- Environment-based configuration
- Default values
- Configuration layers
- Typed configuration interfaces
- Campaign-specific configuration

# Nix-Based Development Environment

This section explains how the project uses Nix-based tooling (`devenv.nix`, `devenv.yaml`, and `flake.nix`) for development environment management and deployment.

## Understanding devenv.nix

The `devenv.nix` file defines the development environment for the project:

```nix
{ pkgs, lib, config, inputs, ... }:

{
  # Environment variables
  env.GREET = "devenv";
  env.API_INFO_FILE = ".apiinfo";

  # Required packages
  packages = with pkgs; [ git jq bun biome just ];
  dotenv.enable = true;

  # Enable TypeScript support
  languages.typescript.enable = true;

  # Startup script
  scripts.startup.exec = ''
    just setup-env
    echo "\n\nREADY!\n\n"
  '';

  enterShell = ''
    startup
  '';

  # Test environment
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';
}
```

Key features:
- **Environment Variables**: Sets up environment variables needed for development
- **Package Dependencies**: Specifies required tools (git, jq, bun, biome, just)
- **Language Support**: Enables TypeScript support
- **Scripts**: Defines startup scripts executed when entering the environment
- **dotenv Support**: Enables loading of environment variables from .env files

Benefits:
- **Reproducible Environment**: Every developer gets the same exact environment
- **Declarative Configuration**: All dependencies and settings in one place
- **Simple Onboarding**: New developers can get started with a single command
- **Isolated Development**: Does not interfere with system-wide installations

## Using devenv.yaml

The `devenv.yaml` file configures inputs for the development environment:

```yaml
inputs:
  nixpkgs:
    url: github:cachix/devenv-nixpkgs/rolling

# If you're using non-OSS software, you can set allowUnfree to true.
# allowUnfree: true

# If you're willing to use a package that's vulnerable
# permittedInsecurePackages:
#  - "openssl-1.1.1w"

# If you have more than one devenv you can merge them
#imports:
# - ./backend
```

Key aspects:
- **Input Sources**: Specifies where to get Nix packages from
- **Policy Configuration**: Includes commented options for allowing unfree software or vulnerable packages
- **Importing Configurations**: Supports merging multiple environment configurations

Benefits:
- **Flexible Sources**: Can pull packages from specific channels or repositories
- **Policy Control**: Can configure policies for non-OSS or vulnerable packages
- **Modularity**: Supports breaking up configuration into smaller pieces

## Leveraging flake.nix

The `flake.nix` file defines project inputs, outputs, and development shells:

```nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
  };
  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = inputs.nixpkgs.lib.systems.flakeExposed;
      imports = [ inputs.process-compose-flake.flakeModule ];
      perSystem = { pkgs, ... }: {
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [ corepack nodejs_latest-slim bun ];
        };

        process-compose."default" = { config, ... }: {
          imports = [ inputs.services-flake.processComposeModules.default ];

          services.tempo.tempo.enable = true;
          services.grafana.grafana = {
            enable = true;
            http_port = 4000;
            extraConf = {
              "auth.anonymous" = {
                enabled = true;
                org_role = "Editor";
              };
            };
            datasources = with config.services.tempo.tempo; [{
              name = "Tempo";
              type = "tempo";
              access = "proxy";
              url = "http://${httpAddress}:${builtins.toString httpPort}";
            }];
          };
          services.redis.redis.enable = true;
          settings.processes.tsx = { command = "bun dev"; };
        };
      };
    };
}
```

Key components:
- **Inputs**: Declares dependencies on other flakes (nixpkgs, flake-parts, process-compose-flake, services-flake)
- **DevShells**: Defines development environments with specific tools
- **Process Composition**: Configures multiple services that work together (tempo, grafana, redis)
- **Development Commands**: Sets up commands for development (bun dev)

Benefits:
- **Composable Dependencies**: Can pull in other flakes as dependencies
- **Multi-service Setup**: Configures multiple interconnected services
- **Platform Independence**: Works across different systems automatically
- **Reproducible Builds**: Ensures consistent builds across environments

## Adding Custom Dependencies

You can add custom dependencies to your development environment by modifying the flake.nix file. Here are the key approaches:

### 1. Adding Packaged Dependencies

To add dependencies from the nixpkgs repository:

```nix
# In devenv.nix
packages = with pkgs; [
  git
  jq
  bun
  biome
  just
  # Add your package here
  nodejs
  postgresql
];

# Or in flake.nix
devShells.default = pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    corepack
    nodejs_latest-slim
    bun
    # Add your package here
    python3
    rustc
  ];
};
```

### 2. Adding Local Dependencies

For local projects or custom dependencies:

```nix
# In flake.nix
inputs = {
  nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  # Local dependency from a path
  my-lib = { url = "path:/path/to/my-lib"; flake = false; };
  # Or local dependency that is a flake
  my-flake = { url = "path:/path/to/my-flake"; };
};

# Then use it in your outputs
outputs = inputs@{ nixpkgs, my-lib, my-flake, ... }: {
  # ...
};
```

### 3. Creating Custom Packages

For dependencies not available in nixpkgs:

```nix
# In flake.nix
perSystem = { pkgs, system, ... }: {
  # Define a custom package
  packages.my-custom-package = pkgs.stdenv.mkDerivation {
    name = "my-custom-package";
    src = ./path/to/source;
    buildInputs = [ pkgs.nodejs ];
    # Build steps...
  };
  
  # Use the custom package in your shell
  devShells.default = pkgs.mkShell {
    nativeBuildInputs = with pkgs; [
      # Your normal dependencies
      nodejs
      # Your custom package
      self.packages.${system}.my-custom-package
    ];
  };
};
```

## Deployment with flake.nix

The flake.nix file can also be used for deployment strategies:

### Local Development Deployment

The current flake.nix sets up a local development environment with multiple services:

```nix
process-compose."default" = { config, ... }: {
  imports = [ inputs.services-flake.processComposeModules.default ];

  services.tempo.tempo.enable = true;
  services.grafana.grafana = {
    enable = true;
    http_port = 4000;
    # configuration...
  };
  services.redis.redis.enable = true;
  settings.processes.tsx = { command = "bun dev"; };
};
```

### Production Deployment Options

To extend for production deployment, you could add:

1. **NixOS Module**:
```nix
nixosModules.default = { pkgs, ... }: {
  systemd.services.kanka = {
    description = "Kanka service";
    wantedBy = [ "multi-user.target" ];
    after = [ "network.target" ];
    serviceConfig = {
      ExecStart = "${self.packages.${pkgs.system}.default}/bin/kanka";
      Restart = "always";
      User = "kanka";
    };
  };
};
```

2. **Container Image**:
```nix
packages.container = pkgs.dockerTools.buildImage {
  name = "kanka";
  tag = "latest";
  contents = [ self.packages.${pkgs.system}.default ];
  config = {
    Cmd = [ "/bin/kanka" ];
    ExposedPorts = { "8080/tcp" = {}; };
  };
};
```

3. **Deployment to NixOS**:
```nix
deploy.nodes.server = {
  hostname = "your-server";
  profiles.system = {
    path = deploy-rs.lib.${system}.activate.nixos self.nixosConfigurations.server;
  };
};
```

Benefits of flake.nix for deployment:
- **Consistency**: Same configuration used in development and production
- **Reproducibility**: Exact same dependencies in all environments
- **Isolation**: Dependencies don't interfere with system packages
- **Versioning**: Can pin specific versions of dependencies
- **Rollbacks**: Easy to roll back to previous configurations
