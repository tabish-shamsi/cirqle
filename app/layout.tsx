import Providers from "@/context/Providers";
import "@/styles/main.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Criqle",
  description: "A social media website built with modern web technologies.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
