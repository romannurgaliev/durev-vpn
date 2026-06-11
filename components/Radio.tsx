import { useId, type InputHTMLAttributes } from "react";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  label?: string;
  description?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const RADIO_BOX = (disabled: boolean) =>
  [
    "relative flex shrink-0 items-center justify-center",
    "size-4 rounded-full bg-white shadow-w95-input transition-none",
    disabled && "bg-[#c0c0c0]",
  ]
    .filter(Boolean)
    .join(" ");

export default function Radio({
  label,
  description,
  disabled,
  onChange,
  id: idProp,
  ...rest
}: RadioProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

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
          type="radio"
          id={id}
          disabled={disabled}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className="sr-only"
          {...rest}
        />

        <div aria-hidden className={RADIO_BOX(disabled ?? false)}>
          {rest.checked && (
            <svg
              viewBox="0 0 16 16"
              className="size-full fill-black"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <circle cx="8" cy="8" r="3" />
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
