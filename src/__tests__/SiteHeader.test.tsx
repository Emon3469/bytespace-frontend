import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/SiteHeader";

describe("SiteHeader", () => {
  it("renders the primary navigation with Home marked as the current page", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Home" })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("link", { name: "Sign In" })[0]).toHaveAttribute("href", "/login");
    expect(screen.getAllByRole("link", { name: "Join Us" })[0]).toHaveAttribute("href", "/register");
  });

  it("toggles the mobile menu and keeps aria-expanded in sync", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    const menu = document.getElementById(toggle.getAttribute("aria-controls")!)!;

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("inert");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");
    expect(menu).not.toHaveAttribute("inert");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu on Escape and after choosing a link", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Open menu" });

    await user.click(toggle);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    // jsdom cannot perform real navigations; stop the default so only our handler runs.
    mobileNav.addEventListener("click", (e) => e.preventDefault());
    await user.click(mobileNav.querySelector('a[href="/login"]')!);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
