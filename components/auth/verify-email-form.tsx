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
import sendVerifyEmail from "@/actions/auth/send-verify-email";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function VerifyEmailForm() {
  const form = useForm<TVerifyAccountSchema>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      code: "",
    },
  });

  const [resendCount, setResendCount] = useState(3)
  const [countdown, setCountdown] = useState(60)

  const handleEmailVerify = async (data: TVerifyAccountSchema) => {
    console.log(data);
  };

  const resendOTP = async () => {
    const res = await sendVerifyEmail()
    if (res?.error) {
      toast.error(res.error)
    }
    if (res?.success) {
      setResendCount(resendCount + 1)
      setCountdown(60)
    }
  }

  useEffect(() => {
    if (countdown <= 0) return
    setTimeout(() => { setCountdown(countdown - 1) }, 1000)
  }, [countdown])

  return (
    <Form form={form} onSubmit={handleEmailVerify}>
      <div className="space-y-5">
        <div>
          <InputOTP
            name="code"
            control={form.control}
            label="Verification Code"
          />
          {countdown !== 0 ?
            (<p className="text-muted-foreground text-sm mt-2">Send another code in {countdown}</p>) :
            (<Button onClick={resendOTP} variant="link" type="button" className="py-0 px-0 mt-2" disabled={(resendCount >= 3 && countdown == 0)}>Resend Code</Button>)}
        </div>

        <Button className=" h-12 text-base">Verify Email</Button>
      </div>
    </Form>
  );
}
