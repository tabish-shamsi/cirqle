import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton";

export default function SocialsCardSkeleton() {
  return (
    <Card>
      <CardContent>

        {/* Heading */}
        <Skeleton style={{ width: "145px", height: "32px", marginBottom: "16px" }} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 ">
          {
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} style={{ width: "100%", height: "36px" }} />
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}