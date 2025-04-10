/**
 * main.ts
 * Entry point for Kanka Terminal UI CLI application
 * Created: 2025-04-10
 * Framework principles applied: STAKEHOLDER_PRIORITY, CONFIGURATION_PROXIMITY
 */

import { Effect, Console } from 'effect';
import { runCli } from './index.js';

// Display banner
const displayBanner = (): void => {
    console.log('\n');
    console.log('='.repeat(50));
    console.log('  KANKA CLI - Terminal UI for Kanka Campaign Management');
    console.log('='.repeat(50));
    console.log('\n');
};

// Run the application
const runApp = Effect.gen(function* (_) {
    // Display welcome banner
    displayBanner();

    // Start the CLI
    runCli();
});

// Execute the application
Effect.runPromise(runApp).catch(error => {
    console.error('Failed to start Kanka CLI', error);
    process.exit(1);
});
