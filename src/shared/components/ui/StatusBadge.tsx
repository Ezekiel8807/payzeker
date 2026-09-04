type StatusBadgeProps = {
  status: string;
  className?: string;
};

const statusMap: Record<string, string> = {
  pending: "badge-amber",
  approved: "badge-green",
  rejected: "badge-red",
  completed: "badge-green",
  failed: "badge-red",
  successful: "badge-green",
  cancelled: "badge-red",
  expired: "badge-red",
  inactive: "badge-amber",
  ongoing: "badge-green",
  new: "badge-green",
  paused: "badge-amber",
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const variant = statusMap[status.toLowerCase()] || "badge-gray";

  return (
    <span className={`badge ${variant} ${className}`}>
      {status.toUpperCase()}
    </span>
  );
}
