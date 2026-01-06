"use client";

import Form from "@/components/form";
import InputWithIcon from "@/components/input-with-icon";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  TFindMyAccountSchema,
  findMyAccountSchema,
} from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

export default function FindMyAccountForm() {
  const form = useForm<TFindMyAccountSchema>({
    resolver: zodResolver(findMyAccountSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const handlePasswordChange = async (data: TFindMyAccountSchema) => {
    console.log(data);
  };

  return (
    <Form form={form} onSubmit={handlePasswordChange}>
      <div className="space-y-5">
        <InputWithIcon
          icon={<Mail />}
          control={form.control}
          name="identifier"
          placeholder="Username or Email"
          type="identifier"
          className="h-12"
        />

        <Button className="w-full h-12 text-base">Find My Account</Button>
      </div>
    </Form>
  );
}
