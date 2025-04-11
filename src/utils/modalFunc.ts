import { redirect } from "next/navigation";

// modal continue function
export function Continue(
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  action?: () => void,
  direction?: string
) {
  setState((prev) => !prev);

  if (action) {
    action();
  }

  if (direction) {
    redirect(direction);
  }
}

//modal cancel function
export function Cancel(
  setState: React.Dispatch<React.SetStateAction<boolean>>
) {
  setState((prev) => !prev);
}
