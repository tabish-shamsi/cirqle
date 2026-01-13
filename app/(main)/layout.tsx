import { Header } from "@/components/header/header";
import Sidebar from "@/components/nav-sidebar/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex mt-16 lg:mt-24">
        <Sidebar />
        <main className="lg:ml-70 w-full">
          <div className="w-full max-w-240 mx-auto pt-4 px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
