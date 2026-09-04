type ProfileFieldProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  readOnly?: boolean;
  className?: string;
};

export default function ProfileField({
  label,
  htmlFor,
  children,
  className = "",
}: ProfileFieldProps) {
  return (
    <div className={`flex flex-col md:flex-row mb-5 md:justify-between ${className}`}>
      <label htmlFor={htmlFor} className="label self-center">
        {label}:
      </label>
      <div className="md:w-[70%]">
        {children}
      </div>
    </div>
  );
}
