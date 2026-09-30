import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Create an Account" };

export default function RegisterPage() {
  return (
    <AuthLayout
      intro={{
        title: "Sign up and come in",
        description:
          "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost",
      }}
    >
      <AuthCard
        eyebrow="Create an Account"
        title="Welcome to ByteSpace"
        footer={{ prompt: "Already have an account?", linkLabel: "Login", href: "/login" }}
        className="pb-[51px]"
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}
