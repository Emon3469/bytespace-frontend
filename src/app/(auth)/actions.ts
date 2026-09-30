"use server";

import { redirect } from "next/navigation";
import { type AuthFormState, validateLogin, validateRegister } from "@/lib/auth-validation";

/*
 * Server Actions for the auth forms. They work before (or without) client-side
 * JavaScript, never expose credentials in the URL, and are the single place to
 * call a real authentication API once a backend exists.
 */

export async function signIn(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const error = validateLogin(formData);
  if (error) return { error };

  // TODO(backend): authenticate against the API and set a session cookie.
  redirect("/");
}

export async function register(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const error = validateRegister(formData);
  if (error) return { error };

  // TODO(backend): create the account via the API and set a session cookie.
  redirect("/");
}
