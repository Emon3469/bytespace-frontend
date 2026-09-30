import Image from "next/image";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/cn";

/** Soft radial glow matching the Figma blurred ellipses. */
function Glow({ className, color, opacity }: { className: string; color: "lime" | "blue"; opacity: number }) {
  const rgb = color === "lime" ? "203 252 1" : "0 59 226";
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 rounded-full blur-[20px]", className)}
      style={{
        opacity,
        background: `radial-gradient(closest-side, rgb(${rgb}) 0%, rgb(${rgb} / 0.23) 53%, rgb(${rgb} / 0.06) 75%, rgb(${rgb} / 0) 100%)`,
      }}
    />
  );
}

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-hidden bg-surface pt-[74px] pb-[60px] max-lg:py-20 max-md:py-16"
    >
      <Glow color="lime" opacity={0.4} className="top-[-241px] left-[calc(50%+122px)] size-[1137px]" />
      <Glow color="lime" opacity={0.6} className="top-[-138px] left-[calc(50%-325px)] size-[672px]" />
      <Glow color="blue" opacity={0.24} className="top-[149px] left-[calc(50%-1162px)] size-[1137px]" />

      <div className="mx-auto w-[1204px] max-w-full max-lg:px-10 max-md:px-4">
        <div className="reveal flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6">
          <h2
            id="testimonials-title"
            className="font-display w-[577px] max-w-full text-heading-m font-semibold text-black max-md:text-[32px]"
          >
            Discover What Our Community Is Saying
          </h2>
          <p className="mr-1 w-[580px] max-w-full font-sans text-body-l text-gray-700 max-md:text-[16px]">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly
            from those who have experienced the transformative journey of learning and creating on our platform. Explore
            testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>

        <ul className="mt-[72px] grid grid-cols-[repeat(3,374px)] items-start gap-[41px] max-lg:mt-12 max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1">
          {testimonials.map((t) => (
            <li key={t.name} className="reveal">
              <figure className="flex flex-col gap-6 rounded-card bg-white p-6">
                <Image
                  src={t.avatar}
                  alt={`Portrait of ${t.name}`}
                  width={80}
                  height={80}
                  className="size-20 rounded-full"
                />
                <figcaption className="flex flex-col">
                  <span
                    className={cn(
                      "font-display text-[20px] font-semibold tracking-[-0.01em] text-black",
                      t.tightName ? "leading-[1.2]" : "leading-[28px]",
                    )}
                  >
                    {t.name}
                  </span>
                  <span className="font-sans text-body-l text-primary">{t.role}</span>
                </figcaption>
                <blockquote className="font-sans text-body-l text-gray-700">&quot;{t.quote}&quot;</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
