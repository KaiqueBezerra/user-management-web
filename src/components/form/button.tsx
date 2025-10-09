import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge"; // 👈 importa aqui

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning";

type ButtonProps = ComponentProps<"button"> & {
  text: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700",
  secondary: "bg-white hover:bg-gray-300 text-black border-gray-400",
  danger: "bg-red-600 hover:bg-red-700 text-white border-red-400",
  success: "bg-green-600 hover:bg-green-700 text-white border-green-400",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-300",
};

export function Button({
  text,
  onClick,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const baseClasses = `
    px-4 py-2 rounded-md border transition-colors
    ${variantStyles[variant]}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${fullWidth ? "w-full" : ""}
  `;

  const mergedClasses = twMerge(baseClasses, className);

  return (
    <button
      className={mergedClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
}
