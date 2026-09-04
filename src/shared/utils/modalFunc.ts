import { redirect } from "next/navigation";

export function Continue(
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  action?: () => void,
  direction?: string
) {
  setState((prev) => !prev);
  if (action) action();
  if (direction) redirect(direction);
}

export function Cancel(setState: React.Dispatch<React.SetStateAction<boolean>>) {
  setState((prev) => !prev);
}
