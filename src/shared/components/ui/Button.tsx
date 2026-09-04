import { Icon } from "@iconify/react";

type ButtonVariant = "primary" | "ghost" | "danger" | "outline" | "link";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProbs = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  btnAction?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  isPending?: boolean;
  pendingText?: string;
  fullWidth?: boolean;
  btnStyle?: string;
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  danger: "btn-danger",
  outline: "btn border-2 border-[var(--green)] bg-transparent text-[var(--green)] hover:bg-[var(--green)]/10",
  link: "btn bg-transparent px-2 py-1 !font-bold text-[var(--green)] underline-offset-4 hover:underline",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "min-w-[5rem]! px-3! py-1.5! text-xs",
  md: "min-w-[8rem]! px-4! py-2! text-sm",
  lg: "min-w-[11rem]! px-5! py-2.5! text-base",
};

const DEFAULT_VARIANT = "primary";
const DEFAULT_SIZE: ButtonSize = "md";

export default function Button({
  children,
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  disabled,
  btnAction,
  type = "submit",
  className = "",
  isPending = false,
  pendingText,
  fullWidth = false,
  btnStyle,
}: ButtonProbs) {
  const resolved = btnStyle
    ? btnStyle
    : `${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  const pending = isPending;
  const loadingLabel = pendingText || "Processing...";

  return (
    <button
      type={type}
      onClick={btnAction}
      className={resolved}
      disabled={disabled || pending}
      aria-busy={pending}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
