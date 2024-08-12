import { Bot, HomeIcon, MenuIcon, MessageCircleIcon, Settings, SettingsIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="flex ">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background p-4 shadow-lg min-h-screen">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">ChatBot</h2>
        </div>
        <nav className="mt-6 flex flex-col space-y-1">
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

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-background shadow-md text-primary-foreground py-4 px-6 flex items-center justify-between w-full h-24">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <Link href={"/"}>
              <div className="p-2 ps-4">
                <div className="py-auto">
                  <Image 
                    src="/therapyroboticon.svg"
                    alt="bot"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8"
                  />
                </div>
              </div>
            </Link>
            <h2 className="text-lg font-medium">Chatbot</h2>
          </div>
          <div className="gap-2 flex justify-center ">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary/20"
            >
              <Settings className="w-5 h-5" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </header>

        {/* Add your main content here */}
        <main className="flex-grow p-6">
          {/* Your main content goes here */}
        </main>
      </div>
    </div>
  );
}