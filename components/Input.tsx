import { useId, type InputHTMLAttributes } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "disabled"> & {
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
};

const BASE =
  "w-full h-[60px] px-4 bg-white rounded-none " +
  "font-roboto-mono text-lg leading-7 text-black " +
  "border-none shadow-w95-input " +
  "placeholder:text-[#9b9b9b] " +
  "outline-none focus:shadow-w95-focused " +
  "disabled:bg-[#c0c0c0] disabled:text-[#7e7e7e] disabled:shadow-w95-default disabled:cursor-not-allowed " +
  "transition-none";

export default function Input({
  label,
  description,
  error,
  disabled,
  id,
  className,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className={[
            "select-none font-monocraft text-sm text-black",
            disabled && "text-[#7e7e7e]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>
      )}

      {description && (
        <p
          id={descId}
          className={[
            "font-roboto-mono text-xs text-[#7e7e7e]",
            disabled && "text-[#9b9b9b]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      )}

      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={[BASE, error && "text-[#fd0100]", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />

      {error && (
        <span
          id={errorId}
          role="alert"
          className="font-roboto-mono text-xs text-[#fd0100]"
        >
          {error}
        </span>
      )}
    </div>
  );
}
