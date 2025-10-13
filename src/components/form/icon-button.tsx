import type { LucideProps } from "lucide-react";
import type { ComponentProps, ComponentType } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700",
  secondary: "bg-white hover:bg-gray-300 text-black border-gray-400",
  danger: "bg-red-600 hover:bg-red-700 text-white border-red-400",
  success: "bg-green-600 hover:bg-green-700 text-white border-green-400",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-300",
};

type IconButtonProps = ComponentProps<"button"> & {
  icon: ComponentType<LucideProps>;
  text: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

export default function IconButton({
  icon: Icon,
  text,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
        variantStyles[variant]
      } 
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
      ${fullWidth ? "w-full" : ""} 
      ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="size-4 mr-2" />}
      {text}
    </button>
  );
}
