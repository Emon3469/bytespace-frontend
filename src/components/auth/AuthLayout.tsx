import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { AuthShowcase } from "./AuthShowcase";

type AuthLayoutProps = {
  intro: { title: string; description: string };
  children: ReactNode;
};

/**
 * Split-screen auth template (Register / Login frames, 1440×1024).
 * ≥1280px: absolute artboard positions. Below that the columns stack.
 * All artboard x values are offset by 121px (the container's left edge at 1440).
 */
export function AuthLayout({ intro, children }: AuthLayoutProps) {
  return (
    <div className="min-h-dvh overflow-hidden bg-primary grid-lines">
      <div className="relative mx-auto h-[1024px] w-[1198px] max-md:px-4 max-md:pb-10 max-xl:flex max-xl:h-auto max-xl:w-full max-xl:max-w-[659px] max-xl:flex-col max-xl:items-center max-xl:px-10 max-xl:pb-20">
        <header className="absolute top-[35px] left-px max-xl:static max-xl:self-start max-xl:py-8">
          <Logo markOnly />
        </header>

        <div className="absolute top-[120px] left-px flex w-[475px] flex-col gap-4 max-xl:static max-xl:w-full max-xl:max-w-[579px]">
          <p className="font-display text-label-xl font-medium text-white">{intro.title}</p>
          <p className="font-sans text-body-l text-gray-100 max-md:text-[16px]">{intro.description}</p>
        </div>

        <main className="absolute top-[120px] left-[620px] w-[579px] max-md:mt-8 max-xl:static max-xl:order-3 max-xl:w-full">
          {children}
        </main>

        <div className="absolute top-[305px] left-[-24px] max-md:hidden max-xl:relative max-xl:top-auto max-xl:left-auto max-xl:order-2 max-xl:my-10 max-xl:h-[calc(585px*0.8)] max-xl:w-[calc(723px*0.8)]">
          <div className="origin-top-left max-xl:scale-80">
            <AuthShowcase />
          </div>
        </div>
      </div>
    </div>
  );
}
