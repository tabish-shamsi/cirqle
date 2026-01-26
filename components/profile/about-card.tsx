import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { getAboutDetails } from "@/data/user";
import { notFound } from "next/navigation";

export default async function AboutCard({ username }: { username: string }) {
  const aboutDetails = await getAboutDetails(username)

  if (!aboutDetails) return notFound()

  const { about, bio } = aboutDetails

  return (
    <Card className="w-full gap-0 relative">
      <Button variant="ghost" className="absolute right-4 top-4">
        <Ellipsis />
      </Button>
      <CardContent className="text-sm space-y-6">
        {/* Header */}
        <div className="">
          <h3 className="font-semibold text-[17px] mb-2">About</h3>
          <p className="text-base text-muted-foreground">{bio}</p>
        </div>
        {/* Bio */}

        {/* Basic Info */}
        <div className="space-y-4">
          {Object.entries(about).map(([key, value]) => (
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
