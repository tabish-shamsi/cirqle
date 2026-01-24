import { OtpEmailType } from "@/types/types";

export default function getEmailSubject(
    emailType: OtpEmailType
): string {
    switch (emailType) {
        case "password_reset":
            return "Reset your Cirqle password";
        
        case "change_password":
            return "Change your Cirqle password";

        case "email_verification":
            return "Verify your Cirqle account";

        case "change_email":
            return "Confirm your new email address";

        default:
            return "Cirqle Notification";
    }
}