import emailOTP from "@/actions/email/send-email"
import ChangePasswordForm from "@/components/settings/change-password-form"
import { checkAllowChangePassword } from "@/data/user"
import { toast } from "sonner"

export default async function ChangePassword() {
  const allowChangePassword = await checkAllowChangePassword()
  if (!allowChangePassword) {
    const res = await emailOTP({ emailType: "change_password", resend: false })
    if (res.error) toast.error(res.error)
  }

  return (<ChangePasswordForm showDialog={!allowChangePassword} />)
}