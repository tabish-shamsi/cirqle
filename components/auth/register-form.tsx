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
import registerUser from "@/actions/auth/register-user";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import checkUsernameUnique from "@/actions/auth/check-username-unique";
import LogoutButton from "../temporary-logout-button"; 
import emailOTP from "@/actions/email/send-email";

export default function RegisterForm() {
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "test1",
      username: "",
      email: "test@gmail.com",
      birthday: new Date("01/09/2007"),
      password: "Test@123",
      terms: true,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: TRegisterSchema) => {
    setLoading(true);

    const res = await registerUser(values);

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInRes?.error) {
      toast.error(signInRes.error);
      setLoading(false);
      return;
    }

    if (!signInRes?.ok) {
      toast.error("Something went wrong while login");
      setLoading(false);
      return;
    }

    const sendOTP = await emailOTP({ email: values.email, emailType: "email_verification", resend: false })
    if (sendOTP?.error) {
      toast.error(sendOTP.error)
    }

    setLoading(false);
    router.push("/account/verify");
  };

  const username = form.watch("username");
  const [debouncedUsername] = useDebounce(username, 500);
  const [checkingUsername, setCheckingUsername] = useState(false);

  async function checkUsername() {
    setCheckingUsername(true);
    form.clearErrors("username");

    const user = await checkUsernameUnique(debouncedUsername);

    if (user)
      form.setError("username", { message: "Username is not available" });

    setCheckingUsername(false);
  }

  useEffect(() => {
    checkUsername();
  }, [debouncedUsername]);

  const disableButton = checkingUsername && loading;

  return (
    <Form form={form} onSubmit={handleRegister}>
      <LogoutButton />
      <div className="space-y-5">
        {/* Name */}
        <InputWithIcon
          icon={<User />}
          control={form.control}
          name="name"
          placeholder="Your Name"
          className="h-12"
        />
        {/* Username */}
        <InputWithIcon
          icon={<User />}
          control={form.control}
          name="username"
          placeholder="Your Username"
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

        <Button
          type="submit"
          className="w-full h-12 text-base"
          disabled={disableButton}
        >
          {loading ? "Creating Account..." : "Register"}
        </Button>
      </div>
    </Form>
  );
}
