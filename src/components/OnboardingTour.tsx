"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingStep } from "@/hooks/useOnboarding";

interface OnboardingTourProps {
    steps: OnboardingStep[];
    currentStep: number;
    isTourActive: boolean;
    onNext: () => void;
    onPrev: () => void;
    onSkip: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({
    steps,
    currentStep,
    isTourActive,
    onNext,
    onPrev,
    onSkip,
}) => {
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, scale: 0.9, opacity: 0 });
    const step = steps[currentStep];

    const updatePosition = useCallback(() => {
        if (!isTourActive || !step) return;

        const element = document.getElementById(step.targetId);
        if (element) {
            const rect = element.getBoundingClientRect();
            setHighlightRect(rect);

            // Smart Positioning Logic
            const padding = 20;
            const tooltipWidth = 320;
            const tooltipHeight = 200; // Estimated
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let top = rect.bottom + 20;
            let left = rect.left + rect.width / 2;

            // Adjust vertical if too close to bottom
            if (top + tooltipHeight > viewportHeight - padding) {
                top = rect.top - tooltipHeight - 20;
            }

            // Adjust horizontal overflow
            const minLeft = tooltipWidth / 2 + padding;
            const maxLeft = viewportWidth - tooltipWidth / 2 - padding;
            left = Math.max(minLeft, Math.min(left, maxLeft));

            setTooltipPos({ top, left: left, scale: 1, opacity: 1 });
        }
    }, [isTourActive, step]);

    useEffect(() => {
        if (isTourActive && step) {
            const element = document.getElementById(step.targetId);
            if (element) {
                // Handle horizontal scroll with inline: "center"
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                });

                // Use a longer timeout for smooth scroll to finish
                const timer = setTimeout(updatePosition, 500);

                // Global scroll listener (capture phase) to handle nested scrollers
                window.addEventListener("scroll", updatePosition, { capture: true });
                window.addEventListener("resize", updatePosition);

                return () => {
                    clearTimeout(timer);
                    window.removeEventListener("scroll", updatePosition, { capture: true });
                    window.removeEventListener("resize", updatePosition);
                };
            }
        }
    }, [isTourActive, step, currentStep, updatePosition]);

    if (!isTourActive || !step) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Background Mask */}
            <svg className="absolute inset-0 w-full h-full pointer-events-auto">
                <defs>
                    <mask id="spotlight-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        {highlightRect && (
                            <motion.rect
                                initial={false}
                                animate={{
                                    x: highlightRect.x - 5,
                                    y: highlightRect.y - 5,
                                    width: highlightRect.width + 10,
                                    height: highlightRect.height + 10,
                                    rx: 8,
                                }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                fill="black"
                            />
                        )}
                    </mask>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="rgba(0, 0, 0, 0.7)"
                    mask="url(#spotlight-mask)"
                    onClick={onSkip}
                />
            </svg>

            {/* Tooltip Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{
                        opacity: tooltipPos.opacity,
                        scale: tooltipPos.scale,
                        top: tooltipPos.top,
                        left: tooltipPos.left,
                        translateX: "-50%",
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    style={{
                        position: "absolute",
                        zIndex: 10000,
                    }}
                    className="pointer-events-auto w-[90%] max-w-[320px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[var(--green)] font-bold text-xs uppercase tracking-wider bg-green-50 px-2 py-1 rounded">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <button
                            onClick={onSkip}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {step.description}
                    </p>

                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={onPrev}
                            disabled={currentStep === 0}
                            className="text-sm font-medium text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all px-2 py-1"
                        >
                            Back
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={onNext}
                                className="bg-[var(--green)] hover:bg-[#22b891] text-white text-sm font-medium px-6 py-2 rounded-xl shadow-lg shadow-green-100 transition-all hover:scale-105 active:scale-95"
                            >
                                {currentStep === steps.length - 1 ? "Got it!" : "Next"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default OnboardingTour;
