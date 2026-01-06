import ChangePasswordForm from "@/components/auth/change-password-form";

export default function ChangePassword() {
  return (
    <>
      <h1 className="text-4xl font-bold leading-tight">
        Change <br /> Your Password
      </h1>

      {/* FORM */}
      <ChangePasswordForm />
    </>
  );
}
