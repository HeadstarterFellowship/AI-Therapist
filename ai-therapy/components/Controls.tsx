"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import {
  BotMessageSquare,
  MessageCircleIcon,
  MessageCircleOff,
  Mic,
  MicOff,
  Phone,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/lib/utils";
import UserInput from "./UserInput";
import { useState } from "react";
export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, connect } = useVoice();

  const handleToggleConnection = () => {
    if (status.value !== "connected") {
      connect()
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    } else {
      disconnect();
    }
  };
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-2 flex flex-col items-center justify-center"
      )}
    >
      <AnimatePresence>
        <motion.div
          initial={{
            y: "100%",
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: "100%",
            opacity: 0,
          }}
          className={
            "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4 bg-accent-700 "
          }
        >
          <UserInput />
          <Toggle
            className={"bg-transparent"}
            pressed={!isMuted}
            onPressedChange={() => {
              if (isMuted) {
                unmute();
              } else {
                mute();
              }
            }}
          >
            {isMuted ? (
              <MicOff className={"size-4 w-5 h-5 "} />
            ) : (
              <Mic className={"size-4 w-5 h-5"} />
            )}
          </Toggle>

          <Button
            className={`flex items-center gap-1 ${
              status.value === "connected" ? "" : "bg-green-700"
            }`}
            onClick={handleToggleConnection}
            variant={status.value === "connected" ? "destructive" : "default"}
          >
            <span>
              {status.value === "connected" ? (
                <MessageCircleOff
                  className={"size-4 opacity-50"}
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              ) : (
                <MessageCircleIcon
                  className={"size-4 opacity-50"}
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              )}
            </span>
            <span>
              {status.value === "connected" ? "End Chat" : "Start Chat"}
            </span>
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
