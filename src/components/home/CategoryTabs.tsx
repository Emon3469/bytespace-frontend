"use client";

import { useState } from "react";
import { courseCategories } from "@/data/courses";
import { cn } from "@/lib/cn";

/**
 * Category filter chips. The three rows reproduce the exact line breaks of the
 * design on desktop; below 1024px the rows dissolve (`display: contents`) into
 * one wrapping list.
 */
export function CategoryTabs() {
  const [active, setActive] = useState(courseCategories[0][0]);

  return (
    <div
      role="toolbar"
      aria-label="Filter courses by category"
      className="flex flex-col items-center gap-[21px] max-lg:flex-row max-lg:flex-wrap max-lg:justify-center max-lg:gap-3"
    >
      {courseCategories.map((row, r) => (
        <div key={r} className="flex items-center gap-4 max-lg:contents">
          {row.map((label) => {
            const selected = label === active;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(label)}
                className={cn(
                  "shrink-0 rounded-pill px-4 py-3 text-center font-sans text-label-m font-medium whitespace-nowrap transition-colors duration-200",
                  selected ? "bg-lime text-gray-950" : "bg-gray-50 text-gray-700 hover:bg-gray-100",
                )}
              >
                {label}
              </button>
            );
          })}
          {r === courseCategories.length - 1 && (
            <button
              type="button"
              className="shrink-0 text-center font-sans text-label-m font-medium whitespace-nowrap text-primary hover:underline max-lg:px-4 max-lg:py-3"
            >
              + More
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
