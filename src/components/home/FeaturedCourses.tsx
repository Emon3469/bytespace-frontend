import { CourseCard } from "@/components/ui/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredCourses } from "@/data/courses";
import { CategoryTabs } from "./CategoryTabs";

export function FeaturedCourses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="container-page scroll-mt-6 pt-[72px] max-md:pt-14">
      <SectionHeading
        id="courses-title"
        title={
          <>
            Discover Your Passion, <br className="max-md:hidden" />
            Build Your Skills
          </>
        }
        description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        titleClassName="w-[588px] max-w-full"
      />

      <div className="mt-[42px] max-md:mt-8">
        <CategoryTabs />
      </div>

      <ul className="mt-[77px] grid grid-cols-[repeat(3,373px)] gap-10 max-lg:justify-center max-lg:mt-12 max-lg:grid-cols-[repeat(2,minmax(0,373px))] max-lg:gap-6 max-md:grid-cols-[minmax(0,373px)] max-md:mt-10">
        {featuredCourses.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} className="max-lg:w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
