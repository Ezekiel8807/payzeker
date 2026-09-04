"use server";

import { connectDB } from "@/shared/lib/mongodb";
import User from "@/shared/models/userModel";
import { getToken } from "@/features/auth/actions/action";

/**
 * Mark a specific onboarding tour as completed for the logged-in user.
 */
export async function markTourAsCompleted(tourKey: string) {
    try {
        const token = await getToken();
        if (!token?.id) {
            return { error: true, message: "User not authenticated" };
        }

        await connectDB();

        const user = await User.findById(token.id);
        if (!user) {
            return { error: true, message: "User not found" };
        }

        // Add tourKey to completedTours if it's not already there
        if (!user.completedTours.includes(tourKey)) {
            user.completedTours.push(tourKey);
            await user.save();
        }

        return { success: true, message: "Tour marked as completed" };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to mark tour as completed";
        console.error("Error marking tour as completed:", error);
        return { error: true, message: errorMessage };
    }
}
