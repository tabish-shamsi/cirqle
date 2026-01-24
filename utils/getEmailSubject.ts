export default function getEmailSubject(
    emailType: "password_reset" | "email_verification" | "change_email"
): string {
    switch (emailType) {
        case "password_reset":
            return "Reset your Cirqle password";

        case "email_verification":
            return "Verify your Cirqle account";

        case "change_email":
            return "Confirm your new email address";

        default:
            return "Cirqle Notification";
    }
}