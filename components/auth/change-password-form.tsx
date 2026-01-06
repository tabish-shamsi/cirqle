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

export default function ChangePasswordForm() {
  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      newPassword: "",
      cpassword: "",
    },
  });

  const handlePasswordChange = async (data: TForgotPasswordSchema) => {
    console.log(data);
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

        <Button className="w-full h-12 text-base">Change Password</Button>
      </div>
    </Form>
  );
}
