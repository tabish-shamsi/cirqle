import VerifyEmailForm from "@/components/auth/verify-email-form";

export default function VerifyAccount() {
  return (
    <>
      <h1 className="text-4xl font-bold leading-tight">
        Verify <br /> Your Email
      </h1>
      <p className="text-muted-foreground">We’ve sent a 6-digit verification code to your email.</p>

      {/* FORM */}
      <VerifyEmailForm />
    </>
  );
}
