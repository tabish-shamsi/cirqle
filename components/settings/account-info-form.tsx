"use client"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { accountInfoSchema, TAccountInfoSchema } from "@/schemas/account-information";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import updateAccountInfo from "@/actions/user/update-account-info";
import { toast } from "sonner";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";


export default function AccountInfoForm({ accountInfo }: { accountInfo: TAccountInfoSchema }) {
    const form = useForm({
        resolver: zodResolver(accountInfoSchema),
        defaultValues: accountInfo
    });

    const [loading, setLoading] = useState(false)
    const { update } = useAuth()

    const handleSubmit = async (data: TAccountInfoSchema) => {
        setLoading(true)
        const res = await updateAccountInfo(data)
        if (!res.error) toast.error(res.error)
        if (res.success) {
            toast.success(res.message)
            update({ name: `${data.firstName} ${data.lastName}` })
        }
        setLoading(false)
    };

    return (
        <Form form={form} onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div className="grid  md:grid-cols-2 gap-4">
                    <FormFieldWrapper
                        control={form.control}
                        name="firstName"
                        label="First Name"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>
                </div>

                <FormFieldWrapper
                    control={form.control}
                    name="username"
                    label="Username"
                >
                    {({ field }) => <Input className="h-12" {...field} />}
                </FormFieldWrapper>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormFieldWrapper
                        control={form.control}
                        name="hometown"
                        label="Hometown"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="current_city"
                        label="Lives In"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>
                </div>

                <FormFieldWrapper
                    control={form.control}
                    name="profession"
                    label="Profession"
                >
                    {({ field }) => <Input className="h-12" {...field} />}
                </FormFieldWrapper>

                <FormFieldWrapper control={form.control} name="bio" label="About">
                    {({ field }) => <Textarea className="h-12" {...field} />}
                </FormFieldWrapper>

                <FormFieldWrapper
                    control={form.control}
                    name="birthday"
                    label="Birthday"
                >
                    {({ field, fieldState }) => (
                        <DatePicker
                            ariaInvalid={fieldState.error !== undefined}
                            {...field}
                        />
                    )}
                </FormFieldWrapper>

                <Button type="submit" size="xl" className="text-base">
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </Form>
    )
}