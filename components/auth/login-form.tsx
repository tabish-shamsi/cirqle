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
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test1@gmail.com",
      password: "Tabish@123",
      rememberMe: false,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: TLoginSchema) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      remember: data.rememberMe,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/profile");
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
            href="/account/find-account"
            className="font-medium hover:underline"
          >
            Forgot your Password?
          </Link>
        </div>

        <Button disabled={loading} className="w-full h-12 text-base">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </Form>
  );
}
