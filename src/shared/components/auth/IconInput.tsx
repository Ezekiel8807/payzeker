"use client";
import { Icon } from "@iconify/react";

type IconInputProps = {
  icon: string;
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
};

export default function IconInput({
  icon,
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  readOnly = false,
  className = "",
}: IconInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      <div className="mt-1 relative rounded-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon icon={icon} className="text-slate-400" />
        </div>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
          placeholder={placeholder}
          className="input pl-10 pr-3"
        />
      </div>
    </div>
  );
}
