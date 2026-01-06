import Image from "next/image";
import { Button } from "@/components/ui/button";
import AuthBG from "@/assets/auth-bg.jpg";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <header className="h-16 md:h-24 w-full flex items-center justify-between bg-transparent px-6 md:px-14 fixed top-0 left-0 z-1">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            height={32}
            width={120}
            src={Logo}
            alt="logo"
            className="h-full w-auto"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/account/login" className="text-sm">
            <Button variant="outline" size="lg" className="rounded-full px-6">
              Login
            </Button>
          </Link>
          <Link href="/account/register" className="text-sm">
            <Button size="lg" className="rounded-full px-6">
              Register
            </Button>
          </Link>
        </div>
      </header>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT ILLUSTRATION */}
        <div className="hidden lg:flex items-center justify-center bg-sky-50">
          <div className="relative w-full h-full">
            <Image
              src={AuthBG} // replace with your svg
              alt="Login illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-col justify-center  px-6 sm:px-12 lg:px-20 bg-card">
          <div className="max-w-sm md:max-w-md mx-auto w-full space-y-8 py-16">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
