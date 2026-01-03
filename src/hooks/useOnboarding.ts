"use client";

import { useState, useEffect, useCallback } from "react";
import { markTourAsCompleted } from "@/actions/userAction";

export interface OnboardingStep {
    targetId: string;
    title: string;
    description: string;
    position?: "top" | "bottom" | "left" | "right";
}

export const useOnboarding = (
    tourKey: string,
    totalSteps: number,
    userId: string,
    dbCompletedTours: string[] = []
) => {
    const [isTourActive, setIsTourActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);

    // User-scoped storage key
    const storageKey = `payzeker_tour_${userId}_${tourKey}`;

    useEffect(() => {
        if (!userId) return;

        // Check DB first (via props)
        if (dbCompletedTours.includes(tourKey)) {
            setHasLoaded(true);
            return;
        }

        // Check Local Storage as secondary
        const isCompletedLocally = localStorage.getItem(storageKey);
        if (!isCompletedLocally) {
            // Delay to ensure the page is fully rendered
            const timer = setTimeout(() => {
                setIsTourActive(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
        setHasLoaded(true);
    }, [storageKey, tourKey, dbCompletedTours, userId]);

    const completeTour = useCallback(async () => {
        // Mark locally
        localStorage.setItem(storageKey, "true");
        setIsTourActive(false);

        // Sync with DB
        try {
            await markTourAsCompleted(tourKey);
        } catch (error) {
            console.error("Failed to sync tour completion with DB:", error);
        }
    }, [storageKey, tourKey]);

    const nextStep = useCallback(() => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            completeTour();
        }
    }, [currentStep, totalSteps, completeTour]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    }, [currentStep]);

    const skipTour = useCallback(() => {
        completeTour();
    }, [completeTour]);

    return {
        isTourActive,
        currentStep,
        nextStep,
        prevStep,
        skipTour,
        hasLoaded,
    };
};
