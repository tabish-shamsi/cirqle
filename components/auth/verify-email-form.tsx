"use client";

import Form from "@/components/form";
import { useForm } from "react-hook-form";
import {
  TVerifyAccountSchema,
  verifyAccountSchema,
} from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import InputOTP from "../input-otp";

export default function VerifyEmailForm() {
  const form = useForm<TVerifyAccountSchema>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      code: "",
    },
  });

  const handlePasswordChange = async (data: TVerifyAccountSchema) => {
    console.log(data);
  };

  return (
    <Form form={form} onSubmit={handlePasswordChange}>
      <div className="space-y-5">
        <InputOTP
          name="code"
          control={form.control}
          label="Verification Code"
        />

        <Button className="w-full h-12 text-base">Change Password</Button>
      </div>
    </Form>
  );
}
