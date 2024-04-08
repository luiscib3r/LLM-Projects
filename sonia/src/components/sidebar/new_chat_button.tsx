"use client";

import { SquarePen } from "lucide-react";

type NewChatButtonProps = {
  onClick: () => Promise<void>;
};

export const NewChatButton = ({ onClick }: NewChatButtonProps) => {
  return (
    <button
      className="w-full flex justify-start items-center p-2 rounded-md hover:bg-orange-800 cursor-pointer text-white"
      onClick={onClick}
    >
      <p className="font-semibold text-start">New chat</p>
      <SquarePen className="w-4 h-4 ml-auto" />
    </button>
  );
};
