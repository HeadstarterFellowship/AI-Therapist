"use client";
import { cn } from "@/lib/utils";
import { useVoice } from "@humeai/voice-react";

import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import NavBar from "./NavBar";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";




const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();
  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <motion.div
      layoutScroll
      className={"flex flex-col h-screen bg-background"}
      ref={ref}
    >
      <NavBar />
      <motion.div className={"flex-1 p-6"}>
        <AnimatePresence mode={"popLayout"}>
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn("grid gap-4 my-4")}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  {msg.type === "user_message" ? (
                    <UserMessage message={msg.message.content || ""} />
                  ) : (
                    <BotMessage message={msg.message.content || ""} />
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;
