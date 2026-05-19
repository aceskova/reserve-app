import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={[
        "mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2",
        "text-gray-950 shadow-sm outline-none",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
