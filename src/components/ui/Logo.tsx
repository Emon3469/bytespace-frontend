import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  tone?: "light" | "dark";
  /** Auth screens show the mark only (the wordmark is not visible in the design). */
  markOnly?: boolean;
  className?: string;
};

export function Logo({ tone = "light", markOnly = false, className }: LogoProps) {
  return (
    <Link href="/" aria-label="ByteSpace home" className={cn("inline-flex items-start gap-[8.125px]", className)}>
      <Image
        src="/images/brand/logo-mark.svg"
        alt=""
        width={28.875}
        height={31.5}
        className="h-[31.5px] w-[28.875px] shrink-0"
      />
      {!markOnly && (
        <span
          className={cn(
            "mt-[7px] font-brand text-[24px] leading-[30px] font-bold whitespace-nowrap",
            tone === "light" ? "text-gray-50" : "text-gray-950",
          )}
        >
          ByteSpace
        </span>
      )}
    </Link>
  );
}
