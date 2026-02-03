import { formatDate } from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Comment({ comment, parent }: any) {
  return (
    <div className="flex items-start gap-3 bg-muted p-2 rounded-2xl w-fit">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author?.avatar?.url} />
        <AvatarFallback>{comment.author?.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold mr">{comment.author.name}</span>
          <span className="mx-1">commented {formatDate(comment.createdAt)}</span>
          <br />
          {parent && (
            <span className="text-primary font-medium">
              @{parent.user.name}
            </span>
          )}
          <span className="text-muted-foreground">{comment.comment}</span>
        </p>
      </div>
    </div>
  );
}

