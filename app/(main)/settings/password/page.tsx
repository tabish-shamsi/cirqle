"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { changePasswordSchema } from "@/schemas/change-password";
import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";

export default function AccountInformation() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <SettingsWrapper>
      <SettingsCardHeader title="Change Account Password" />

      <Form form={form} onSubmit={handleSubmit}>
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

          <Button type="submit" size="xl" className="text-base">
            Save Changes
          </Button>
        </div>
      </Form>
    </SettingsWrapper>
  );
}
