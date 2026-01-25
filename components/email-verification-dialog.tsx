"use client"

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { TVerifyAccountSchema, verifyAccountSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Form from "./form";
import { Button } from "./ui/button";
import InputOTP from "./input-otp";
import verifyEmail from "@/actions/email/verify-email";
import emailOTP from "@/actions/email/send-email";
import { useRouter } from "next/navigation";
import { OtpEmailType } from "@/types/types";

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>,
    open: boolean
    email?: string
    redirectUrl?: string;
    type: OtpEmailType;
    defaultOpen?: boolean
    onEmailVerified?: () => void
}

export default function EmailVerificationDialog({ open, setOpen, email, redirectUrl, type, defaultOpen, onEmailVerified }: Props) {
    const form = useForm<TVerifyAccountSchema>({
        resolver: zodResolver(verifyAccountSchema),
        defaultValues: {
            code: "",
        },
    });

    const [resendCount, setResendCount] = useState(0)
    const [countdown, setCountdown] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleEmailVerify = async (data: TVerifyAccountSchema) => {
        setLoading(true)
        const res = await verifyEmail({
            code: data.code,
            email,
            type: type
        })
        if (res?.error) toast.error(res.error)
        if (res.success) {
            toast.message(res.message);
            setOpen(false);
            if (onEmailVerified) onEmailVerified()
            if (redirectUrl) router.push(redirectUrl)
        }

        setLoading(false)
    };

    const resendOTP = async () => {
        const res = await emailOTP({ email, emailType: type, resend: true })
        if (res?.error) toast.error(res.error)
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
        <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className="space-y-6 ">
                <DialogHeader>
                    <DialogTitle>Email Verification</DialogTitle>
                    <DialogDescription>We’ve sent a 6-digit verification code to your email.</DialogDescription>
                </DialogHeader>

                <Form form={form} onSubmit={handleEmailVerify}>
                    <div className="w-full flex items-center justify-center flex-col gap-4">
                        <div>
                            <InputOTP
                                name="code"
                                control={form.control}
                                label="OTP"
                            />
                            {countdown !== 0 ?
                                (<p className="text-muted-foreground text-sm mt-2">Send another code in {countdown}</p>) :
                                (<Button onClick={resendOTP} variant="link" type="button" className="py-0 px-0" disabled={(resendCount >= 3 && countdown == 0)}>Resend Code</Button>)}
                        </div>

                        <Button disabled={loading} className="w-full h-12 text-base">{loading ? "Verifying Email..." : "Verify Email"}</Button>
                    </div>
                </Form>

            </DialogContent>
        </Dialog>
    )
}