"use client";
import React from "react";
import OnboardingTour from "./OnboardingTour";
import { useOnboarding, OnboardingStep } from "@/features/dashboard/hooks/useOnboarding";

const DASHBOARD_STEPS: OnboardingStep[] = [
  { targetId: "dashboard-balance", title: "Account Balance", description: "This is your main account balance. You can deposit and withdraw your funds here.", position: "bottom" },
  { targetId: "dashboard-earnings", title: "Your Earnings", description: "All the money you earn from tasks accumulates here. Transfer it to your main balance when ready.", position: "bottom" },
  { targetId: "dashboard-performance", title: "Performance Tracking", description: "Keep track of how many tasks you've completed or missed. Consistency is key!", position: "top" },
  { targetId: "dashboard-daily-tasks", title: "Daily Tasks", description: "Here are your tasks for today. Complete them to earn real cash immediately!", position: "top" },
  { targetId: "dashboard-spin", title: "Try Your Luck!", description: "Feeling lucky? The Lucky Spin is a great way to boost your earnings.", position: "bottom" },
  { targetId: "dashboard-daily-tasks", title: "Start Earning", description: "Ready to go? Click to head over to the Task details page.", position: "right" },
];

interface DashboardTourWrapperProps { userId: string; completedTours: string[]; }

const DashboardTourWrapper = ({ userId, completedTours }: DashboardTourWrapperProps) => {
  const { isTourActive, currentStep, nextStep, prevStep, skipTour } = useOnboarding("dashboard", DASHBOARD_STEPS.length, userId, completedTours);
  return <OnboardingTour steps={DASHBOARD_STEPS} currentStep={currentStep} isTourActive={isTourActive} onNext={nextStep} onPrev={prevStep} onSkip={skipTour} />;
};

export default DashboardTourWrapper;
