import { formatDate } from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import IComment from "@/types/Comment";
import useAuth from "@/hooks/useAuth";

export default function Comment({
  comment,
  parent,
}: {
  comment: IComment;
  parent?: string;
}) {
  const { user } = useAuth();

  return (
    <div className="flex items-start gap-3 bg-muted p-2 rounded-2xl w-fit">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author?.avatar?.url} />
        <AvatarFallback>{comment.author?.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold mr">{comment.author.name}</span>
          <span className="mx-1">
            {parent ? (
              <>
                replied{" "}
                <span className="text-primary font-medium">
                  {user?.name === parent ? "himself" : parent}{" "}
                </span>
              </>
            ) : (
              "Commented "
            )}
            {formatDate(comment.createdAt)}
          </span>
          <br />
          <span className="text-muted-foreground">{comment.comment}</span>
        </p>
      </div>
    </div>
  );
}
