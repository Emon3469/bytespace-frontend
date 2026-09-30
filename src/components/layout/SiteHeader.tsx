"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, useEffect, useId, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * In-page anchors (e.g. "/#courses") use a native <a> so the browser scrolls
 * immediately; real routes go through next/link for client-side navigation.
 */
function NavLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  return href.includes("#") ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

export function SiteHeader({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu on Escape and when resizing up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1025px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={cn("relative z-30 bg-primary grid-lines", className)}>
      <div className="relative mx-auto h-[120px] w-full max-w-[1440px] max-lg:h-auto">
        {/* Desktop layout — absolute positions taken from the 1440 artboard */}
        <div className="max-lg:hidden">
          <Logo className="absolute top-[35px] left-[122px]" />

          <nav aria-label="Main" className="absolute top-1/2 left-[calc(50%-0.5px)] -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-start gap-6 whitespace-nowrap text-gray-50">
              {mainNav.map((item, i) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    aria-current={i === 0 ? "page" : undefined}
                    className={cn(
                      "block font-sans text-[16px] transition-opacity hover:opacity-80",
                      i === 0 ? "leading-[1.2] font-medium" : "leading-[1.6]",
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute top-12 right-[120px] flex items-start justify-end gap-6">
            <Link href="/login" className="font-sans text-[16px] leading-6 text-gray-50 hover:opacity-80">
              Sign In
            </Link>
            <Link href="/register" className="font-sans text-[16px] leading-6 text-gray-50 hover:opacity-80">
              Join Us
            </Link>
            <button type="button" aria-label="Shopping bag" className="size-6 hover:opacity-80">
              <Image src="/images/icons/shopping-bag.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* Tablet & mobile layout */}
        <div className="hidden max-lg:block">
          <div className="flex items-center justify-between px-10 py-6 max-md:px-4 max-md:py-5">
            <Logo />
            <button
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-11 items-center justify-center rounded-full text-gray-50 transition-colors hover:bg-white/10"
            >
              <span className="relative block h-3.5 w-6" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1.5 left-0 h-0.5 w-6 rounded-full bg-current transition-opacity duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>

          {/* Overlay panel (never shifts page content). Expands/collapses smoothly by
              transitioning clip-path, which needs no fixed height. */}
          <div
            id={menuId}
            className={cn(
              "absolute inset-x-0 top-full duration-300 ease-out motion-reduce:transition-none",
              open
                ? // becomes visible instantly on open…
                  "visible translate-y-0 opacity-100 [transition-property:clip-path,opacity,translate] [clip-path:inset(0_0_0_0)]"
                : // …and stays visible until the closing animation has finished.
                  "pointer-events-none invisible -translate-y-2 opacity-0 [transition-property:clip-path,opacity,translate,visibility] [clip-path:inset(0_0_100%_0)]",
            )}
            inert={!open}
          >
            <div>
              <nav
                aria-label="Mobile"
                className="mx-10 mb-6 rounded-panel bg-primary p-2 shadow-2xl ring-1 ring-white/15 max-md:mx-4"
              >
                <ul className="flex flex-col">
                  {mainNav.map((item, i) => (
                    <li key={item.href}>
                      <NavLink
                        href={item.href}
                        onClick={close}
                        aria-current={i === 0 ? "page" : undefined}
                        className={cn(
                          "block rounded-xl px-4 py-3 font-sans text-[16px] text-gray-50 hover:bg-white/10",
                          i === 0 ? "font-medium" : "",
                        )}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                  <li className="my-2 h-px bg-white/15" aria-hidden />
                  <li>
                    <Link
                      href="/login"
                      onClick={close}
                      className="block rounded-xl px-4 py-3 font-sans text-[16px] text-gray-50 hover:bg-white/10"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      onClick={close}
                      className="block rounded-xl px-4 py-3 font-sans text-[16px] text-gray-50 hover:bg-white/10"
                    >
                      Join Us
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sans text-[16px] text-gray-50 hover:bg-white/10"
                    >
                      <Image src="/images/icons/shopping-bag.svg" alt="" width={24} height={24} />
                      Bag
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
