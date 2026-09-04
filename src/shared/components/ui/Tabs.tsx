"use client";

type Tab = { value: string; label: string };

type TabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
  variant?: "pill" | "underline";
  className?: string;
};

export default function Tabs({
  tabs,
  active,
  onChange,
  variant = "pill",
  className = "",
}: TabsProps) {
  if (variant === "underline") {
    return (
      <div className={`flex gap-2 overflow-x-auto pb-2 mb-4 border-b border-slate-200 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 rounded-t-lg whitespace-nowrap transition-colors ${
              active === tab.value
                ? "bg-[var(--green)] text-white font-semibold"
                : "bg-slate-50 text-ink-soft hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-wrap gap-3 mb-4 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded-pill text-sm font-bold transition-colors ${
            active === tab.value
              ? "bg-[var(--green)] text-white shadow-soft"
              : "border border-[var(--green)] text-[var(--green)]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
