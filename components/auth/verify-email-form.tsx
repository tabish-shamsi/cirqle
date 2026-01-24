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
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import verifyEmail from "@/actions/email/verify-email";
import emailOTP from "@/actions/email/send-email";

export default function VerifyEmailForm() {
  const form = useForm<TVerifyAccountSchema>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      code: "",
    },
  });

  const [resendCount, setResendCount] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)
  const { update } = useAuth()

  const handleEmailVerify = async (data: TVerifyAccountSchema) => {
    setLoading(true)
    const res = await verifyEmail({ code: data.code, type: "email_verification" })
    if (res?.error) {
      toast.error(res.error)
    }

    if (res.success) {
      await update({ isVerified: true })
      toast.message(res.message)
    }

    setLoading(false)
  };

  const resendOTP = async () => {
    const res = await emailOTP({ emailType: "email_verification", resend: true })
    if (res?.error) {
      toast.error(res.error)
    }
    if (res?.success) {
      setResendCount(resendCount + 1)
      setCountdown(60)
      toast.success(res.message)
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

        <Button disabled={loading} className=" h-12 text-base">{loading ? "Verifying Email..." : "Verify Email"}</Button>
      </div>
    </Form>
  );
}
