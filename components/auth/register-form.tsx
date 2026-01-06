"use client";

import Form from "@/components/form";
import InputWithIcon from "@/components/input-with-icon";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { TRegisterSchema, registerSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Checkbox from "../checkbox";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      birthday: new Date(),
      password: "",
      cpassword: "",
      terms: false,
    },
  });

  const handleRegister = async (data: TRegisterSchema) => {
    console.log(data);
  };

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

        {/* Confirm Password */}
        <InputWithIcon
          icon={<Lock />}
          control={form.control}
          name="cpassword"
          placeholder="Confirm Password"
          type="password"
          className="h-12"
        />

        {/* Accept Terms And Condition */}
        <Checkbox
          control={form.control}
          name="terms"
          label="Accept Terms And Condition"
        />

        <Button className="w-full h-12 text-base">Register</Button>
      </div>
    </Form>
  );
}
