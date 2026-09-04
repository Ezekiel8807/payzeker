"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  icon?: string;
  className?: string;
};

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder,
  icon = "solar:lock-password-bold",
  className = "",
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

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
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="input pl-10 pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Icon icon={show ? "heroicons:eye" : "heroicons:eye-slash"} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
