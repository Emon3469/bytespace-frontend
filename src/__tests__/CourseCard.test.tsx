import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseCard } from "@/components/ui/CourseCard";
import { featuredCourses } from "@/data/courses";

// A long title that the design truncates with an ellipsis.
const course = featuredCourses[3];

describe("CourseCard", () => {
  it("shows the course details from the design", () => {
    render(<CourseCard course={course} />);
    expect(screen.getByRole("heading", { name: course.title })).toHaveAttribute("title", course.title);
    expect(screen.getByText("purepearl studio")).toBeInTheDocument();
    expect(screen.getByText("17 Lessons")).toBeInTheDocument();
    expect(screen.getByText("2 hours 16 mins")).toBeInTheDocument();
    expect(screen.getByText("59 Comments")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("$25")).toBeInTheDocument();
    expect(screen.getByText("/lifetime")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: course.imageAlt })).toHaveAttribute("src", course.image);
  });

  it("is hidden from assistive technology when decorative", () => {
    const { container } = render(<CourseCard course={course} decorative />);
    expect(container.querySelector("article")).toHaveAttribute("aria-hidden", "true");
  });
});
