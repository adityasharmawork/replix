// src/components/ui/button.tsx
import React from "react";

type BtnProps = {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/** tiny class joiner (no external deps) */
function classNames(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export const Button: React.FC<BtnProps> = ({
  children,
  className = "",
  size = "md",
  variant = "default",
  ...props
}) => {
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants: Record<string, string> = {
    default:
      "bg-white text-black hover:bg-gray-200 transition-all rounded-md shadow-sm",
    ghost:
      "bg-transparent ring-1 ring-white/10 hover:ring-white/30 rounded-md transition-all",
    outline:
      "bg-transparent border border-white/10 rounded-md hover:bg-white/3 transition-all",
  };

  const classes = classNames(sizes[size], variants[variant], className);

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};
