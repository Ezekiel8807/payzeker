import { Cancel } from "@/utils/modalFunc";

export function comfirmSpin(
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  stateSetter(true);
}

export function cancelConfirmSpin(
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  Cancel(stateSetter);
}

// export const handleSpin = async () => {
//   if (spinning) return;

//   setSpinning(true);
//   setResult(null);

//   // Fake delay for animation
//   await new Promise((res) => setTimeout(res, 3000));

//   // Simulate backend result
//   const rand = Math.random() * 100;

//   let outcome = "Try Again";
//   if (rand <= 2) outcome = "Jackpot 🎉";
//   else if (rand <= 10) outcome = "Big Win";
//   else if (rand <= 25) outcome = "Break Even";
//   else if (rand <= 50) outcome = "Small Win";

//   setResult(outcome);
//   setSpinning(false);
// };
