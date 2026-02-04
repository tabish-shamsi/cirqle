"use client";

import { deleteComment, getCommentReplies } from "@/actions/post/comment";
import Comment from "./comment";
import { Button } from "../ui/button";
import IComment from "@/types/Comment";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

export default function CommentReplies({
  parentId,
  setComments,
  replies,
  repliesCount,
  parent,
}: {
  parentId: string;
  repliesCount: number;
  setComments: any;
  replies: any[];
  parent: string;
}) {
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  // if (repliesCount === 0) return null;

  // const toggleReplies = () => {
  //   if (open && repliesCount === replies.length) {
  //     setReplies([]);
  //     setOpen(false);
  //     return;
  //   }

  //   setOpen(true);
  //   setReplies(
  //     comments.filter((c) => c.parentId === comment.id).slice(0, counter * 2),
  //   );
  //   setCounter(counter + 1);
  // };

  const fetchCommentReplies = async () => {
    if (open && replies.length === repliesCount) {
      setComments((prev: IComment[]) =>
        prev.map((c: IComment) =>
          c._id.toString() === parentId ? { ...c, replies: [] } : c,
        ),
      );
      setOpen(false);
      return;
    }

    const newReplies = await getCommentReplies(parentId);
    if (newReplies.length > 0) {
      setComments((prev: IComment[]) =>
        prev.map((c: IComment) =>
          c._id.toString() === parentId
            ? { ...c, replies: [...c.replies, ...newReplies] }
            : c,
        ),
      );
      setOpen(true);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const res = await deleteComment(commentId);
    if (res.error) return toast.error(res.error);
    else {
      setComments((prev: IComment[]) =>
        prev.map((c: IComment) =>
          c._id.toString() === parentId
            ? {
                ...c,
                replies: c.replies.filter(
                  (r) => r._id.toString() !== commentId,
                ),
              }
            : c,
        ),
      );
      // setCommentsCount((prev) => prev - 1);
      toast.success(res.message);
      return;
    }
  };

  return (
    <>
      <div className="space-y-4">
        {replies.length > 0 &&
          replies.map((comment: IComment) => (
            <div key={comment._id.toString()} className="flex gap-2 ml-14">
              <Comment comment={comment} parent={parent} />
              {comment.author._id.toString() === user?.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-full px-0 py-0 h-8 w-8"
                    >
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Button
                      onClick={() =>
                        handleDeleteComment(comment._id.toString())
                      }
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      Delete
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
      </div>

      {repliesCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="ml-14 -mt-4 px-0 text-xs text-muted-foreground"
          onClick={fetchCommentReplies}
        >
          {open && repliesCount === replies.length
            ? "___ Hide replies"
            : `___ View replies (${repliesCount})`}
        </Button>
      )}
    </>
  );
}
