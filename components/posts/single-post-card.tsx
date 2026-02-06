"use client";

import { formatDate } from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import MediaSlider from "./media-slider";
import { Button } from "../ui/button";
import {
  Ellipsis,
  Loader2,
  MessageCircle,
  SendHorizonal,
  X,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { getUserInitials } from "@/utils/getUserInitials";
import IPost from "@/types/Post";
import { Dispatch, SetStateAction, useState } from "react";
import LikeButton from "./like-button";
import { Input } from "../ui/input";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import IComment from "@/types/Comment";
import Comment from "./comment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  deleteComment,
  editComment,
  postComment,
} from "@/actions/post/comment";
import CommentReplies from "./comment-replies";
import { ScrollArea } from "../ui/scroll-area";
import avatarUrl from "@/utils/avatarUrl";

export default function SinglePostCard({
  post,
  setOpen,
}: {
  post: IPost;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { user } = useAuth();

  const [comments, setComments] = useState<IComment[]>([]);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount ?? 0);
  const [isGettingComments, setIsGettingComments] = useState(false);

  const [comment, setComment] = useState("");
  const [repliengTo, setRepliengTo] = useState("");
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState("");

  const handleCommenting = async () => {
    if (editCommentId) {
      const res = await editComment(editCommentId, comment);
      if (res.error) return toast.error(res.error);
      const edittedComments = comments.map((c) =>
        c._id.toString() === editCommentId ? { ...c, comment } : c,
      );

      setComments(edittedComments);
      setComment("");
      setEditCommentId("");
      return;
    }

    const res = await postComment(post._id.toString(), comment, replyingId);
    if (res.error) {
      toast.error(res.error);
      return;
    }

    if (res.success) {
      setComment("");
      if (comments.length > 1) {
        if (replyingId && repliengTo) {
          setComments((prev: IComment[]) =>
            prev.map((c: IComment) =>
              c._id.toString() === replyingId
                ? {
                    ...c,
                    replies: [res.comment, ...c.replies],
                  }
                : c,
            ),
          );
          setRepliengTo("");
          setReplyingId(null);
        } else {
          setComments((prev) => [res.comment, ...prev]);
        }

        setCommentsCount((prev) => prev - 1);
      } else {
        getComments();
        setCommentsCount(commentsCount + 1)
      }
    }
  };

  const handleClose = () => {
    if (setOpen) setOpen(false);
    router.back();
  };

  async function getComments() {
    setIsGettingComments(true);
    const res = await fetch(`/api/posts/${post._id}/get-comments`);
    const data = await res.json();

    setComments(data);
    setIsGettingComments(false);
  }

  const handleDeleteComment = async (commentId: string) => {
    const res = await deleteComment(commentId);
    if (res.error) return toast.error(res.error);
    else {
      setComments((prev) => prev.filter((c) => c._id.toString() !== commentId));
      setCommentsCount((prev) => prev - 1);
      toast.success(res.message);
      return;
    }
  };

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="relative w-full flex items-center justify-center gap-0 p-6">
        <h2 className="text-xl font-bold">{post.author.name}'s Post</h2>

        <Button
          variant="secondary"
          className="absolute  top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full text-muted-foreground"
          onClick={handleClose}
        >
          <X />
        </Button>
      </CardHeader>
      <Separator />

      <ScrollArea className="h-140">
        <CardContent className="space-y-4 py-6">
          <div className="flex flex-row gap-3 items-center">
            <Avatar className="w-11 h-11">
              <AvatarImage src={avatarUrl(post.author?.avatar?.url ?? "")} />
              <AvatarFallback>
                {getUserInitials(post.author.name)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-lg font-medium leading-none">
                {post.author.name}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          <p>{post.content}</p>

          {post.media.length > 0 && <MediaSlider media={post.media} />}

          <div className="flex items-center ">
            <LikeButton
              isLiked={post.isLiked ?? false}
              likesCount={post.likesCount ?? 0}
              postId={post._id.toString()}
            />
            <Button className="text-muted-foreground" variant="ghost">
              <MessageCircle className="h-4 w-4" />
              {commentsCount}
            </Button>
            <Button className="text-muted-foreground" variant="ghost">
              <SendHorizonal className="h-4 w-4" />
              126
            </Button>
          </div>

          {commentsCount > 0 && comments.length === 0 && (
            <Button onClick={getComments} variant="ghost">
              View Comments{" "}
              {isGettingComments && (
                <Loader2 className="text-primary animate-spin" />
              )}
            </Button>
          )}

          {commentsCount === 0 && (
            <p className="text-sm text-muted-foreground my-2">
              No comments yet
            </p>
          )}

          {/* COMMENTS */}

          {comments.length > 0 &&
            comments.map((comment) => (
              <div key={comment._id.toString()} className="space-y-2">
                <div className="flex gap-2">
                  <Comment comment={comment} />
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
                        onClick={() => {
                          setRepliengTo(comment.author.name);
                          setReplyingId(comment._id.toString());
                        }}
                        variant="ghost"
                        size="sm"
                        className="w-full"
                      >
                        Reply
                      </Button>
                      <Button
                        onClick={() => {
                          setEditCommentId(comment._id.toString());
                          setComment(comment.comment);
                        }}
                        variant="ghost"
                        size="sm"
                        className="w-full"
                      >
                        Edit
                      </Button>
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
                </div>
                <CommentReplies
                  replies={comment.replies}
                  setComments={setComments}
                  parentId={comment._id.toString()}
                  repliesCount={comment.repliesCount}
                  parent={comment.author.name}
                />
              </div>
            ))}
        </CardContent>
      </ScrollArea>

      <CardFooter>
        <div className="w-full">
          {repliengTo && replyingId && (
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground mb-1"
              onClick={() => {
                setRepliengTo("");
              }}
            >
              Replying to: <strong>{repliengTo}</strong> <X />
            </Button>
          )}
          <div className="flex w-full pb-6 gap-4 items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user && getUserInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                handleCommenting();
              }}
              className="flex-1 relative"
            >
              <Input
                placeholder="Add a comment..."
                className="rounded-full placeholder:text-muted-foreground"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </form>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
