import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import SearchForm from "./search-form";
import ChatPopover from "./chat-popover";
import NotificationsPopover from "./notifications-popover";
import UserAvatar from "./user-avatar"; 
import Navlinks from "./nav-links";
import SearchMobile from "./search-mobile";
import { ThemeToggle } from "./toggle-theme-button";
import ToggleSidebarButton from "./toggle-sidebar-button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 h-16 lg:h-24 bg-card shadow-2xl flex items-center w-full">
      <Link
        href="/"
        className="flex items-center gap-2 pl-8 lg:pl-12 w-70 text-left h-10 lg:h-14"
      >
        <Image
          height={32}
          width={120}
          src={Logo}
          alt="logo"
          className="h-full w-auto"
        />
      </Link>

      <SearchForm />

      <Navlinks />

      <SearchMobile />

      <NotificationsPopover />

      <ChatPopover />

      <ThemeToggle /> 

      <UserAvatar />

      <ToggleSidebarButton />
    </header>
  );
}
