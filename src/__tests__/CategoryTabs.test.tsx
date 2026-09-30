import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { courseCategories } from "@/data/courses";

describe("CategoryTabs", () => {
  it("renders every category from the design, with Featured selected", () => {
    render(<CategoryTabs />);
    for (const label of courseCategories.flat()) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: "Featured" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "+ More" })).toBeInTheDocument();
  });

  it("allows exactly one active category at a time", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs />);
    await user.click(screen.getByRole("button", { name: "Music" }));
    expect(screen.getByRole("button", { name: "Music" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Featured" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
  });
});
