"use client"

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { socialNetworksSchema, TSocialNetworks } from "@/schemas/social-networks";
import { useState } from "react";
import updateSocials from "@/actions/user/update-socials";
import { toast } from "sonner";

export default function SocialsForm({ socials }: { socials: TSocialNetworks }) {
    const form = useForm({
        resolver: zodResolver(socialNetworksSchema),
        defaultValues: socials
    });

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (data: TSocialNetworks) => {
        setLoading(true)
        const res = await updateSocials(data)
        if (res.error) toast.error(res.error)

        setLoading(false)
        toast.success(res.message)
    };
    return (
        <Form form={form} onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <FormFieldWrapper
                        control={form.control}
                        name="facebook"
                        label="Facebook"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="twitter"
                        label="Twitter"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormFieldWrapper
                        control={form.control}
                        name="instagram"
                        label="Instagram"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="youtube"
                        label="Youtube"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormFieldWrapper
                        control={form.control}
                        name="linkedin"
                        label="Linkedin"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        control={form.control}
                        name="tiktok"
                        label="Tiktok"
                    >
                        {({ field }) => <Input className="h-12" {...field} />}
                    </FormFieldWrapper>
                </div>

                <Button type="submit" size="xl" className="text-base">
                    {loading ? "Please wait..." : "Save Changes"}
                </Button>
            </div>
        </Form>
    )
}