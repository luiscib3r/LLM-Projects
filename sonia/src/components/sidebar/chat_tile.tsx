import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { ArrowDownToLine, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ChatTileProps = {
  chat: Chat;
  selected: boolean;
  updateChatAction: ({
    id,
    title,
  }: {
    id: string;
    title: string;
  }) => Promise<void>;
  deleteChatAction: (id: string) => Promise<void>;
};

export const ChatTile = ({
  chat,
  selected,
  updateChatAction,
  deleteChatAction,
}: ChatTileProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const handleOnClick = () => {
    if (!selected) {
      router.push(`/chat/${chat.id}`);
    }
  };

  const handleRename = async () => {
    await updateChatAction({ id: chat.id, title });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteChatAction(chat.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleRename();
    }
  };

  return (
    <div
      key={chat.id}
      className={cn(
        "group relative flex w-full p-2 rounded-md hover:bg-orange-800 cursor-pointer text-white text-sm my-1",
        selected && "bg-orange-600"
      )}
    >
      <div className="w-full" onClick={handleOnClick}>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleRename}
            autoFocus
            className="outline-none bg-transparent text-white w-full"
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="truncate w-full text-start">{title}</div>
        )}
      </div>
      <div>
        {isEditing ? (
          <button>
            <ArrowDownToLine className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex">
            <button onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
            </button>
            <div className="w-2" />
            <button onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
