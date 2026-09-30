import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthLayout
      intro={{
        title: "Sign in with ease",
        description:
          "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.",
      }}
    >
      <AuthCard
        eyebrow="Sign In"
        title="Welcome Back"
        footer={{
          prompt: "New user?",
          linkLabel: "Create an account",
          href: "/register",
        }}
        className="pb-10"
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}
