import { Icon } from "@iconify/react";

type FormSuccessProbs = { msg: string; };

export default function FormSuccess({ msg }: FormSuccessProbs) {
  if (!msg) return null;
  return (
    <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--green)]/10 px-4 py-3 text-sm font-semibold text-[var(--green-dark)]">
      <Icon icon="heroicons:check-circle" className="h-4 w-4 shrink-0" />
      <p>{msg}</p>
    </div>
  );
}
