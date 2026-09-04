"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingStep } from "@/features/dashboard/hooks/useOnboarding";

interface OnboardingTourProps {
  steps: OnboardingStep[];
  currentStep: number;
  isTourActive: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, currentStep, isTourActive, onNext, onPrev, onSkip }) => {
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, scale: 0.9, opacity: 0 });
  const step = steps[currentStep];

  const updatePosition = useCallback(() => {
    if (!isTourActive || !step) return;
    const element = document.getElementById(step.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      setHighlightRect(rect);
      const padding = 20, tooltipWidth = 320, tooltipHeight = 200;
      const viewportWidth = window.innerWidth, viewportHeight = window.innerHeight;
      let top = rect.bottom + 20;
      let left = rect.left + rect.width / 2;
      if (top + tooltipHeight > viewportHeight - padding) top = rect.top - tooltipHeight - 20;
      left = Math.max(tooltipWidth / 2 + padding, Math.min(left, viewportWidth - tooltipWidth / 2 - padding));
      setTooltipPos({ top, left, scale: 1, opacity: 1 });
    }
  }, [isTourActive, step]);

  useEffect(() => {
    if (isTourActive && step) {
      const element = document.getElementById(step.targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        const timer = setTimeout(updatePosition, 500);
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
      <svg className="absolute inset-0 w-full h-full pointer-events-auto">
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {highlightRect && (
              <motion.rect initial={false} animate={{ x: highlightRect.x - 5, y: highlightRect.y - 5, width: highlightRect.width + 10, height: highlightRect.height + 10, rx: 8 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }} fill="black" />
            )}
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#spotlight-mask)" onClick={onSkip} />
      </svg>
      <AnimatePresence mode="wait">
        <motion.div key={currentStep} initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: tooltipPos.opacity, scale: tooltipPos.scale, top: tooltipPos.top, left: tooltipPos.left, translateX: "-50%" }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
          style={{ position: "absolute", zIndex: 10000 }}
          className="pointer-events-auto w-[90%] max-w-[320px] bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <span className="badge badge-green uppercase tracking-wider">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button onClick={onSkip} className="text-ink-muted hover:text-ink transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{step.title}</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{step.description}</p>
          <div className="flex items-center justify-between gap-3">
            <button onClick={onPrev} disabled={currentStep === 0} className="text-sm font-medium text-ink-muted hover:text-ink disabled:opacity-0 transition-all px-2 py-1">Back</button>
            <button onClick={onNext} className="btn btn-primary hover:scale-105 active:scale-95">
              {currentStep === steps.length - 1 ? "Got it!" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingTour;
