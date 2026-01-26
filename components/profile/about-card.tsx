import { profileAbout } from "@/lib/temporary-mock-data";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";

export default function AboutCard() {
  return (
    <Card className="w-full gap-0 relative">
      <Button variant="ghost" className="absolute right-4 top-4">
        <Ellipsis />
      </Button>
      <CardContent className="text-sm space-y-6">
        {/* Header */}
        <div className="">
          <h3 className="font-semibold text-[17px] mb-2">About</h3>
          <p className="text-base text-muted-foreground">{profileAbout.bio}</p>
        </div>
        {/* Bio */}

        {/* Basic Info */}
        <div className="space-y-4">
          {Object.entries(profileAbout).map(([key, value]) => {
            if (key === "bio") {
              return null;
            }
            return (
              <div key={key} className="text-base">
                <span className="mr-2 font-medium capitalize">
                  {key.split("_").join(" ")}:
                </span>
                <span className="text-muted-foreground">
                  {key === "birthday" || key === "joined"
                    ? new Date(value).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : value}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
