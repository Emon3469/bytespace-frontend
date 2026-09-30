import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  footer: { prompt: string; linkLabel: string; href: string };
  /** Bottom padding differs between the two frames (Register 51px, Login 40px). */
  className?: string;
};

export function AuthCard({ eyebrow, title, children, footer, className }: AuthCardProps) {
  return (
    <section
      aria-labelledby="auth-title"
      className={cn(
        "flex h-[784px] flex-col justify-between rounded-card bg-white px-[63px] pt-[61px] max-md:px-6 max-md:py-10 max-xl:h-auto max-xl:gap-12",
        className,
      )}
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-10 max-md:gap-8">
          <div className="flex flex-col">
            <p className="font-sans text-body-l text-primary">{eyebrow}</p>
            <h1 id="auth-title" className="font-display text-heading-m font-semibold text-gray-950 max-md:text-[34px]">
              {title}
            </h1>
          </div>
          {children}
        </div>
      </div>

      <p className="flex items-center justify-center gap-1 font-sans text-body-m text-gray-700">
        {footer.prompt}
        <Link href={footer.href} className="text-primary hover:underline">
          {footer.linkLabel}
        </Link>
      </p>
    </section>
  );
}
