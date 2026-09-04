import MoneyCom from "@/features/withdrawals/components/MoneyCom";
import DailyTask from "@/features/tasks/components/DailyTask";
import Performance from "@/features/dashboard/components/Performance";
import SpinMotivate from "@/features/lucky-spin/components/SpinMotivate";
import SubscriptionPrompt from "@/features/plans/components/SubscriptionPrompt";

type DashComProps = { showPrompt: boolean; };

export default function DashCom({ showPrompt }: DashComProps) {
  return (
    <>
      <SpinMotivate />
      <MoneyCom />
      <Performance />
      {showPrompt ? <SubscriptionPrompt /> : <DailyTask />}
    </>
  );
}
