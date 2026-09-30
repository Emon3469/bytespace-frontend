"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { useAuthSubmit } from "./useAuthSubmit";

export function RegisterForm() {
  const { pending, onSubmit } = useAuthSubmit();

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-end gap-6" aria-busy={pending}>
      <div className="flex w-full flex-col gap-6">
        <Field label="Full Name" name="name" autoComplete="name" placeholder="Jamie Davis" required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="designer@example.com"
          required
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="********"
          minLength={8}
          required
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating…" : "Continue"}
      </Button>
    </form>
  );
}
