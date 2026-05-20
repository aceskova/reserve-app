import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
        "dark:border-gray-800 dark:bg-gray-900",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
