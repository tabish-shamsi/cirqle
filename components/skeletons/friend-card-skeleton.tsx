import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FriendCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center gap-4">
        {/* Avatar */}
        <Skeleton className="w-12 h-12 rounded-full" />

        {/* Name + Username */}
        <div className="flex flex-col items-center gap-2 w-full">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Actions */}
        <Skeleton className="h-9 w-24 rounded-md" />
      </CardContent>
    </Card>
  );
}
