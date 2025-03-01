// Import directly from the campaigns.ts file
import * as campaignsApi from "./src/Kanka/api/campaigns/campaigns.js";

console.log("Campaigns API functions:");
console.log("getCampaigns:", typeof campaignsApi.getCampaigns);
console.log("getCampaign:", typeof campaignsApi.getCampaign);
console.log("createCampaign:", typeof campaignsApi.createCampaign);
console.log("updateCampaign:", typeof campaignsApi.updateCampaign);
console.log("deleteCampaign:", typeof campaignsApi.deleteCampaign);
