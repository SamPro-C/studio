import { RegisterForm } from "@/components/auth/RegisterForm";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 py-12">
      <div className="absolute top-8 left-8">
         <Logo />
      </div>
      <RegisterForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary underline underline-offset-4">
            Back to Homepage
          </Link>
        </p>
    </div>
  );
}
