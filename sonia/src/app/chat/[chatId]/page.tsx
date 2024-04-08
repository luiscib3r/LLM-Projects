import { getChat } from "@/lib/chats";
import { mapMessages } from "@/lib/vercel-ai";
import { redirect } from "next/navigation";
import { ChatWindow } from "./_components/chat_window";
import { Header } from "./_components/header";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

export default async function ChatPage({ params }: Readonly<ChatPageProps>) {
  const chat = await getChat(params.chatId);

  if (!chat) {
    redirect("/");
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <ChatWindow
        chatId={chat.id}
        initialMessages={mapMessages(chat.messages)}
      />
    </div>
  );
}
