import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-md px-4 py-2.5",
        "text-sm font-semibold shadow-sm transition-colors",
        "bg-blue-600 text-white hover:bg-blue-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "dark:bg-blue-500 dark:hover:bg-blue-400",
        "dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-950",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
