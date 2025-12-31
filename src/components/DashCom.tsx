// components
// import Script from "next/script";
import MoneyCom from "./MoneyCom";
import DailyTask from "./DailyTask";
import Performance from "./Performance";
import SpinMotivate from "./SpinMotivate";
import SubscriptionPrompt from "./SubscriptionPrompt";

type DashComProps = {
  showPrompt: boolean;
};

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
