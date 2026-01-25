"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { Button } from "@/components/ui/button";
import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";
import { useState } from "react";
import EmailVerificationDialog from "@/components/email-verification-dialog";
import { changeEmailSchema, TChangeEmail } from "@/schemas/change-email";
import emailOTP from "@/actions/email/send-email";
import { toast } from "sonner";
import changeEmail from "@/actions/user/change-email";
import useAuth from "@/hooks/useAuth";

export default function ChangeEmailForm({ showDialog }: { showDialog: boolean }) {
    const router = useRouter();
    const [open, setOpen] = useState(showDialog)
    const [loading, setLoading] = useState(false)
    const [showChangeEmailVerifyDialog, setShowChangeEmailVerifyDialog] = useState(false)
    const { update } = useAuth()

    const form = useForm({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: {
            newEmail: "",
            confirmEmail: ""
        },
    });

    const sendChangeNewEmailOtp = async (data: TChangeEmail) => {
        setLoading(true)
        const res = await emailOTP({ emailType: "confirm_new_email", resend: false, email: data.newEmail })
        if (res?.error) toast.error(res.error)
        if (res?.success) {
            toast.success(res.message)
            setLoading(false)
            setShowChangeEmailVerifyDialog(true)
        }
    };

    const email = form.watch("newEmail")

    const handleChangeEmail = async () => {
        const res = await changeEmail()
        if (res?.error) toast.error(res.error)
        if (res?.success) {
            toast.success(res.message)
            await update({ email })
            router.back()
        }
    }

    return (


        <>

            <Form form={form} onSubmit={sendChangeNewEmailOtp}>
                <div className="space-y-6">

                    <FormFieldWrapper
                        control={form.control}
                        name="newEmail"
                        label="New Email"
                    >
                        {({ field }) => (
                            <Input type="email" className="h-12" {...field} />
                        )}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="confirmEmail"
                        label="Confirm Email"
                    >
                        {({ field }) => (
                            <Input type="email" className="h-12" {...field} />
                        )}
                    </FormFieldWrapper>

                    <Button disabled={loading} type="submit" size="xl" className="text-base">
                        {loading ? "Please wait..." : "Change Email"}
                    </Button>
                </div>
            </Form>

            {/* // For verifying the email to update the allowChangeEmail to true */}
            <EmailVerificationDialog open={open} setOpen={setOpen} type="change_email" />

            {/* Confirm new email */}
            <EmailVerificationDialog
                open={showChangeEmailVerifyDialog}
                setOpen={setShowChangeEmailVerifyDialog}
                type="confirm_new_email"
                onEmailVerified={handleChangeEmail}
            />
        </>
    );
}
