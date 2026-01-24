import ChangePasswordForm from "@/components/auth/change-password-form";
import { notFound } from "next/navigation";

export default async function ChangePassword({ searchParams }: { searchParams: Promise<{ email: string }> }) {
  const { email } = await searchParams

  if (!email) notFound()

  return (
    <>
      <h1 className="text-4xl font-bold leading-tight">
        Change <br /> Your Password
      </h1>

      {/* FORM */}
      <ChangePasswordForm email={email} />
    </>
  );
}
