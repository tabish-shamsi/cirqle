import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import SocialsLoginButtons from "@/components/auth/socials-login-button";

export default function Login() {
  return (
    <>
      <h1 className="text-4xl font-bold leading-tight">
        Login into <br /> your account
      </h1>

      {/* FORM */}
      <LoginForm />

      <p className="text-sm text-muted-foreground -mt-6">
        Don’t have account?
        <Link href="/account/register" className="-ml-2">
          <Button variant="link">Register</Button>
        </Link>
      </p>

      {/* SOCIAL LOGIN */}
      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Or, Sign in with your social account
        </p>

        <SocialsLoginButtons />
      </div>
    </>
  );
}
