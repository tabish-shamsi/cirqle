import ThemeProvider from "@/context/ThemeProvider";
import "@/styles/main.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "My App",
  description: "This is my awesome app built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
