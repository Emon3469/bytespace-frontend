import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex shrink-0 items-center justify-center rounded-pill bg-lime px-6 py-3 font-sans text-label-l font-medium whitespace-nowrap text-gray-950 transition-colors duration-200 hover:bg-lime-500 active:bg-lime-500 disabled:cursor-not-allowed disabled:opacity-60";

type ButtonProps = ComponentProps<"button">;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(base, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link>;

export function ButtonLink({ className, ...props }: ButtonLinkProps) {
  return <Link className={cn(base, className)} {...props} />;
}
