import { Icon } from "@iconify/react";

type StatCardProps = {
  label: string;
  value: number;
  icon: string;
  color?: string;
  bg?: string;
  className?: string;
};

export default function StatCard({
  label,
  value,
  icon,
  color = "text-[var(--green)]",
  bg = "bg-slate-100",
  className = "",
}: StatCardProps) {
  return (
    <div className={`flex items-center gap-3 ${bg} hover:scale-[1.05] transition-transform duration-300 rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-w-[130px] sm:min-w-0 sm:flex-1 justify-center ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white shadow-inner">
        <Icon icon={icon} className={`${color} text-xl sm:text-3xl`} />
      </div>
      <div className="text-center">
        <span className="block font-extrabold text-lg sm:text-2xl text-gray-800">{value}</span>
        <p className="text-[10px] sm:text-sm text-gray-600 font-medium whitespace-nowrap">{label}</p>
      </div>
    </div>
  );
}
