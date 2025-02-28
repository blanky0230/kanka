import { Schema } from "effect";

/**
 * Last Sync response
 * 
 * This is included in all index endpoint responses and can be used
 * to track the last time data was synced with the server.
 */
export interface LastSync {
    /**
     * The timestamp of the last sync in ISO 8601 format
     */
    sync: string;
}

export const LastSyncSchema = Schema.Struct({
    sync: Schema.String
});

/**
 * Parameters for Last Sync
 * 
 * These parameters can be added to any index endpoint to get only
 * the items that have changed since the last sync.
 */
export interface LastSyncParams {
    /**
     * The timestamp of the last sync in ISO 8601 format
     */
    lastSync?: string;
}
