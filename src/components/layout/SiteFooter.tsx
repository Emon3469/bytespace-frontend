import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, legalLinks } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-[70px] pb-12 max-md:pt-12 max-md:pb-8">
      <div className="container-page">
        <div className="flex justify-between gap-10 max-lg:flex-col max-lg:gap-12">
          <div className="flex w-[528px] max-w-full flex-col gap-[45px] max-md:gap-8">
            <div className="flex flex-col gap-4">
              <Logo tone="dark" className="self-start" />
              <p className="font-sans text-body-s text-gray-950">
                Stay Up to date with our latest features and releases by joining our newsletter.
              </p>
            </div>

            <form action="/" className="flex w-[504px] max-w-full flex-col gap-6">
              <div className="flex items-start gap-6 max-md:flex-col max-md:items-stretch max-md:gap-3">
                <label className="flex h-[52px] w-[376px] max-w-full items-center rounded-pill border border-gray-200 px-6 max-md:w-full">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent font-sans text-body-m text-gray-950 outline-none placeholder:text-gray-950"
                  />
                </label>
                <Button type="submit">Search</Button>
              </div>
              <p className="font-sans text-body-xs text-gray-950">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>

          <nav
            aria-label="Footer"
            className="flex w-[580px] max-w-full gap-10 pt-12 max-lg:pt-0 max-md:grid max-md:grid-cols-2 max-md:gap-y-8"
          >
            {footerColumns.map((col) => (
              <div key={col.heading} className="w-[167px] max-md:w-auto">
                {/* Column headings exist in the Figma layers but are not visible */}
                <h2 className="sr-only">{col.heading}</h2>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="/"
                        className="block font-sans text-body-s whitespace-nowrap text-gray-950 hover:text-primary"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-[130px] border-t border-gray-200 pt-[22px] max-lg:mt-16">
          <div className="flex items-center justify-between gap-6 max-md:flex-col-reverse max-md:items-start">
            <p className="font-sans text-body-xs text-gray-950">@ 2023 ByteSpace. All rights reserved.</p>
            <ul className="flex gap-6 text-body-xs max-md:flex-wrap max-md:gap-y-2">
              {legalLinks.map((l) => (
                <li key={l}>
                  <Link
                    href="/"
                    className="block font-sans text-body-xs whitespace-nowrap text-gray-950 hover:text-primary"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
