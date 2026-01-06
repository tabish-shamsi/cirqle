import AccountRecoveryCard from "@/components/auth/account-card";
import FindMyAccountForm from "@/components/auth/forget-password-form";

export default function ForgetPassword() {
  return (
    <>
      <h1 className="text-4xl font-bold leading-tight">
        Find <br /> your Account
      </h1>

      {/* FORM */}
      <FindMyAccountForm />

      <AccountRecoveryCard
        name="John Doe"
        email="johndoe@gmail.com"
        avatarUrl="/avatars/john.jpg"
      />
    </>
  );
}
