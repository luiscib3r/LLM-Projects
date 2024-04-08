"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "ai";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { MessageTile } from "./message_tile";

type ChatWindowProps = {
  chatId: string;
  initialMessages: Message[];
};

export const ChatWindow = ({ chatId, initialMessages }: ChatWindowProps) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${chatId}`,
    initialMessages: initialMessages.toReversed(),
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col items-center grow overflow-hidden">
      <ScrollArea className="max-h-[calc(100% - 150px)] h-full w-full flex-1">
        <div className="px-4 sm:px-12 2xl:px-[430px] relative">
          {messages.map((message) => (
            <MessageTile key={message.id} message={message} />
          ))}
        </div>
        <div ref={scrollRef} />
      </ScrollArea>
      <div className="w-full text-center my-2 mx-auto px-4 md:max-w-[80%] lg:max-w-[70%] 2xl:max-w-[50%]">
        <form onSubmit={handleSubmit} className="flex">
          <Input
            className="bg-neutral-800 border-orange-800 focus:border-orange-500 h-12"
            placeholder="How can I help you?"
            value={input}
            onChange={handleInputChange}
          />
          <div className="w-2" />
          <Button type="submit" className="h-12 bg-orange-600 hover:bg-orange-500">
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
};
