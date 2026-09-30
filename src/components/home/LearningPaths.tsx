import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { learningPaths } from "@/data/courses";

export function LearningPaths() {
  return (
    <section
      aria-labelledby="paths-title"
      className="container-page pt-[72px] pb-[120px] max-lg:pb-20 max-md:pt-14 max-md:pb-16"
    >
      <SectionHeading
        id="paths-title"
        size="s"
        title="Explore Diverse Learning Paths at Bytespace"
        titleClassName="whitespace-nowrap max-lg:whitespace-normal"
        description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
      />

      <ul className="mt-[68px] flex justify-center gap-10 max-lg:mt-12 max-lg:grid max-lg:grid-cols-[repeat(3,167px)] max-lg:gap-6 max-md:grid-cols-[repeat(2,minmax(0,167px))] max-md:gap-4">
        {learningPaths.map((path) => (
          <li key={path.label} className="reveal">
            <a
              href="#courses"
              className="flex size-[167px] flex-col items-center justify-center gap-3 rounded-card border border-gray-200 transition-colors duration-200 hover:border-primary max-md:size-auto max-md:aspect-square max-md:w-full"
            >
              <span className="flex items-center justify-center rounded-[40px] bg-lime p-3">
                <Image src={path.icon} alt="" width={36} height={36} className="size-9" />
              </span>
              <span className="font-sans text-label-xl font-medium whitespace-nowrap text-gray-950">{path.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
