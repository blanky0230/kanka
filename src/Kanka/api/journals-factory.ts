import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { KankaJournal, KankaJournalSchema, CreateJournalParams, UpdateJournalParams } from "../schemas/journals.js";

/**
 * Journals API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Journal entity type.
 */

// Type assertion to handle schema compatibility
const journalSchema = KankaJournalSchema as Schema.Schema<KankaJournal, unknown>;

// Create the Journals API using the factory
const journalApi = createEntityApi<KankaJournal, CreateJournalParams, UpdateJournalParams>({
    basePath: "journals",
    schema: journalSchema,
    // Custom query parameter transformer to handle journal-specific parameters
    transformQueryParams: (params) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        // Standard parameters
        if (typeof params.page === 'number') queryParams.page = params.page;
        if (typeof params.perPage === 'number') queryParams.per_page = params.perPage;
        if (typeof params.name === 'string') queryParams.name = params.name;
        if (typeof params.is_private === 'boolean') queryParams.is_private = params.is_private;
        if (typeof params.created_by === 'number') queryParams.created_by = params.created_by;
        if (typeof params.updated_by === 'number') queryParams.updated_by = params.updated_by;
        if (typeof params.lastSync === 'string') queryParams.lastSync = params.lastSync;

        // Journal-specific parameters
        if (typeof params.journal_id === 'number') queryParams.journal_id = params.journal_id;
        if (typeof params.author_id === 'number') queryParams.author_id = params.author_id;
        if (typeof params.date === 'string') queryParams.date = params.date;
        if (typeof params.type === 'string') queryParams.type = params.type;

        // Add tags as individual query parameters if present
        const tags = params.tags;
        if (tags && Array.isArray(tags) && tags.length > 0) {
            tags.forEach((tag, index) => {
                if (typeof tag === 'number') {
                    queryParams[`tags[${index}]`] = tag;
                }
            });
        }

        return queryParams;
    }
});

// Export the standard CRUD operations with factory suffix to avoid naming conflicts
export const getJournalsFactory = journalApi.getAll;
export const getJournalFactory = journalApi.getOne;
export const createJournalFactory = journalApi.create;
export const updateJournalFactory = journalApi.update;
export const deleteJournalFactory = journalApi.delete;

// You can also add custom operations specific to journals
// that aren't covered by the standard CRUD operations
