'use client';

import { useId, useRef, useEffect, type InputHTMLAttributes } from "react";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'onChange'
> & {
  label?: string;
  description?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

const CHECKBOX_BOX = (disabled: boolean) =>
  [
    "relative flex shrink-0 items-center justify-center",
    "size-4 rounded-none bg-white shadow-w95-input transition-none",
    disabled && "bg-[#c0c0c0]",
  ]
    .filter(Boolean)
    .join(" ");

export default function Checkbox({
  label,
  description,
  checked,
  indeterminate,
  disabled,
  onChange,
  id: idProp,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate ?? false;
  }, [indeterminate]);

  return (
    <label
      htmlFor={id}
      className={[
        "flex w-full flex-col gap-1",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
          className="sr-only"
          {...rest}
        />

        <div aria-hidden className={CHECKBOX_BOX(disabled ?? false)}>
          {checked && !indeterminate && (
            <svg
              viewBox="0 0 16 16"
              className="size-full fill-black"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <rect x="3" y="7" width="1" height="1" />
              <rect x="4" y="8" width="1" height="1" />
              <rect x="5" y="9" width="1" height="1" />
              <rect x="6" y="8" width="1" height="1" />
              <rect x="7" y="7" width="1" height="1" />
              <rect x="8" y="6" width="1" height="1" />
              <rect x="9" y="5" width="1" height="1" />
              <rect x="10" y="4" width="1" height="1" />
              <rect x="11" y="3" width="1" height="1" />
            </svg>
          )}
          {indeterminate && (
            <svg
              viewBox="0 0 16 16"
              className="size-full fill-black"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <rect x="3" y="7" width="10" height="2" />
            </svg>
          )}
        </div>

        {label && (
          <span
            className={[
              "font-monocraft text-sm select-none",
              disabled ? "text-[#7e7e7e]" : "text-black",
            ].join(" ")}
          >
            {label}
          </span>
        )}
      </div>

      {description && (
        <div className="flex items-start gap-3">
          <div aria-hidden className="size-4 shrink-0" />
          <p
            className={[
              "font-roboto-mono text-xs",
              disabled ? "text-[#9b9b9b]" : "text-[#7e7e7e]",
            ].join(" ")}
          >
            {description}
          </p>
        </div>
      )}
    </label>
  );
}
