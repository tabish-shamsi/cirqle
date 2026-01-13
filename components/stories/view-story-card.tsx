import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  imageUrl: string;
  username: string;
  avatar: string;
  children?: React.ReactNode;
};

export default function ViewStoryCard({
  imageUrl,
  username,
  avatar,
  children,
}: Props) {
  return (
    <div className="relative h-[600px] my-8 w-[350px] overflow-hidden rounded-xl bg-black">
      <img
        src={imageUrl}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute top-3 left-3 right-3 space-y-3 z-10">
        {children}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} />
          </Avatar>
          <span className="text-sm font-medium text-white">{username}</span>
        </div>
      </div>
    </div>
  );
}
