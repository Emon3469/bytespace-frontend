import { ButtonLink } from "@/components/ui/Button";
import { Ornament, type OrnamentName } from "@/components/ui/Ornament";
import { Place } from "@/components/ui/Place";

const ornaments: Array<{ name: OrnamentName; size: number; x: number; y: number; mobile?: boolean }> = [
  { name: "cone-lime", size: 188, x: 1080, y: 0 },
  { name: "coil-a-lime", size: 330, x: 1110, y: 289, mobile: true },
  { name: "coil-b-lime", size: 385, x: -118, y: -162, mobile: true },
  { name: "coil-b-white-flip", size: 175, x: 178, y: 5 },
  { name: "cone2-white", size: 188, x: -48, y: 225 },
  { name: "torus-lime", size: 342, x: 18, y: 299 },
  { name: "cylinder-white", size: 370, x: 1226, y: 6 },
];

export function CreatorCta() {
  return (
    <section
      id="creators"
      aria-labelledby="cta-title"
      className="grid-lines relative isolate h-[488px] overflow-hidden bg-primary max-lg:h-auto max-lg:py-24 max-md:py-20"
    >
      <div className="reveal relative mx-auto flex w-[964px] max-w-full flex-col items-center gap-10 pt-[85px] text-center max-lg:px-10 max-lg:pt-0 max-md:gap-6 max-md:px-4">
        <h2
          id="cta-title"
          className="font-display w-[710px] max-w-full text-heading-m font-semibold text-gray-50 max-md:text-[32px]"
        >
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="font-sans text-body-l text-gray-50 max-md:text-[16px]">
          Experience the collaboration of numerous creators and an expanding selection of courses. Register now and
          become a part of a community comprising over 10,000 local and international creators. Utilize our Course
          Editor, and showcase your expertise by publishing your finest course on the ByteSpace Course Library.
        </p>
        <ButtonLink href="/register">Join as Creator</ButtonLink>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 max-lg:-z-10 max-md:[--orn-scale:0.5]">
        {ornaments.map((o, i) => (
          <Place
            key={o.name}
            x={o.x}
            y={o.y}
            className={`animate-float ${o.mobile ? "" : "max-md:hidden"}`}
            style={{ animationDuration: `${7 + (i % 3)}s`, animationDelay: `${-i * 1.3}s` }}
          >
            <Ornament name={o.name} size={o.size} />
          </Place>
        ))}
      </div>
    </section>
  );
}
