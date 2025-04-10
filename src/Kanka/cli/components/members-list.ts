/**
 * members-list.ts
 * Component for displaying and interacting with campaign members
 * Created: 2025-04-10
 * Framework principles applied: STAKEHOLDER_PRIORITY, CONTEXT_DISCOVERY, STEPWISE_VERIFICATION
 */

import { Context, Effect } from "effect";
import inquirer from "inquirer";
import terminalImage from "terminal-image";
import { Campaign, CampaignMemberListItem, CampaignMemberUser } from "../../api/campaigns/types.js";

/**
 * Fetch and render avatar image
 */
const fetchAndRenderAvatar = async (avatarUrl: string | null | undefined): Promise<string> => {
    if (!avatarUrl) {
        return "No avatar available";
    }

    try {
        // Fetch the image from the URL
        const response = await fetch(avatarUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch avatar: ${response.status} ${response.statusText}`);
        }

        // Get the image as a buffer
        const buffer = await response.arrayBuffer();

        // Render the image in the terminal
        const renderedImage = await terminalImage.buffer(Buffer.from(buffer), {
            width: 512, // Smaller width for avatar
            height: 512, // Smaller height for avatar
        });

        return renderedImage;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error rendering avatar: ${errorMessage}`);
        return `Avatar URL: ${avatarUrl} (Failed to render image)`;
    }
};

/**
 * Format member details for display
 */
const formatMemberDetails = (member: CampaignMemberListItem): string => {
    const details = [
        `ID: ${member.id}`,
        `User Name: ${member.user.name}`,
        `User ID: ${member.user.id}`,
    ];

    // Add avatar URL for reference even if we'll render it separately
    if (member.user.avatar) {
        details.push(`Avatar URL: ${member.user.avatar}`);
    } else {
        details.push(`Avatar: None`);
    }

    return details.join("\n");
};

/**
 * Display member details in a modal view
 */
const displayMemberDetails = (
    member: CampaignMemberListItem
): Effect.Effect<void, never, never> => {
    return Effect.gen(function* (_) {
        console.clear();
        console.log("=".repeat(50));
        console.log(`MEMBER DETAILS: ${member.user.name}`);
        console.log("=".repeat(50));
        console.log("");
        console.log(formatMemberDetails(member));
        console.log("");

        // If member has an avatar, render it
        if (member.user.avatar) {
            console.log("Loading avatar image...");

            try {
                const renderedAvatar = yield* Effect.promise(() =>
                    fetchAndRenderAvatar(member.user.avatar)
                );
                console.log(renderedAvatar);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.log(`Could not render avatar: ${errorMessage}`);
            }
        }

        console.log("-".repeat(50));

        yield* Effect.promise(() =>
            inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Press Enter to return to members list",
                },
            ])
        );
    });
};

/**
 * Display members list and handle member-related actions
 */
export const displayMembersList = (campaign: Campaign): Effect.Effect<void, never, never> => {
    return Effect.gen(function* (_) {
        // Extract members from campaign
        const members = campaign.members ? Array.from(campaign.members) : [];

        // Sort members by name for better UX
        members.sort((a, b) => a.user.name.localeCompare(b.user.name));

        let exitList = false;
        while (!exitList) {
            // Clear screen for better UX
            console.clear();

            // Display header
            console.log("=".repeat(50));
            console.log(`CAMPAIGN MEMBERS: ${campaign.name}`);
            console.log("=".repeat(50));
            console.log(`Total Members: ${members.length}`);
            console.log("");

            if (members.length === 0) {
                console.log("No members found for this campaign.");
                yield* Effect.promise(() =>
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "continue",
                            message: "Press Enter to return to dashboard",
                        },
                    ])
                );
                return;
            }

            // Create member selection options
            const choices = members.map((member) => ({
                name: `${member.user.name} (ID: ${member.id})`,
                value: member,
            }));

            // Add back option
            choices.push({
                name: "Back to Campaign Dashboard",
                value: "back" as unknown as CampaignMemberListItem, // Cast to make TypeScript happy with our choices array
            });

            // Present member selection
            const { selection } = yield* Effect.promise(() =>
                inquirer.prompt([
                    {
                        type: "list",
                        name: "selection",
                        message: "Select a member to view details:",
                        choices,
                        pageSize: 15,
                    },
                ])
            );

            // Handle selection
            if (selection === "back") {
                exitList = true;
            } else {
                // Display details for selected member
                yield* displayMemberDetails(selection as CampaignMemberListItem);
            }
        }

        yield* Effect.logInfo("Returning to campaign dashboard");
    });
};
