type InfoRowProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export default function InfoRow({ label, children, className = "" }: InfoRowProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-sm text-ink-muted">{label}:</span>
      <span className="text-right font-medium">{children}</span>
    </div>
  );
}
