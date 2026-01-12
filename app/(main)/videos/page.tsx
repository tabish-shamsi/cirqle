import PostList from "@/components/posts/post-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { posts } from "@/lib/temporary-mock-data";
import { Filter, Search } from "lucide-react";

export default async function Videos() {
  const videoPosts = await posts.filter((post) =>
    post.media.some((media) => media.type === "video")
  );
  console.log(videoPosts);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-4/5 space-y-4">
        <Card>
          <CardContent className="flex w-full items-center justify-between">
            <CardTitle className="text-2xl font-bold">Videos</CardTitle>

            <div className="flex gap-2">
              <div className="bg-secondary w-60 flex items-center justify-center rounded-md">
                <input
                  type="text"
                  placeholder="Search Videos..."
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
        <PostList posts={videoPosts} />
      </div>
    </div>
  );
}
