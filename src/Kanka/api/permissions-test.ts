import { PermissionTestRequest, PermissionTestResult } from "../schemas/permissions-test.js";
import { SingleResponse } from "../schemas/common.js";
import { post } from "./client.js";

/**
 * Test a campaign user's permissions for entities or entity types
 * 
 * @param campaignId The ID of the campaign
 * @param requests Array of permission test requests
 * @returns Array of permission test results
 */
export const testPermissions = (campaignId: number, requests: PermissionTestRequest[]) => {
    return post<SingleResponse<PermissionTestResult[]>>(`campaigns/${campaignId}/permissions/test`, requests);
};
