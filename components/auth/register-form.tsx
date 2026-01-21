"use client";

import Form from "@/components/form";
import InputWithIcon from "@/components/input-with-icon";
import { Calendar, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { TRegisterSchema, registerSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Checkbox from "../checkbox";
import DatePickerWithIcon from "../date-picker-with-icon";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      birthday: new Date(),
      password: "",
      terms: false,
    },
  });

  const handleRegister = async (data: TRegisterSchema) => {};

  return (
    <Form form={form} onSubmit={handleRegister}>
      <div className="space-y-5">
        {/* Name */}
        <InputWithIcon
          icon={<User />}
          control={form.control}
          name="name"
          placeholder="Your Name"
          className="h-12"
        />

        {/* Email */}
        <InputWithIcon
          icon={<Mail />}
          control={form.control}
          name="email"
          placeholder="Enter Your Email"
          type="email"
          className="h-12"
        />

        {/* Password */}
        <InputWithIcon
          icon={<Lock />}
          control={form.control}
          name="password"
          placeholder="Password"
          type="password"
          className="h-12"
        />

        {/* Birthday */}
        <DatePickerWithIcon
          control={form.control}
          name="birthday"
          icon={<Calendar />}
        />

        {/* Accept Terms And Condition */}
        <Checkbox
          control={form.control}
          name="terms"
          label="Accept Terms And Condition"
        />

        <Button type="submit" className="w-full h-12 text-base">
          Register
        </Button>
      </div>
    </Form>
  );
}
