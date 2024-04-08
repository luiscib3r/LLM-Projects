import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "ai";
import { Markdown } from "./markdown";

type MessageTileProps = {
  message: Message;
};

export const MessageTile = ({ message }: MessageTileProps) => {
  const isYou = message.role == "user";

  return (
    <div className="flex space-x-3 items-start my-4 mx-w-[calc(80%)] md:max-w-full text-wrap">
      <Avatar>
        <AvatarFallback className="font-smibold">
          {isYou ? "👤" : "🤖"}
        </AvatarFallback>
      </Avatar>
      <div className="w-1" />
      <div className="max-w-[80%]">
        <div className="flex flex-grow flex-col gap-3 gap-y-5">
          <Markdown content={message.content} />
        </div>
      </div>
    </div>
  );
};
