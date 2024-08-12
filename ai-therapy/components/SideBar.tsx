import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import Link from "next/link";
import { HomeIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";

export default function SideBar() {
  return (
    <div className="flex h-[100%]">
      <div className="hidden md:flex w-64 flex-col border-r bg-background p-4 shadow-lg h-full">
        <div className=" flex items-center p-2 mb-4">
          <h2 className="text-lg font-medium">Chat History</h2>
        </div>
        <nav className="flex flex-col space-y-1">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <MessageCircleIcon className="h-4 w-4" />
            Chat
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}
