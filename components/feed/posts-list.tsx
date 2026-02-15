"use client";

import IPost from "@/types/Post";
import { useEffect, useRef, useState, RefObject } from "react";
import { PostCard } from "../posts/post-card";
import loadMorePosts from "@/actions/post/load-more-posts";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import useInView from "@/hooks/useInView";
import { quotelessJson } from "zod/v3";

export default function PostList({
  initialPosts,
  userId,
  q,
  postType,
}: {
  initialPosts: IPost[];
  userId?: string;
  q?: string;
  postType?: "video";
}) {
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [count, setCount] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const loadingElement = useRef<HTMLDivElement>(null);
  const isIntersecting = useInView(
    loadingElement as RefObject<HTMLDivElement>,
    {
      threshold: 1,
      rootMargin: "150px",
    },
  );

  const loadMore = async () => {
    const more = await loadMorePosts(count, userId, q, postType);

    if (more.length === 0) {
      setIsEnd(true);
    }

    setPosts([...posts, ...more]);
    setCount(count + 1);
  };

  useEffect(() => {
    if (isIntersecting) {
      loadMore();
    }
  }, [isIntersecting]);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id.toString()} post={post} setPosts={setPosts} />
      ))}
      {isEnd ? (
        <p className="text-muted-foreground text-center">
          You have reach the end
        </p>
      ) : (
        <Card ref={loadingElement}>
          <CardContent className="flex justify-center">
            <Loader2 className="animate-spin text-primary" />
          </CardContent>
        </Card>
      )}
    </>
  );
}
