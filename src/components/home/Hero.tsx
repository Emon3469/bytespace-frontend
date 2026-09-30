import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CategoryInfoCard, HappyStudentsCard, LearningProgressCard } from "@/components/ui/FloatingCards";
import { Ornament } from "@/components/ui/Ornament";
import { Place } from "@/components/ui/Place";

/** Stage coordinates: the illustration starts at artboard y = 512. */
const STAGE_Y = 512;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-[904px] overflow-hidden bg-primary grid-lines [--k:1] max-lg:h-auto max-lg:[--k:0.72] max-md:[--k:0.5] max-[480px]:[--k:0.44]"
    >
      <div className="relative z-10 mx-auto mt-[49px] flex w-full max-w-[1200px] flex-col items-center gap-[60px] max-lg:mt-6 max-lg:gap-10 max-lg:px-10 max-md:px-4">
        <div className="flex w-full flex-col items-center gap-8 text-center max-md:gap-5">
          <h1
            id="hero-title"
            className="w-[935px] max-w-full animate-fade-up font-display text-heading-l font-semibold text-white max-lg:text-[56px] max-md:text-[36px]"
          >
            Get Access to Hundreds Courses Available
          </h1>
          <p className="animate-fade-up font-sans text-body-l whitespace-nowrap text-gray-100 [animation-delay:120ms] max-lg:whitespace-normal max-md:text-[16px]">
            Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
          </p>
        </div>

        <form
          role="search"
          action="/"
          className="flex animate-fade-up items-start gap-4 [animation-delay:240ms] max-md:w-full max-md:flex-col max-md:items-stretch max-md:gap-3"
        >
          <label className="flex h-[52px] w-[461px] items-center gap-2 rounded-pill bg-white px-6 py-3 max-md:w-full">
            <Image src="/images/icons/search.svg" alt="" width={24} height={24} className="size-6 shrink-0" />
            <span className="sr-only">Search courses, topics or creators</span>
            <input
              type="search"
              name="q"
              placeholder="Course, topic, creator"
              className="w-full min-w-0 bg-transparent font-sans text-body-l text-gray-950 outline-none placeholder:text-gray-400"
            />
          </label>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {/* Illustration stage (artboard y 512 → 1024) */}
      <div className="relative mt-[-2px] h-[calc(512px*var(--k))] max-lg:mt-10" aria-hidden>
        <div className="absolute top-0 left-1/2 h-[512px] w-[1440px] origin-top -translate-x-1/2 scale-(--k)">
          <Image
            src="/images/decor/hero-ring.svg"
            alt=""
            loading="eager"
            width={1149}
            height={1149}
            className="absolute top-[70px] left-[calc(50%-0.5px)] size-[1149px] max-w-none -translate-x-1/2"
          />
          <Image
            src="/images/hero/student-headphones.png"
            alt=""
            width={578}
            height={541}
            preload
            sizes="578px"
            className="absolute top-0 left-1/2 h-[541px] w-[578px] max-w-none -translate-x-1/2 object-cover drop-shadow-float"
          />
          <Place x={842} y={651 - STAGE_Y} className="animate-float [animation-delay:-1s]">
            <LearningProgressCard />
          </Place>
          <Place x={328} y={837 - STAGE_Y} className="animate-float [animation-delay:-3s]">
            <HappyStudentsCard />
          </Place>

          <Place x={1127} y={672 - STAGE_Y} className="animate-float [animation-duration:8s]">
            <Ornament eager name="coil-a-white" size={330} />
          </Place>
          <Place
            x={-118}
            y={221 - STAGE_Y}
            className="animate-float [animation-delay:-2s] [animation-duration:9s] max-lg:hidden"
          >
            <Ornament eager name="coil-b-lime" size={385} />
          </Place>
          <Place
            x={183}
            y={477 - STAGE_Y}
            className="animate-float [animation-delay:-4s] [animation-duration:7s] max-md:hidden"
          >
            <Ornament eager name="coil-b-white-flip" size={175} />
          </Place>
          <Place x={18} y={682 - STAGE_Y} className="animate-float [animation-delay:-5s] [animation-duration:10s]">
            <Ornament eager name="torus-white" size={342} />
          </Place>
          <Place
            x={1231}
            y={221 - STAGE_Y}
            className="animate-float [animation-delay:-6s] [animation-duration:9s] max-lg:hidden"
          >
            <Ornament eager name="cylinder-lime" size={370} />
          </Place>
          <Place
            x={1106}
            y={464 - STAGE_Y}
            className="animate-float [animation-delay:-2.5s] [animation-duration:7s] max-md:hidden"
          >
            <Ornament eager name="cone-white" size={188} />
          </Place>

          <Place x={404} y={639 - STAGE_Y} className="animate-float [animation-delay:-4.5s]">
            <CategoryInfoCard />
          </Place>
        </div>
      </div>
    </section>
  );
}
