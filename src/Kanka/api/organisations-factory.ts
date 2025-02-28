import { Schema } from "effect";
import { createEntityApi } from "./createEntityApi.js";
import { Organisation, OrganisationSchema, CreateOrganisationParams, UpdateOrganisationParams } from "../schemas/organisations.js";

/**
 * Organisations API using the Generic Entity API Factory
 * 
 * This implementation uses the Generic Entity API Factory to create
 * a fully functional API for the Organisation entity type.
 */

// Type assertion to handle schema compatibility
const organisationSchema = OrganisationSchema as unknown as Schema.Schema<Organisation, unknown>;

// Create the Organisations API using the factory
const organisationApi = createEntityApi<Organisation, CreateOrganisationParams, UpdateOrganisationParams>({
    basePath: "organisations",
    schema: organisationSchema,
    // Custom query parameter transformer to handle organisation-specific parameters
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

        // Organisation-specific parameters
        if (typeof params.is_defunct === 'boolean') queryParams.is_defunct = params.is_defunct;
        if (typeof params.organisation_id === 'number') queryParams.organisation_id = params.organisation_id;
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
export const getOrganisationsFactory = organisationApi.getAll;
export const getOrganisationFactory = organisationApi.getOne;
export const createOrganisationFactory = organisationApi.create;
export const updateOrganisationFactory = organisationApi.update;
export const deleteOrganisationFactory = organisationApi.delete;

// Note: We're not adding deprecated exports here to avoid naming conflicts
// with the original implementation in organisations.js
