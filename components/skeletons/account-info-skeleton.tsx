import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountInfoSkeleton() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full md:w-3/4">
                <Card className="my-14">
                    <CardContent className="relative">
                        <div className="space-y-6">
                            {/* First + Last Name */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-12 w-full" />
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-12 w-full" />
                            </div>

                            {/* Hometown + Lives In */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>

                            {/* Occupation */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-12 w-full" />
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-20 w-full" />
                            </div>

                            {/* Birthday */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-12 w-full" />
                            </div>

                            {/* Submit Button */}
                            <Skeleton className="h-12 w-40 rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
