import { Sidebar } from "../sidebar";

export const ChatLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex h-full">
      <Sidebar />
      <div className="h-full w-full">{children}</div>
    </main>
  );
};
