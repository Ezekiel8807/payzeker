"use client";
import Button from "@/shared/components/ui/Button";

type LoadingButtonProps = {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function LoadingButton({
  isLoading,
  loadingText,
  children,
  disabled = false,
  className = "",
  onClick,
  type = "submit",
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      btnAction={onClick}
      disabled={disabled || isLoading}
      variant="primary"
      isPending={isLoading}
      pendingText={loadingText || "Processing..."}
      className={`${className}`}
    >
      {children}
    </Button>
  );
}
