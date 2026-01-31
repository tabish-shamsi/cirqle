import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function FriendsCardSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="w-18 h-4 rounded-full" />
                <Skeleton className="w-12 h-3" />
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-center gap-2 text-center"
                        >
                            <Skeleton className="h-14 w-14 rounded-full" />
                            <div className="flex flex-col items-center justify-center gap-1">
                                <Skeleton className="h-4 w-20 rounded-full" />
                                <Skeleton className="h-3 w-15 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}