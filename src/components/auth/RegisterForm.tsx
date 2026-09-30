"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { useActionState } from "react";
import { register } from "@/app/(auth)/actions";
import type { AuthFormState } from "@/lib/auth-validation";
import { FormError } from "./FormError";

const initialState: AuthFormState = { error: null };

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <form action={formAction} className="flex flex-col items-end gap-6" aria-busy={pending}>
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
      <FormError message={state.error} />
      <Button type="submit" disabled={pending}>
        {pending ? "Creating…" : "Continue"}
      </Button>
    </form>
  );
}
