import { MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { chats } from "@/lib/temporary-mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ChatPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-primary cursor-pointer p-3">
          <MessageCircle className="w-5 lg:w-7" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-80 p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="text-sm md:text-lg font-semibold">Messeges</h4>
        </div>

        {/* Chat list */}
        <div className="max-h-80 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex gap-3 px-4 py-3 hover:bg-muted cursor-pointer"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{chat.name}</p>
                  {chat.unread && (
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground truncate">
                  {chat.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
