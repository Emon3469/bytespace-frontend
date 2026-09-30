import type { ComponentProps } from "react";

type FieldProps = ComponentProps<"input"> & { label: string; name: string };

export function Field({ label, name, id, ...inputProps }: FieldProps) {
  const inputId = id ?? `field-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="font-sans text-label-s font-medium text-gray-950">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className="h-[52px] w-full rounded-pill border border-gray-200 bg-white px-6 font-sans text-body-l text-gray-950 transition-colors outline-none placeholder:text-gray-400 hover:border-gray-400 focus:border-primary user-invalid:border-red-500"
        {...inputProps}
      />
    </div>
  );
}
