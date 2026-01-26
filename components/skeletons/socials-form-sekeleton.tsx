import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SocialsFormSekeleton() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full md:w-3/4">
                <Card className="my-14">
                    <CardContent className="relative">
                        <div className="flex w-full items-center gap-2 pb-8 pt-0">
                            <Skeleton style={{ width: "184px", height: "32px" }} />
                        </div>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {
                                    Array.from({ length: 2 }).map((_, i) => (
                                        <div key={i} className="grid gap-2">
                                            <Skeleton style={{ width: "106px", height: "16px" }} />
                                            <Skeleton className="w-full h-12" />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {
                                    Array.from({ length: 2 }).map((_, i) => (
                                        <div key={i} className="grid gap-2">
                                            <Skeleton style={{ width: "106px", height: "16px" }} />
                                            <Skeleton className="w-full h-12" />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {
                                    Array.from({ length: 2 }).map((_, i) => (
                                        <div key={i} className="grid gap-2">
                                            <Skeleton style={{ width: "106px", height: "16px" }} />
                                            <Skeleton className="w-full h-12" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}