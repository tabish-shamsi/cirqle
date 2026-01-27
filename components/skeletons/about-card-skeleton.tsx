import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AboutCardSkeleton() {
    return (
        <Card className="w-full gap-0 relative">
            <CardContent className="text-sm space-y-6">
                {/* Header */}
                <div>
                    <Skeleton style={{ width: "145px", height: "32px", marginBottom: "16px" }} />

                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {/* Label */}
                            <Skeleton style={{ height: "16px", width: "80px" }} />
                            {/* Value */}
                            <Skeleton style={{ height: "16px", width: "60%" }} />

                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}