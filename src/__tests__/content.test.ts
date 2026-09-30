import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { featuredCourses, learnerAvatars, learningPaths, studentAvatars } from "@/data/courses";
import { partners, testimonials } from "@/data/site";
import { cn } from "@/lib/cn";

const publicDir = join(process.cwd(), "public");
const exists = (src: string) => existsSync(join(publicDir, src));

describe("content & assets", () => {
  it("references only images that exist in /public", () => {
    const srcs = [
      ...featuredCourses.map((c) => c.image),
      ...learningPaths.map((p) => p.icon),
      ...learnerAvatars,
      ...studentAvatars,
      ...partners.map((p) => p.src),
      ...testimonials.map((t) => t.avatar),
    ];
    expect(srcs.filter((s) => !exists(s))).toEqual([]);
  });

  it("ships all 12 ornament renders", () => {
    expect(readdirSync(join(publicDir, "images/ornaments"))).toHaveLength(12);
  });

  it("gives each course a unique id and descriptive alt text", () => {
    expect(new Set(featuredCourses.map((c) => c.id)).size).toBe(featuredCourses.length);
    for (const c of featuredCourses) expect(c.imageAlt.length).toBeGreaterThan(10);
  });

  it("cn() joins truthy class names only", () => {
    expect(cn("a", false, undefined, "b", null, "")).toBe("a b");
  });
});
