import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  id: string;
  type?: string;
  error?: string;
};

export default function Input({
  label,
  id,
  type = "text",
  error,
  ...rest
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...rest}
        className={`bg-zinc-900 w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-zinc-700 focus:ring-zinc-400"
          }`}
        required
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
