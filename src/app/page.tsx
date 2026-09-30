import { CreatorCta } from "@/components/home/CreatorCta";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { GrowthSection } from "@/components/home/GrowthSection";
import { Hero } from "@/components/home/Hero";
import { LearningPaths } from "@/components/home/LearningPaths";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Partners />
        <FeaturedCourses />
        <LearningPaths />
        <GrowthSection />
        <CreatorCta />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  );
}
