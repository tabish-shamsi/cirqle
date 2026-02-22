import FriendNav from "@/components/friends/friend-nav";
import { ReactNode } from "react";

export default function FriendsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-4/5 space-y-4 pt-8"> 
        <FriendNav />

        {/* Friends */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-12 content-center">
          {children}
        </section>
      </div>
    </div>
  );
}
