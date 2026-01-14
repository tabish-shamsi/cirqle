"use client";

import { comments } from "@/lib/temporary-mock-data";
import { useState } from "react";
import { Button } from "../ui/button";
import Comment from "./comment";

export default function CommentReplies({ comment }: { comment: any }) {
  const repliesCount = comments.filter((c) => c.parentId === comment.id).length;

  const [replies, setReplies] = useState<any[]>([]);
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(false);

  if (repliesCount === 0) return null;

  const toggleReplies = () => {
    if (open && repliesCount === replies.length) {
      setReplies([]);
      setOpen(false);
      return;
    }

    setOpen(true);
    setReplies(
      comments.filter((c) => c.parentId === comment.id).slice(0, counter * 2)
    );
    setCounter(counter + 1);
  };

  return (
    <>
      <div className="space-y-4">
        {open &&
          replies.map((reply) => (
            <div key={reply.id} className="ml-14">
              <Comment comment={reply} parent={comment} />
            </div>
          ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="ml-14 -mt-4 px-0 text-xs text-muted-foreground"
        onClick={toggleReplies}
      >
        {open && repliesCount === replies.length
          ? "___ Hide replies"
          : `___ View replies (${repliesCount})`}
      </Button>
    </>
  );
}
