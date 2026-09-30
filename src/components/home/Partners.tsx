import Image from "next/image";
import { partners } from "@/data/site";

export function Partners() {
  return (
    <section aria-label="Trusted by" className="h-[202px] bg-gray-50 pt-20 max-lg:h-auto max-lg:py-12">
      <ul className="mx-auto flex w-fit items-end gap-[72px] max-lg:w-full max-lg:flex-wrap max-lg:justify-center max-lg:gap-x-12 max-lg:gap-y-8 max-lg:px-10 max-md:gap-x-8 max-md:px-4">
        {partners.map((logo, i) => (
          <li key={logo.src} className="shrink-0">
            <Image
              src={logo.src}
              alt={`Partner logo ${i + 1} (Logoipsum)`}
              width={logo.width}
              height={logo.height}
              style={{ width: logo.width, height: logo.height }}
              className="max-md:h-8! max-md:w-auto!"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
