import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar() {
  return (
    <Link href="/profile" className="pr-6 lg:pr-8 p-3 hidden lg:block">
      <Avatar className="h-10  w-10    ">
        <AvatarImage src="" />
        <AvatarFallback>TS</AvatarFallback>
      </Avatar>
    </Link>
  );
}
