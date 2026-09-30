import Image from "next/image";
import { studentAvatars } from "@/data/courses";
import { cn } from "@/lib/cn";
import { AvatarStack } from "./AvatarStack";

/* Small "glass" UI cards that float over the marketing illustrations. */

const panel = "flex flex-col gap-2 rounded-panel p-4 backdrop-blur-[10px]";

function ProgressBar({ track = "bg-track" }: { track?: string }) {
  return (
    <span className={cn("relative block h-2 w-[200px] rounded-pill", track)} aria-hidden>
      <span className="absolute inset-y-0 left-0 w-[112px] rounded-pill bg-lime" />
    </span>
  );
}

export function LearningProgressCard({ className, relaxed = false }: { className?: string; relaxed?: boolean }) {
  return (
    <div className={cn(panel, "items-start bg-white", className)}>
      <p className={cn("font-sans text-label-s font-medium text-gray-950", relaxed && "leading-6")}>
        Learning Progress
      </p>
      <p className="w-[200px] font-display text-stat font-semibold text-gray-950">55%</p>
      <ProgressBar />
    </div>
  );
}

type HappyStudentsCardProps = {
  className?: string;
  /** hero: 12px rating; compact: 10px bold rating (growth + auth); lime: auth variant */
  variant?: "hero" | "compact" | "lime";
};

export function HappyStudentsCard({ className, variant = "hero" }: HappyStudentsCardProps) {
  const compact = variant !== "hero";
  return (
    <div className={cn(panel, "w-[258px] justify-center", variant === "lime" ? "bg-lime" : "bg-white", className)}>
      <div className="flex flex-col items-start">
        <p className={cn("font-sans text-label-m font-medium text-gray-950", compact && "leading-6")}>Happy Students</p>
        <p className="flex items-center">
          {compact ? (
            <span className="font-sans text-body-2xs text-gray-400">
              <span className="font-bold text-gray-950">4.5 </span>(240)
            </span>
          ) : (
            <span className="font-sans text-body-xs text-gray-400">
              <span className="text-gray-950">4.5 </span>(240)
            </span>
          )}
          <span className="relative size-4 shrink-0">
            <Image
              src={variant === "lime" ? "/images/icons/star-blue.svg" : "/images/icons/star-lime.svg"}
              alt="rating star"
              width={13.1625}
              height={12.5676}
              className="absolute top-[6.92%] left-[8.87%] h-[78.55%] w-[82.26%]"
            />
          </span>
        </p>
      </div>
      <AvatarStack
        avatars={studentAvatars}
        count="2K+"
        size="md"
        counterTone={variant === "lime" ? "dark" : "lime"}
        label="Over 2,000 happy students"
      />
    </div>
  );
}

export function CategoryInfoCard({ className }: { className?: string }) {
  return (
    <div className={cn(panel, "items-start justify-center bg-white", className)}>
      <div className="flex flex-col items-start whitespace-nowrap">
        <p className="font-sans text-label-m font-medium text-gray-950">UI/UX Design</p>
        <p className="flex items-start gap-2 font-sans text-gray-400">
          <span className="text-body-xs">200 Courses</span>
          <span className="text-body-2xs" aria-hidden>
            •
          </span>
          <span className="text-body-xs">1000+ Students</span>
        </p>
      </div>
    </div>
  );
}

type RevenueCardProps = {
  title: string;
  period: string;
  value: string;
  layout: "inline" | "stacked";
  className?: string;
};

export function RevenueCard({ title, period, value, layout, className }: RevenueCardProps) {
  const badge = (
    <span className="flex items-center justify-center rounded-pill bg-lime-500 px-2 py-0.5 font-sans text-[10px] leading-5 font-medium text-gray-950">
      +12$
    </span>
  );
  const amount = <p className="font-display text-heading-xxs font-semibold whitespace-nowrap text-gray-50">{value}</p>;
  return (
    <div className={cn(panel, "items-start bg-primary", className)}>
      <div className="flex flex-col items-start whitespace-nowrap text-gray-50">
        <p className="font-sans text-label-m font-medium">{title}</p>
        <p className="font-sans text-[10px] leading-[1.2]">{period}</p>
      </div>
      {layout === "inline" ? (
        <>
          <div className="flex w-[200px] items-center justify-between">
            {amount}
            {badge}
          </div>
          <ProgressBar track="bg-white" />
        </>
      ) : (
        <>
          {amount}
          {badge}
        </>
      )}
    </div>
  );
}
