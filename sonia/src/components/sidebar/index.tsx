import { createChat, deleteChat, getChats, updateChat } from "@/lib/chats";

import { revalidatePath } from "next/cache";
import { ChatList } from "./chat_list";

export const Sidebar = async () => {
  const createChatAction = async () => {
    "use server";
    const newChat = await createChat();
    return newChat;
  };

  const getChatsAction = async () => {
    "use server";
    return getChats();
  };

  const updateChatsAction = async (data: { id: string; title: string }) => {
    "use server";
    const updatedChat = await updateChat(data);
    revalidatePath(`/chat/${updatedChat.id}`);
    return updatedChat;
  };

  const deleteChatsAction = async (id: string) => {
    "use server";
    const deletedChat = await deleteChat(id);
    return deletedChat;
  };

  const chats = await getChatsAction();

  return (
    <ChatList
      serverChats={chats}
      createChatAction={createChatAction}
      updateChatAction={updateChatsAction}
      deleteChatAction={deleteChatsAction}
    />
  );
};
