import { comments } from "@/lib/temporary-mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Comment from "./comment";
import CommentReplies from "./comment-replies";

export default function Comments() {
  const topLevelComments = comments.filter((c) => c.parentId === null);

  return (
    <div className="space-y-4">
      {topLevelComments.map((comment) => {
        return (
          <div key={comment.id} className="space-y-2">
            <Comment comment={comment} />
            <CommentReplies comment={comment} />
          </div>
        );
      })}
    </div>
  );
}
