import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function PostDialogSkeleton() {
  return (
    <Card className="gap-0 p-0">
      {/* Header */}
      <CardHeader className="relative w-full flex items-center justify-center p-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="absolute top-4 right-4 h-10 w-10 rounded-full" />
      </CardHeader>

      <Separator />

      {/* Scrollable Content */}
      <ScrollArea className="h-112.5">
        <CardContent className="space-y-6 py-6">
          {/* Author row */}
          <div className="flex gap-3 items-center">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Post text */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-9/12" />
          </div>

          {/* Media */}
          <Skeleton className="h-64 w-full rounded-lg" />

          {/* Actions */}
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>

          {/* Comments */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>

      {/* Footer (Add comment) */}
      <CardFooter className="flex items-center gap-2 p-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-full rounded-full" />
      </CardFooter>
    </Card>
  );
}
