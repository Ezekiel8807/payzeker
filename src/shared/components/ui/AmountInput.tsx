"use client";

type AmountInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  label?: string;
  className?: string;
};

export default function AmountInput({
  value,
  onChange,
  placeholder,
  label,
  className = "",
}: AmountInputProps) {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <input
        className="input text-right"
        type="text"
        inputMode="numeric"
        value={value.toString()}
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) return;
          onChange(Number(e.target.value));
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
