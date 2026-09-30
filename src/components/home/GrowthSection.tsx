import Image from "next/image";
import type { ReactNode } from "react";
import { CourseCard } from "@/components/ui/CourseCard";
import { HappyStudentsCard, LearningProgressCard, RevenueCard } from "@/components/ui/FloatingCards";
import { Ornament } from "@/components/ui/Ornament";
import { featuredCourses } from "@/data/courses";

const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

const creatorPerks = ["Share Your Expertise", "Monetize Your Passion", "Flexibility and Autonomy", "Build a Community"];

/** Fixed-size illustration that scales down uniformly on small screens. */
function Illustration({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative shrink-0 [--k:1] max-md:[--k:0.56] max-[400px]:[--k:0.5]"
      style={{ width: `calc(${width}px * var(--k))`, height: `calc(${height}px * var(--k))` }}
    >
      <div className="absolute top-0 left-0 origin-top-left scale-(--k)" style={{ width, height }}>
        {children}
      </div>
    </div>
  );
}

const at = (x: number, y: number) => ({ left: x, top: y });

export function GrowthSection() {
  return (
    <section
      aria-label="Why ByteSpace"
      className="relative isolate h-[1460px] overflow-hidden bg-surface max-lg:h-auto max-lg:py-20 max-md:py-16"
    >
      {/* Soft colour glows */}
      <Image
        src="/images/decor/glow-cluster.svg"
        alt=""
        aria-hidden
        width={2536}
        height={2471}
        className="pointer-events-none absolute top-[-506px] left-[calc(50%-1268px)] -z-10 h-[2471px] w-[2536px] max-w-none"
      />
      <Image
        src="/images/decor/glow-lime.svg"
        alt=""
        aria-hidden
        width={752}
        height={752}
        className="pointer-events-none absolute top-[906px] left-[calc(50%-1047px)] -z-10 size-[752px] max-w-none"
      />

      <div className="container-page flex flex-col gap-[72px] pt-[120px] pl-[121px] max-lg:gap-20 max-lg:pt-0 max-lg:pl-10 max-md:pl-4">
        {/* Row 1 — Professional growth */}
        <div className="reveal flex items-center gap-[63px] max-lg:flex-col max-lg:gap-12">
          <div className="flex w-[574px] max-w-full flex-col gap-10 max-md:gap-6">
            <h2 className="font-display w-[577px] max-w-full text-heading-m font-semibold text-gray-950 max-md:text-[32px]">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="w-[477px] max-w-full font-sans text-body-l text-gray-700 max-md:text-[16px]">
              Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career
              journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new
              career path entirely, we have the resources you need.
            </p>
            <dl className="flex items-end gap-14 whitespace-nowrap max-md:gap-8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse items-start">
                  <dt className="font-sans text-body-l text-gray-700">{s.label}</dt>
                  <dd className="font-display text-display-xs font-medium text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Illustration width={621} height={552}>
            <div className="absolute top-0 left-0">
              <CourseCard course={featuredCourses[0]} variant="showcase" decorative />
            </div>
            <Image
              src="/images/hero/student-headphones.png"
              alt=""
              width={577}
              height={540}
              sizes="577px"
              className="drop-shadow-float absolute top-3 left-0 h-[540px] w-[577px] max-w-none object-cover"
            />
            <div className="absolute" style={at(345, 213)}>
              <LearningProgressCard relaxed />
            </div>
            <div className="animate-float absolute [animation-duration:7s]" style={at(406, 67)}>
              <Ornament name="coil-a-lime" size={215} />
            </div>
          </Illustration>
        </div>

        {/* Row 2 — Creators */}
        <div className="reveal flex items-center gap-[79px] max-lg:flex-col-reverse max-lg:gap-12">
          <Illustration width={541} height={596}>
            <div className="absolute" style={at(0, 44)}>
              <RevenueCard title="Total Revenue" period="July 1-28" value="$120.29" layout="inline" />
            </div>
            <div className="absolute" style={at(0, 194)}>
              <RevenueCard
                title="Year to Date"
                period="2023"
                value="$1,200.38"
                layout="stacked"
                className="w-[134px]"
              />
            </div>
            <div className="drop-shadow-float absolute top-0 left-[28px] h-[596px] w-[435px]">
              <div className="relative size-full overflow-hidden">
                <Image
                  src="/images/hero/creator-headphones.png"
                  alt=""
                  width={683}
                  height={683}
                  sizes="683px"
                  className="absolute top-0 left-[-28.51%] h-[114.6%] w-[157.01%] max-w-none"
                />
              </div>
            </div>
            <div className="absolute" style={at(283, 413)}>
              <HappyStudentsCard variant="compact" />
            </div>
            <div className="animate-float absolute [animation-duration:8s] [animation-delay:-3s]" style={at(305, 114)}>
              <Ornament name="coil-b-lime" size={215} />
            </div>
          </Illustration>

          <div className="flex w-[580px] max-w-full flex-col gap-10 max-md:gap-6">
            <h2 className="font-display w-[391px] max-w-full text-heading-m font-semibold text-gray-950 max-md:text-[32px]">
              Create &amp; Manage Courses Easily.
            </h2>
            <p className="w-[574px] max-w-full font-sans text-body-l text-gray-700 max-md:text-[16px]">
              <strong className="leading-[28px] font-bold text-gray-950">ByteSpace</strong> supports individuals or
              entities in the creation, publication, and administration of educational courses.
            </p>
            <ul className="flex flex-col gap-4">
              {creatorPerks.map((perk) => (
                <li key={perk} className="flex items-end gap-2">
                  <Image src="/images/icons/check-circle.svg" alt="" width={24} height={24} className="size-6" />
                  <span className="font-sans text-label-l font-medium whitespace-nowrap text-gray-950">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
