"use client";

import Form from "@/components/form";
import InputWithIcon from "@/components/input-with-icon";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  TForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import changePassword from "@/actions/user/change-password";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm({ email }: { email: string }) {
  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      newPassword: "",
      cpassword: "",
    },
  });

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePasswordChange = async (data: TForgotPasswordSchema) => {
    setLoading(true)
    const res = await changePassword({ email, type: "password_reset", password: data.newPassword })
    if (res.error) toast.error(res.error)
    if (res.success) {
      toast.success(res.message)
      router.push("/account/login")
    }

    setLoading(false)
  };

  return (
    <Form form={form} onSubmit={handlePasswordChange}>
      <div className="space-y-5">
        <InputWithIcon
          control={form.control}
          name="newPassword"
          icon={<Lock />}
          placeholder="New Password"
          type="password"
          className="h-12"
        />

        <InputWithIcon
          control={form.control}
          name="cpassword"
          icon={<Lock />}
          placeholder="Confirm Password"
          type="password"
          className="h-12"
        />

        <Button className="w-full h-12 text-base" disabled={loading}>{loading ? "Changing Password..." : "Change Password"}</Button>
      </div>
    </Form>
  );
}
