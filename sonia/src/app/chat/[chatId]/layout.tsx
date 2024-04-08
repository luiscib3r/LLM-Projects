import React from "react";

type ChatLayoutProps = {
  children: React.ReactNode;
};

export default function ChatLayout({ children }: Readonly<ChatLayoutProps>) {
  return <main className="flex h-full overflow-clip">{children}</main>;
}
