import "@/styles/main.css";
import { ReactNode } from "react";

export const metadata = {
  title: "My App",
  description: "This is my awesome app built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
