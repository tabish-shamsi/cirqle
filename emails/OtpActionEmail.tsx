import { OtpEmailType } from "@/types/types";
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Heading,
} from "@react-email/components";



interface OtpActionEmailProps {
    name?: string;
    otp: string;
    type: OtpEmailType;
    primaryColor?: string;
}

const CONTENT_MAP: Record<
    OtpEmailType,
    {
        preview: string;
        message: string;
        securityNote: string;
    }
> = {
    password_reset: {
        preview: "Reset your Cirqle password",
        message:
            "We received a request to reset your Cirqle password. Use the verification code below to continue:",
        securityNote:
            "If you didn't request a password reset, you can safely ignore this email.",
    },
    change_password: {
        preview: "Change your Cirqle password",
        message:
            "We received a request to change your Cirqle password. Use the verification code below to continue:",
        securityNote:
            "If you didn't request a password reset, you can safely ignore this email.",
    },
    change_email: {
        preview: "Confirm your new email address",
        message:
            "We received a request to change the email address associated with your Cirqle account. Use the verification code below to confirm:",
        securityNote:
            "If you didn't request this change, please secure your account immediately.",
    },
    email_verification: {
        preview: "Welcome to Cirqle! Verify your email",

        message:
            "To get started, please verify your email address by using the OTP below:",
        securityNote:
            "If you didn't create a Cirqle account, you can safely ignore this email.",
    }
};

export const OtpActionEmail = ({
    name,
    otp,
    type,
    primaryColor = "oklch(0.6879 0.2075 39.7472)",
}: OtpActionEmailProps) => {
    const content = CONTENT_MAP[type];

    return (
        <Html>
            <Head />
            <Preview>{content.preview}</Preview>

            <Body
                style={{
                    backgroundColor: "#f5f5f5",
                    fontFamily: "Arial, sans-serif",
                    margin: 0,
                    padding: 0,
                }}
            >
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        padding: "32px",
                        maxWidth: "600px",
                        margin: "40px auto",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                >
                    {/* App name */}
                    <Section style={{ textAlign: "center", marginBottom: "24px" }}>
                        <Heading
                            style={{
                                color: primaryColor,
                                fontSize: "28px",
                                margin: 0,
                            }}
                        >
                            Cirqle
                        </Heading>
                    </Section>

                    {/* Main content */}
                    <Section style={{ marginBottom: "24px" }}>
                        <Text style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
                            Hi {name?.split(" ")[0] ?? "there"}, {type === "email_verification" && <>welcome to <strong>Cirqle</strong>! We’re excited to
                                have you on board. 🎉</>}
                        </Text>

                        <Text style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
                            {content.message}
                        </Text>
                    </Section>

                    {/* OTP */}
                    <Section>
                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: 700,
                                letterSpacing: "6px",
                                textAlign: "center",
                                background: "#f3f4f6",
                                padding: "20px 0",
                                borderRadius: "10px",
                                margin: "24px 0",
                                color: "#111",
                            }}
                        >
                            {otp}
                        </div>
                    </Section>

                    {/* Security note */}
                    <Section style={{ marginTop: "16px" }}>
                        <Text
                            style={{
                                fontSize: "14px",
                                color: "#555",
                                lineHeight: "22px",
                            }}
                        >
                            This code will expire shortly for your security.
                        </Text>

                        <Text
                            style={{
                                fontSize: "14px",
                                color: "#555",
                                lineHeight: "22px",
                            }}
                        >
                            {content.securityNote}
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section
                        style={{
                            textAlign: "center",
                            fontSize: "12px",
                            color: "#999",
                            marginTop: "32px",
                        }}
                    >
                        <Text>
                            © {new Date().getFullYear()} Cirqle. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default OtpActionEmail;
