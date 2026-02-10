"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { removeFriend } from "@/actions/friends";
import { toast } from "sonner";

export default function RemoveFriend({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemove = async () => {
    setLoading(true);

    const res = await removeFriend(userId);
    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success(res.message);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleRemove} variant="outline" size="sm">
        {loading ? "Removing..." : "Remove"}
      </Button>
    </div>
  );
}
