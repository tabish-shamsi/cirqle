import "@/styles/main.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const metadata = {
  title: "My App",
  description: "This is my awesome app built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
