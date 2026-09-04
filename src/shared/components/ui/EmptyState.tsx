import { Icon } from "@iconify/react";

type EmptyStateProps = {
  message?: string;
  description?: string;
  icon?: string;
  className?: string;
};

export default function EmptyState({
  message = "Nothing here yet",
  description,
  icon = "mdi:tray-alert-outline",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
        <Icon icon={icon} className="h-8 w-8 text-slate-400" />
      </div>
      <p className="text-slate-500 text-sm font-medium">{message}</p>
      {description && <p className="text-slate-400 text-xs mt-1">{description}</p>}
    </div>
  );
}
