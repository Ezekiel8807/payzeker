// modal continue function
export function Continue(
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  action?: () => void
) {
  setState((prev) => !prev);

  if (action) {
    action();
  }
}

//modal cancel function
export function Cancel(
  setState: React.Dispatch<React.SetStateAction<boolean>>
) {
  setState((prev) => !prev);
}
