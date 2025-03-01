const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Regular expression to match Schema.Union(...[Schema.X, Schema.Null])
const regex = /Schema\.Union\(\.\.\.\[(Schema\.[^,]+), Schema\.Null\]\)/g;

// Replacement pattern
const replacement = 'Schema.optional($1)';

// Function to recursively process all TypeScript files in a directory
async function processDirectory(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
            await processFile(fullPath);
        }
    }
}

// Function to process a single file
async function processFile(filePath) {
    try {
        console.log(`Processing: ${filePath}`);
        const content = await readFile(filePath, 'utf8');

        // Skip files that don't contain the pattern
        if (!content.includes('Schema.Union(...[Schema.')) {
            console.log(`  No pattern found in: ${filePath}`);
            return;
        }

        // Count occurrences of the pattern
        const matches = content.match(regex);
        if (matches) {
            console.log(`  Found ${matches.length} occurrences in: ${filePath}`);
        } else {
            console.log(`  Pattern not matched by regex in: ${filePath}`);
            return;
        }

        // Replace all occurrences of the pattern
        const newContent = content.replace(regex, replacement);

        // Only write the file if changes were made
        if (newContent !== content) {
            await writeFile(filePath, newContent, 'utf8');
            console.log(`  Updated: ${filePath}`);
        } else {
            console.log(`  No changes made to: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Start processing from the src directory
processDirectory('./src')
    .then(() => console.log('Done!'))
    .catch(error => console.error('Error:', error));
