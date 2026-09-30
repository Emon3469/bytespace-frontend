import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type OrnamentName =
  | "coil-a-lime"
  | "coil-a-white"
  | "coil-b-lime"
  | "coil-b-white-flip"
  | "cone-lime"
  | "cone-white"
  | "cone2-lime"
  | "cone2-white"
  | "cylinder-lime"
  | "cylinder-white"
  | "torus-lime"
  | "torus-white";

type OrnamentProps = {
  name: OrnamentName;
  /** Rendered square size in px at the 1440 artboard. */
  size: number;
  /** Load immediately (above-the-fold hero shapes) instead of lazily. */
  eager?: boolean;
  className?: string;
};

/**
 * Decorative 3D shapes. The PNGs are the Figma source renders recoloured with the
 * same hard-light colour overlay Figma applies, so they keep their transparency.
 * Position is supplied by the caller through `className`.
 */
export function Ornament({ name, size, eager = false, className }: OrnamentProps) {
  return (
    <Image
      src={`/images/ornaments/${name}.png`}
      alt=""
      aria-hidden
      loading={eager ? "eager" : "lazy"}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn(
        "pointer-events-none absolute size-[calc(var(--orn-size)*var(--orn-scale,1))] max-w-none select-none",
        className,
      )}
      style={{ "--orn-size": `${size}px` } as CSSProperties}
    />
  );
}
