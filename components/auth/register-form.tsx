"use client";

import Form from "@/components/form";
import InputWithIcon from "@/components/input-with-icon";
import { Calendar, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { TRegisterSchema, registerSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Checkbox from "../checkbox";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { DatePicker } from "../date-picker";
import { FormFieldWrapper } from "../form-field-wrapper";
import DatePickerWithIcon from "../date-picker-with-icon";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      birthday: undefined,
      password: "",
      terms: false,
    },
  });

  const handleRegister = async (data: TRegisterSchema) => {
    const { name, email, password } = data;
    const { error, data: res } = await signUp.email({
      email,
      password,
      name,
      username: "tabish-123",
      callbackURL: "/profile",
    });

    console.log(res);

    if (error) {
      console.error(error);
      toast.error(error.message);
    }
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
