import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <div className="w-full border rounded-md shadow-sm p-4 space-y-4 bg-card">
      {/* Header */}
      <div className="flex flex-row gap-3 items-center">
        <Skeleton className="w-12 h-12 rounded-full" />

        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-3 w-1/4 rounded" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-5/6 rounded" />
      </div>

      {/* Media grid placeholder */}
      <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-md overflow-hidden h-62.5">
        <Skeleton className="row-span-2 rounded-md" />
        <Skeleton className=" rounded-md" />
        <Skeleton className=" rounded-md" />
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-2">
        <div className="flex gap-4">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>
        <Skeleton className="h-6 w-12 rounded" />
      </div>
    </div>
  );
}
