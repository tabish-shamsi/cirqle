import { Header } from "@/components/header/header";
import Sidebar from "@/components/nav-sidebar/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex mt-16 lg:mt-24">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
