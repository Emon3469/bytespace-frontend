import { CourseCard } from "@/components/ui/CourseCard";
import { HappyStudentsCard } from "@/components/ui/FloatingCards";
import { Ornament } from "@/components/ui/Ornament";
import { featuredCourses } from "@/data/courses";

const [, digitalAsset, bigData] = featuredCourses;

/**
 * Decorative collage on the left of the auth screens.
 * Coordinates are relative to the collage origin (artboard x 97, y 305).
 */
export function AuthShowcase() {
  return (
    <div aria-hidden className="relative h-[585px] w-[723px]">
      <div className="absolute top-[89px] left-[25px]">
        <CourseCard course={digitalAsset} variant="showcase" starTone="lime" decorative />
      </div>
      <div className="absolute top-0 left-[136px]">
        <CourseCard course={bigData} variant="showcase" starTone="lime" decorative />
      </div>
      <div className="absolute top-[435px] left-[251px]">
        <HappyStudentsCard variant="lime" />
      </div>
      <div className="absolute top-[321px] left-[373px]">
        <Ornament name="coil-b-white-flip" size={175} />
      </div>
      <div className="absolute top-[15px] left-[54px]">
        <Ornament name="torus-lime" size={146} />
      </div>
      <div className="absolute top-[397px] left-0">
        <Ornament name="cone-lime" size={188} />
      </div>
    </div>
  );
}
