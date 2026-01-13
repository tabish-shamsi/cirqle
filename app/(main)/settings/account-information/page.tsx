"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { accountInfoSchema } from "@/schemas/account-information";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";

export default function AccountInformation() {
  const form = useForm({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      bio: "",
      birthday: new Date(),
      hometown: "",
      livesIn: "",
      occupation: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <SettingsWrapper>
      <SettingsCardHeader title="Account Information" />

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

          <FormFieldWrapper control={form.control} name="email" label="Email">
            {({ field }) => <Input className="h-12" {...field} />}
          </FormFieldWrapper>

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
              name="livesIn"
              label="Lives In"
            >
              {({ field }) => <Input className="h-12" {...field} />}
            </FormFieldWrapper>
          </div>

          <FormFieldWrapper
            control={form.control}
            name="occupation"
            label="Occupation"
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
            Save Changes
          </Button>
        </div>
      </Form>
    </SettingsWrapper>
  );
}
