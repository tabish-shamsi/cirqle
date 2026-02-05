import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function EditPostSkeleton() {
  return (
    <Card className="w-full gap-4">
      {/* Header */}
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <div className="relative">
          {/* Avatar inside textarea */}
          <Skeleton className="absolute left-3 top-3 h-8 w-8 rounded-full" />

          {/* Textarea */}
          <Skeleton className="h-28 w-full rounded-xl pl-14" />

          {/* Media previews */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between">
        <Skeleton className="h-9 w-36 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </CardFooter>
    </Card>
  );
}
