import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";

export default function Reels() {
  return (
    <div>
      <Card>
        <CardContent className="flex w-full items-center justify-between">
          <CardTitle className="text-2xl font-bold">Reels</CardTitle>

          <div className="flex gap-2">
            <div className="bg-secondary w-60 flex items-center justify-center rounded-md">
              <input
                type="text"
                placeholder="Search Reels..."
                className="w-full py-2 pl-4 border-none outline-none placeholder:text-sidebar-ring dark:placeholder:text-muted-foreground"
              />
              <Search className="h-7 w-7 text-sidebar-ring dark:text-muted-foreground mr-4" />
            </div>

            <Button variant="secondary" size="icon-xl">
              <Filter className="text-sidebar-ring dark:text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
