import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PlaceProps = {
  /** Artboard x (px) — converted to an offset from the horizontal centre. */
  x: number;
  /** Top offset (px) inside the positioned parent. */
  y: number;
  /** Artboard width the x coordinate refers to (default 1440). */
  frame?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Absolutely places a child at Figma artboard coordinates while keeping it
 * centre-anchored, so compositions stay intact on viewports wider or narrower
 * than the 1440px design frame.
 */
export function Place({ x, y, frame = 1440, className, style, children }: PlaceProps) {
  return (
    <div className={cn("absolute", className)} style={{ ...style, left: `calc(50% + ${x - frame / 2}px)`, top: y }}>
      {children}
    </div>
  );
}
