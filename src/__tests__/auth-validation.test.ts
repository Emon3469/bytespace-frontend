import { describe, expect, it } from "vitest";
import { validateLogin, validateRegister } from "@/lib/auth-validation";

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [k, v] of Object.entries(fields)) data.set(k, v);
  return data;
};

describe("validateLogin", () => {
  it("accepts a valid email and password", () => {
    expect(validateLogin(form({ email: "a@b.co", password: "x" }))).toBeNull();
  });

  it.each([
    [{ email: "", password: "secret" }, /valid email/],
    [{ email: "not-an-email", password: "secret" }, /valid email/],
    [{ email: "a@b.co", password: "" }, /password/],
    [{}, /valid email/],
  ])("rejects %o", (fields, message) => {
    expect(validateLogin(form(fields as Record<string, string>))).toMatch(message);
  });
});

describe("validateRegister", () => {
  const valid = { name: "Jamie Davis", email: "jamie@example.com", password: "12345678" };

  it("accepts valid details", () => {
    expect(validateRegister(form(valid))).toBeNull();
  });

  it("trims whitespace before validating", () => {
    expect(validateRegister(form({ ...valid, name: "   " }))).toMatch(/full name/);
    expect(validateRegister(form({ ...valid, email: "  jamie@example.com  " }))).toBeNull();
  });

  it("requires a password of at least 8 characters", () => {
    expect(validateRegister(form({ ...valid, password: "1234567" }))).toMatch(/at least 8/);
  });
});
