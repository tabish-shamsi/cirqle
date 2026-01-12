import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import SearchTitleForm from "./search-title-form";

interface Props {
  title: string;
  placeholder: string;
}

export default function SearchTitleHeader({ title, placeholder }: Props) {
  return (
    <Card>
      <CardContent className="flex w-full items-center justify-between">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>

        <div className="flex gap-2">
          <div className="bg-secondary w-60 flex items-center justify-center rounded-md">
            <SearchTitleForm placeholder={placeholder} />
            <Search className="h-7 w-7 text-sidebar-ring dark:text-muted-foreground mr-4" />
          </div>

          <Button variant="secondary" size="icon-xl">
            <Filter className="text-sidebar-ring dark:text-muted-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
