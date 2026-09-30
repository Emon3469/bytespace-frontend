import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  title: ReactNode;
  description: ReactNode;
  /** "m" = 44px heading (Heading M), "s" = 36px heading (Heading S) */
  size?: "m" | "s";
  titleClassName?: string;
  className?: string;
};

export function SectionHeading({ id, title, description, size = "m", titleClassName, className }: SectionHeadingProps) {
  return (
    <div className={cn("reveal mx-auto flex w-[917px] max-w-full flex-col items-center gap-4 text-center", className)}>
      <h2
        id={id}
        className={cn(
          "font-display font-semibold text-ink",
          size === "m" ? "text-heading-m max-md:text-[32px]" : "text-heading-s max-md:text-[28px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <p className="font-sans text-body-l text-gray-400 max-md:text-[16px]">{description}</p>
    </div>
  );
}
