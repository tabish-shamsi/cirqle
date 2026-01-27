import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { getAboutDetails } from "@/data/user";
import { notFound } from "next/navigation";

export default async function AboutCard({ userId }: { userId: string }) {
  const aboutDetails = await getAboutDetails(userId)

  if (!aboutDetails) return notFound()

  return (
    <Card className="w-full gap-0 relative">
      <Button variant="ghost" className="absolute right-4 top-4">
        <Ellipsis />
      </Button>
      <CardContent className="text-sm space-y-6">
        {/* Header */}
        <div className="">
          <h3 className="font-semibold text-lg mb-2">About</h3>
        </div>
        {/* Bio */}

        {/* Basic Info */}
        <div className="space-y-4">
          {Object.entries(aboutDetails).map(([key, value]) => (
            <div key={key} className="text-base">
              <span className="mr-2 font-medium capitalize">
                {key}:
              </span>
              <span className="text-muted-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Socials */}
      </CardContent>
    </Card>
  );
}
