import Link from "next/link";
import type { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

export function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <Link
      className={[
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "text-gray-500 hover:bg-gray-100 hover:text-gray-950",
        "dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
