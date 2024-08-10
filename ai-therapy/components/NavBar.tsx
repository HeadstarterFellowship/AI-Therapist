import { Bot, Settings } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import {

    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
export default function NavBar() {
  return (
    <header className="bg-background shadow-md text-primary-foreground py-4 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
        <Link href={"/"}>
      <div className="p-2 ps-4">
        <div className="py-auto">
          <Bot size={32} />
        </div>
      </div>
        </Link>
      <h2 className="text-lg font-medium">Chatbot</h2>
    </div>
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
  </header>
  )
}
