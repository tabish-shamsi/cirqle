import { usePathname } from "next/navigation";

export const checkActivePath = (path: string) => {
  const pathname = usePathname();
  console.log(pathname);

  const isActive = (path: string) => pathname === path;
  return isActive(path);
};
