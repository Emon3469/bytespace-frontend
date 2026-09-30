/**
 * Shared, framework-free validation for the auth forms. Used by the Server
 * Actions so rules are enforced on the server even if client-side
 * constraint validation is bypassed.
 */
export type AuthFormState = { error: string | null };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export function validateLogin(data: FormData): string | null {
  const email = text(data, "email");
  const password = typeof data.get("password") === "string" ? (data.get("password") as string) : "";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  if (!password) return "Please enter your password.";
  return null;
}

export function validateRegister(data: FormData): string | null {
  const name = text(data, "name");
  const email = text(data, "email");
  const password = typeof data.get("password") === "string" ? (data.get("password") as string) : "";
  if (name.length < 2) return "Please enter your full name.";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return null;
}
