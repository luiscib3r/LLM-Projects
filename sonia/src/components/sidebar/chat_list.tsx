"use client";

import { Chat } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ChatTile } from "./chat_tile";
import { NewChatButton } from "./new_chat_button";

type ChatListProps = {
  serverChats: Chat[];
  createChatAction: () => Promise<Chat>;
  updateChatAction: ({
    id,
    title,
  }: {
    id: string;
    title: string;
  }) => Promise<Chat>;
  deleteChatAction: (id: string) => Promise<Chat>;
};

export const ChatList = ({
  serverChats,
  createChatAction,
  updateChatAction,
  deleteChatAction,
}: ChatListProps) => {
  const router = useRouter();

  const { chatId } = useParams<{ chatId: string }>();

  const [chats, setChats] = useState<Chat[]>(serverChats);

  const createChat = async () => {
    const newChat = await createChatAction();
    setChats((prev) => [newChat, ...prev]);
    router.push(`/chat/${newChat.id}`);
  };

  const updateChat = async (data: { id: string; title: string }) => {
    const updatedChat = await updateChatAction(data);
    setChats((prev) =>
      prev.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat))
    );
  };

  const deleteChat = async (id: string) => {
    await deleteChatAction(id);
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    router.push("/");
  };

  return chats ? (
    <div className="h-full hidden md:flex md:flex-col md:w-[320px] bg-[#21201C] p-2">
      <NewChatButton onClick={createChat} />
      <div className="h-5" />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatTile
            key={chat.id}
            chat={chat}
            selected={chat.id === chatId}
            updateChatAction={updateChat}
            deleteChatAction={deleteChat}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
