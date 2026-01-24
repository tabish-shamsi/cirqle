"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { changePasswordSchema, TChangePassword } from "@/schemas/change-password";
import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";
import { useState } from "react";
import { toast } from "sonner";
import changePassword from "@/actions/user/change-password";
import EmailVerificationDialog from "@/components/email-verification-dialog";

export default function ChangePasswordForm({ showDialog }: { showDialog: boolean }) {
    const router = useRouter();
    const [open, setOpen] = useState(showDialog)
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handlePasswordChange = async (data: TChangePassword) => {
        setLoading(true)
        const res = await changePassword({ password: data.newPassword, oldPassword: data.oldPassword, type: "change_password" })
        if (res?.error) toast.error(res.error)
        if (res?.success) {
            setLoading(false)
            toast.success(res.message)
            router.back()
        }
    };

    return (
        <SettingsWrapper>
            <SettingsCardHeader title="Change Account Password" />

            <Form form={form} onSubmit={handlePasswordChange}>
                <div className="space-y-6">
                    <FormFieldWrapper
                        control={form.control}
                        name="oldPassword"
                        label="Old Password"
                    >
                        {({ field }) => (
                            <Input type="password" className="h-12" {...field} />
                        )}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="newPassword"
                        label="New Password"
                    >
                        {({ field }) => (
                            <Input type="password" className="h-12" {...field} />
                        )}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
                    >
                        {({ field }) => (
                            <Input type="password" className="h-12" {...field} />
                        )}
                    </FormFieldWrapper>

                    <Button disabled={loading} type="submit" size="xl" className="text-base">
                        {loading ? "Changing Password..." : "Change Password"}
                    </Button>
                </div>
            </Form>

            <EmailVerificationDialog open={open} setOpen={setOpen} type="change_password" />
        </SettingsWrapper>
    );
}
