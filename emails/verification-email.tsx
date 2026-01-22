// app/emails/VerificationEmail.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  name?: string;
  otp: string;
  primaryColor?: string; // optional override
}

export const VerificationEmail = ({
  name,
  otp,
  primaryColor = "oklch(0.6879 0.2075 39.7472)",
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Cirqle! Verify your email</Preview>
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
          {/* Logo / App Name */}
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Heading
              style={{ color: primaryColor, fontSize: "28px", margin: 0 }}
            >
              Cirqle
            </Heading>
          </Section>

          {/* Welcome Message */}
          <Section style={{ marginBottom: "24px" }}>
            <Text
              style={{ fontSize: "16px", color: "#333333", lineHeight: "24px" }}
            >
              Hi {name}, welcome to <strong>Cirqle</strong>! We’re excited to
              have you on board. 🎉
            </Text>
            <Text
              style={{ fontSize: "16px", color: "#333333", lineHeight: "24px" }}
            >
              To get started, please verify your email address by using the OTP
              below:
            </Text>
          </Section>

          {/* OTP */}
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "4px",
                color: primaryColor,
                backgroundColor: "#E0E7FF",
                padding: "16px 24px",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              {otp}
            </Text>
          </Section>

          {/* Verify Button */}
          {/* <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              // pX={24}
              // pY={12}
              style={{
                backgroundColor: primaryColor,
                color: "#ffffff",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "12px 24px",
              }}
              href="#"
            >
              Verify Email
            </Button>
            <Text
              style={{ fontSize: "14px", color: "#777777", marginTop: "8px" }}
            >
              Or enter the OTP above manually
            </Text>
          </Section> */}

          {/* Footer */}
          <Section
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#999999",
              marginTop: "32px",
            }}
          >
            <Text>
              If you did not create a Cirqle account, you can safely ignore this
              email.
            </Text>
            <Text style={{ marginTop: "4px" }}>
              &copy; {new Date().getFullYear()} Cirqle. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;
