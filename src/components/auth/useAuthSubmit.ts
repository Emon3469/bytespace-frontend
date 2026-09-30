"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

/**
 * Frontend-only submit handler. Native constraint validation runs first
 * (required / type="email" / minLength); on success we show a pending state
 * and route home. Swap the timeout for a real API call when a backend exists.
 */
export function useAuthSubmit() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/");
  }

  return { pending, onSubmit };
}
