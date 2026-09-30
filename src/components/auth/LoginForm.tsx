"use client";

import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { useAuthSubmit } from "./useAuthSubmit";

function FacebookIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden fill="#000">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden fill="#000">
      <path d="M21.35 11.1H12.18v2.98h5.27c-.23 1.42-1.66 4.16-5.27 4.16-3.17 0-5.76-2.63-5.76-5.87s2.59-5.87 5.76-5.87c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.78 4.01 14.68 3 12.18 3 7.12 3 3 7.03 3 12.37s4.12 9.37 9.18 9.37c5.3 0 8.81-3.72 8.81-8.97 0-.6-.07-1.07-.15-1.53Z" />
    </svg>
  );
}

const socialButton =
  "flex size-[72px] items-center justify-center rounded-panel border border-gray-200 bg-white transition-colors hover:border-gray-400";

export function LoginForm() {
  const { pending, onSubmit } = useAuthSubmit();

  return (
    <div className="flex flex-col">
      <form onSubmit={onSubmit} className="flex flex-col items-end gap-6" aria-busy={pending}>
        <div className="flex w-full flex-col gap-6">
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
            autoComplete="current-password"
            placeholder="********"
            required
          />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="mt-[73px] flex flex-col items-center gap-10 max-md:mt-10 max-md:gap-6">
        <div className="flex w-full items-center gap-[11px]" role="separator" aria-label="or">
          <span className="h-px w-[200px] bg-gray-200 max-md:flex-1" />
          <span className="font-sans text-body-l text-gray-400">or</span>
          <span className="h-px w-[200px] bg-gray-200 max-md:flex-1" />
        </div>
        <div className="flex gap-4">
          <button type="button" aria-label="Continue with Facebook" className={socialButton}>
            <FacebookIcon />
          </button>
          <button type="button" aria-label="Continue with Google" className={socialButton}>
            <GoogleIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
