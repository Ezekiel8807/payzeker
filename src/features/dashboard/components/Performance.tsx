import User from "@/shared/models/userModel";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { fetchModelById } from "@/shared/utils/modelFunc";
import StatCard from "@/shared/components/ui/StatCard";

export default async function Performance() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const user = await fetchModelById(User, token.id);
  const { completedTask, overallTask } = user;
  const missed = overallTask - completedTask || 0;

  const stats = [
    { label: "Tasks Overall", value: overallTask || 0, icon: "mdi:clipboard-list-outline", color: "text-[var(--green)]", bg: "bg-slate-100" },
    { label: "Tasks Completed", value: completedTask || 0, icon: "mdi:check-circle-outline", color: "text-green-600", bg: "bg-green-100" },
    { label: "Tasks Missed", value: missed, icon: "mdi:close-circle-outline", color: "text-red-500", bg: "bg-red-100" },
  ];

  return (
    <div id="dashboard-performance" className="w-full my-5">
      <div className="flex flex-row gap-4 sm:gap-6 bg-white/80 backdrop-blur-sm px-0 sm:px-3 sm:py-5 rounded md:shadow-sm border-none sm:border border-gray-100 overflow-x-scroll no-scrollbar">
        {stats.map((stat, i) => (
          <StatCard key={i} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} bg={stat.bg} />
        ))}
      </div>
    </div>
  );
}
