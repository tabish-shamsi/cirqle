"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { socialNetworksSchema } from "@/schemas/social-networks";
import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";

export default function AccountInformation() {
  const form = useForm({
    resolver: zodResolver(socialNetworksSchema),
    defaultValues: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      tiktok: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <SettingsWrapper>
      <SettingsCardHeader title="Social Networks" />

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
            Save Changes
          </Button>
        </div>
      </Form>
    </SettingsWrapper>
  );
}
