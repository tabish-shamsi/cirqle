"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import IUser from "@/types/User";
import { useState } from "react";
import EmailVerificationDialog from "../email-verification-dialog";
import emailOTP from "@/actions/email/send-email";
import { toast } from "sonner";


export default function AccountRecoveryCard({
  name,
  email,
  avatar,
}: IUser) {
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendOTP = async () => {
    setLoading(true)
    const res = await emailOTP({ emailType: "password_reset", email, resend: false })

    if (res?.error) toast.error(res.error)
    if (res?.success) toast.success(res.message)
    setLoading(false)
    setOpenDialog(true)
  }

  return (
    <>
      <Card className="max-w-md mx-auto shadow-sm">
        <CardHeader className="text-center space-y-4">
          <Avatar className="mx-auto h-20 w-20">
            <AvatarImage src={avatar?.url} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            This account looks like yours.
          </p>

          <Button disabled={loading} onClick={sendOTP} className="w-full">{loading ? "Please wait..." : "Continue"}</Button>
        </CardContent>
      </Card>
      <EmailVerificationDialog open={openDialog} setOpen={setOpenDialog} email={email} redirectUrl={`/account/change-password?email=${email}`} type="password_reset" />
    </>
  );
}
