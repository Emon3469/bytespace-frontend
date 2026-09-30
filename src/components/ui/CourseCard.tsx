import Image from "next/image";
import type { Course } from "@/data/courses";
import { learnerAvatars } from "@/data/courses";
import { cn } from "@/lib/cn";
import { AvatarStack } from "./AvatarStack";

type CourseCardProps = {
  course: Course;
  /**
   * The Figma file uses two variants of this card:
   * - "catalog": 1.2 line-heights, lime enrolment bubble, grey star (home grid)
   * - "showcase": 20/28px line-heights, dark enrolment bubble (marketing & auth visuals)
   */
  variant?: "catalog" | "showcase";
  starTone?: "gray" | "lime";
  className?: string;
  headingLevel?: "h3" | "h4";
  /** Mark as decorative (auth illustrations) so it is skipped by assistive tech. */
  decorative?: boolean;
  /** Subtle hover lift for cards in the catalog grid. */
  interactive?: boolean;
};

export function CourseCard({
  course,
  variant = "catalog",
  starTone = "gray",
  className,
  headingLevel: Heading = "h3",
  decorative = false,
  interactive = false,
}: CourseCardProps) {
  const relaxed = variant === "showcase";
  const pillText = cn("font-sans text-label-xs font-medium text-neutral-700", relaxed && "leading-5");

  return (
    <article
      aria-hidden={decorative || undefined}
      className={cn(
        "relative flex h-[384px] w-[373px] flex-col overflow-hidden rounded-card border border-gray-200 bg-white p-[15px]",
        interactive &&
          "transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgb(0_59_226/0.25)]",
        className,
      )}
    >
      <div className="relative aspect-[341/195.145] w-full shrink-0 overflow-hidden rounded-media bg-[#443131]">
        <Image
          src={course.image}
          alt={decorative ? "" : course.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 341px"
          className="rounded-media object-cover"
        />
        {/* Figma pins the pills 150px from the top of a 195px image; anchoring to the
            bottom keeps that position when the card stretches on smaller screens. */}
        <ul className={cn("absolute left-[13px] flex gap-3", relaxed ? "bottom-[13.145px]" : "bottom-[18.745px]")}>
          {[`${course.lessons} Lessons`, course.duration, `${course.comments} Comments`].map((label) => (
            <li
              key={label}
              className={cn("rounded-pill bg-pill px-3 py-1.5 whitespace-nowrap backdrop-blur-[4px]", pillText)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[20.855px] flex min-w-0 items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex min-w-0 flex-col">
            <Heading
              className={cn(
                "max-w-[280px] truncate font-display text-heading-xs font-semibold text-black",
                relaxed && "leading-[28px]",
              )}
              title={course.title}
            >
              {course.title}
            </Heading>
            <p className={cn("font-sans text-body-xs text-neutral-700", relaxed && "leading-5")}>
              by <span className="text-primary">{course.author}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center gap-1 rounded-pill bg-gray-50 px-3 py-1.5">
              <Image src="/images/icons/signal.svg" alt="" width={20} height={20} className="size-5" />
              <span className={cn("font-sans text-label-xs font-medium text-gray-700", relaxed && "leading-5")}>
                {course.level}
              </span>
            </span>
            <AvatarStack
              avatars={learnerAvatars}
              count={`${course.enrolledExtra}+`}
              size="sm"
              counterTone={relaxed ? "dark" : "lime"}
              label={`${course.enrolledExtra}+ more learners enrolled`}
            />
          </div>

          <p className="flex items-end">
            <span className="h-6 font-display text-heading-xs font-semibold text-primary">${course.price}</span>
            <span className={cn("font-sans text-body-xs text-neutral-700", relaxed && "leading-5")}>/lifetime</span>
          </p>
        </div>

        <p
          className={cn(
            "mr-[1px] flex shrink-0 items-center font-sans text-[18px] text-neutral-700",
            relaxed ? "leading-[28px] font-medium" : "leading-[1.6]",
          )}
        >
          <span>{course.rating}</span>
          <span aria-hidden> </span>
          <Image
            src={starTone === "lime" ? "/images/icons/star-rate-lime.svg" : "/images/icons/star-gray.svg"}
            alt="out of 5 stars"
            width={24}
            height={24}
            className="size-6"
          />
        </p>
      </div>
    </article>
  );
}
