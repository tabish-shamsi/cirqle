import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl font-bold leading-tight">
        Create <br /> Your Account
      </h1>

      {/* FORM */}
      <RegisterForm />

      <p className="text-sm text-muted-foreground -mt-6">
        Already have an account?
        <Link href="/account/login" className="-ml-2">
          <Button variant="link">Login</Button>
        </Link>
      </p>
    </>
  );
}
