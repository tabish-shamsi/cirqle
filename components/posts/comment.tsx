import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Comment({ comment, parent }: any) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.user.avatar} />
        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold mr-1">{comment.user.name}</span>
          {parent && (
            <span className="text-primary font-medium">
              @{parent.user.name}
            </span>
          )}
          <span className="text-muted-foreground">{comment.text}</span>
        </p>
      </div>
    </div>
  );
}
