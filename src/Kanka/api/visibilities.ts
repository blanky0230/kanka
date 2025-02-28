import { Visibility } from "../schemas/visibilities.js";
import { get } from "./client.js";

/**
 * Get all visibilities
 * 
 * This endpoint returns a list of all visibility options available in Kanka.
 * Visibilities are used to control who can see elements in a campaign.
 */
export const getVisibilities = () => {
    return get<Visibility[]>("visibilities");
};
