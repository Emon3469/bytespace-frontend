import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: string[];
  count: string;
  size: "sm" | "md";
  counterTone?: "lime" | "dark";
  label: string;
};

/**
 * Overlapping avatar row with a trailing counter bubble.
 * sm = 32px avatars overlapping by 8px (course cards)
 * md = 43px avatars overlapping by 16px (Happy Students cards)
 */
export function AvatarStack({ avatars, count, size, counterTone = "lime", label }: AvatarStackProps) {
  const px = size === "sm" ? 32 : 43;
  return (
    <div className="flex items-start" role="group" aria-label={label}>
      {avatars.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt=""
          width={px}
          height={px}
          className={cn(
            "relative shrink-0 rounded-full",
            size === "sm" ? "mr-[-8px] size-8" : "mr-[-16px] size-[43px]",
          )}
        />
      ))}
      <span
        className={cn(
          "relative shrink-0 rounded-full",
          counterTone === "lime" ? "bg-lime text-gray-950" : "bg-black text-white",
          size === "sm"
            ? "flex size-8 items-center justify-center pl-px font-sans text-[12px] leading-5 font-medium"
            : "size-[43px] pt-[13px] pl-3 font-sans text-[12px] leading-[1.5] font-bold",
        )}
      >
        {count}
      </span>
    </div>
  );
}
