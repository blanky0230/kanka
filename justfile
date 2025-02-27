set ignore-comments
set unstable

default: install-deps

install-deps:
    #!/usr/bin/env bash
    bun i

format:
    #!/usr/bin/env bash
    biome check --organize-imports-enabled=true --write ./ 

format-unsafe:
    #!/usr/bin/env bash
    biome check --write --unsafe

lint:
    #!/usr/bin/env bash
    biome ci ./

setup-env: install-deps
    #!/usr/bin/env bun

    import { FileSystem, Terminal } from "@effect/platform";
    import { Effect } from "effect";
    import { NodeContext, NodeRuntime } from "@effect/platform-node"

    const populateDotEnvProgram = Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const exists = yield* fs.exists(".env");
        const terminal = yield* Terminal.Terminal;
        if (exists) {
            return yield* terminal.display(
                "WARNING: .env file already exists. Skipping interactive setup."
            );
        }
        const readFile = yield* fs.readFileString(".env.example");
        const requiredLines = readFile.split("\n").filter((l) => l.startsWith("# REQUIRED"));
        const requiredItems = requiredLines
            .map((l) => l.split(" ").filter((i) => i.includes("=")))
            .flat(1)
            .map((l) => l.substring(0, l.indexOf("=")));
        const resultLines = [];
        for (const envVar of requiredItems) {
            yield* terminal.display(`Provide value for: '${envVar}'\n`);
            const envVarVal = yield* terminal.readLine;
            const line = `${envVar}=${envVarVal}`;
            resultLines.push(line);
        }
        yield* fs.writeFileString(".env", resultLines.join("\n"));
    
        return yield* terminal.display(".env file populated!");
    });
    NodeRuntime.runMain(populateDotEnvProgram.pipe(Effect.provide(NodeContext.layer)));
