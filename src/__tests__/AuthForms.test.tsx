import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const actions = vi.hoisted(() => ({
  signIn: vi.fn(),
  register: vi.fn(),
}));
vi.mock("@/app/(auth)/actions", () => actions);

describe("Auth forms", () => {
  beforeEach(() => {
    actions.signIn.mockReset();
    actions.register.mockReset();
  });

  it("labels every Register field and applies validation constraints", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("Full Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute("minlength", "8");
    expect(screen.getByLabelText("Password")).toHaveAttribute("autocomplete", "new-password");
  });

  it("does not submit an invalid Register form", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(actions.register).not.toHaveBeenCalled();
    expect((screen.getByLabelText("Email") as HTMLInputElement).validity.valueMissing).toBe(true);
  });

  it("sends the form data to the sign-in action and shows a pending state", async () => {
    let resolve!: (v: { error: null }) => void;
    actions.signIn.mockImplementation(() => new Promise((r) => (resolve = r)));
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "designer@example.com");
    await user.type(screen.getByLabelText("Password"), "supersecret");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => expect(screen.getByRole("button", { name: "Signing in…" })).toBeDisabled());
    const formData = actions.signIn.mock.calls[0][1] as FormData;
    expect(formData.get("email")).toBe("designer@example.com");
    expect(formData.get("password")).toBe("supersecret");

    resolve({ error: null });
    await waitFor(() => expect(screen.getByRole("button", { name: "Sign In" })).toBeEnabled());
  });

  it("shows the server validation message returned by the action", async () => {
    actions.register.mockResolvedValue({ error: "Please enter a valid email address." });
    const user = userEvent.setup();
    render(<RegisterForm />);
    await user.type(screen.getByLabelText("Full Name"), "Jamie Davis");
    await user.type(screen.getByLabelText("Email"), "jamie@example.com");
    await user.type(screen.getByLabelText("Password"), "long-enough-password");
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please enter a valid email address.");
  });

  it("offers accessible social sign-in buttons", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: "Continue with Facebook" })).toHaveAttribute("type", "button");
    expect(screen.getByRole("button", { name: "Continue with Google" })).toHaveAttribute("type", "button");
  });
});
