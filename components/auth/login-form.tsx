"use client";

import Form from "@/components/form";
import Link from "next/link";
import InputWithIcon from "@/components/input-with-icon";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { TLoginSchema, loginSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Checkbox from "../checkbox";

export default function LoginForm() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleLogin = async (data: TLoginSchema) => {
    console.log(data);
  };

  return (
    <Form form={form} onSubmit={handleLogin}>
      <div className="space-y-5">
        <InputWithIcon
          icon={<Mail />}
          control={form.control}
          name="email"
          placeholder="Enter Your Email"
          type="email"
          className="h-12"
        />

        <InputWithIcon
          control={form.control}
          name="password"
          icon={<Lock />}
          placeholder="Password"
          type="password"
          className="h-12"
        />

        <div className="flex items-center justify-between text-sm">
          <Checkbox
            control={form.control}
            name="rememberMe"
            label="Remember Me"
          />

          <Link
            href="/account/forget-password"
            className="font-medium hover:underline"
          >
            Forgot your Password?
          </Link>
        </div>

        <Button className="w-full h-12 text-base">Login</Button>
      </div>
    </Form>
  );
}
