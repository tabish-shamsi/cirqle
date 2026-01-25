import emailOTP from "@/actions/email/send-email"
import ChangeEmailForm from "@/components/settings/change-email-form"
import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";
import { getEmailChangeInfo } from "@/data/user"

export default async function ChangeEmail() {
    const {
        email,
        canChangeEmail,
        remainingMs,
        allowChange
    } = await getEmailChangeInfo();

    if (canChangeEmail && !allowChange) {
        const res = await emailOTP({ emailType: "change_email", resend: false })
        if (res.error) throw new Error(res.error)
    }

    return (

        <SettingsWrapper>
            <SettingsCardHeader title="Change Account Email" />
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Current email</p>
                <p className="mt-1 mb-4 break-all text-base font-medium text-gray-900">
                    {email}
                </p>

                {!canChangeEmail && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        You can change your email in{" "}
                        <span className="font-semibold">
                            {Math.ceil(remainingMs / 1000 / 60 / 60 / 24)} days
                        </span>
                    </div>
                )}

                {canChangeEmail && (
                    <div className="mt-5">
                        <ChangeEmailForm showDialog={!allowChange} />
                    </div>
                )}
            </div>
        </SettingsWrapper>
    )
}