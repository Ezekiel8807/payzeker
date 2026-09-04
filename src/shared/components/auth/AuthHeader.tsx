type AuthHeaderProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export default function AuthHeader({
  title,
  subtitle,
  className = "",
}: AuthHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}
