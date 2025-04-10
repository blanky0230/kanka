/**
 * quick-test.ts
 * Simplified diagnostic script for Kanka API
 * Created: 2025-04-10
 * Framework principles applied: CONTEXT_DISCOVERY, STEPWISE_VERIFICATION
 */

// Direct environment variable check without Effect.js
console.log("==== Kanka API Quick Test ====");
console.log("Environment Variables:");
console.log(`- KANKA_API_KEY: ${process.env.KANKA_API_KEY ? 'Set (length: ' + process.env.KANKA_API_KEY.length + ')' : 'NOT SET - THIS IS REQUIRED'}`);
console.log(`- KANKA_BASE_URL: ${process.env.KANKA_BASE_URL || 'Not set (will use default)'}`);

// Direct HTTP test
const apiKey = process.env.KANKA_API_KEY;
const baseUrl = process.env.KANKA_BASE_URL || 'https://api.kanka.io/1.0';

if (!apiKey) {
    console.error("\n❌ ERROR: KANKA_API_KEY environment variable is not set!");
    console.error("Please create or update your .env file with a valid API key");
    console.error("Example: KANKA_API_KEY=your_api_key_here");
    process.exit(1);
}

console.log("\nAttempting direct API call to list campaigns...");
console.log(`API URL: ${baseUrl}/campaigns`);

// Make a direct fetch call without Effect.js
fetch(`${baseUrl}/campaigns`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
    }
})
    .then(response => {
        console.log(`Response status: ${response.status} ${response.statusText}`);
        if (!response.ok) {
            console.error(`❌ API request failed with status ${response.status}`);
            return response.text().then(text => {
                try {
                    const json = JSON.parse(text);
                    console.error("Error details:", json);
                } catch {
                    console.error("Response body:", text);
                }
                throw new Error(`API request failed with status ${response.status}`);
            });
        }
        return response.json();
    })
    .then((data: any) => {
        console.log("\n✅ Success! API connection is working");
        console.log(`Found ${data.data?.length || 0} campaigns`);
        console.log("First campaign name:", data.data?.[0]?.name || "No campaigns found");
        console.log("\nThis confirms your API key and environment variables are correctly configured.");
        console.log("The issue with the CLI is likely in the Effect.js runtime configuration.");
    })
    .catch(error => {
        console.error("\n❌ Error making direct API request:", error.message);
        console.error("Please check your API key and network connection");
    });
