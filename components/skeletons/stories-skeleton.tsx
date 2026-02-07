import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function StoriesSkeleton() {
  return (
    <div className="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="relative h-40">
            <Skeleton className="absolute top-0 rounded-full h-12 w-12" />

            <Skeleton className="absolute bottom-0 h-4 w-22" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
