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

import { cn } from "@/lib/utils";
import UserInput from "./UserInput";

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
        "absolute bottom-0 left-0 w-full p-2 flex  items-center justify-center my-4"
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
            "xs:p-2 m-2 p-4 bg-card border border-border rounded-lg shadow-sm flex flex-col items-center xs:gap-2 gap-4 bg-accent-700 "
          }
        >
          <div className="flex flex-row justify-center items-center">
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
                <MicOff className={"xs:size-2 size-4 w-5 h-5 "} />
              ) : (
                <Mic className={"xs:size-2 size-4 w-5 h-5"} />
              )}
            </Toggle>
          </div>
          <div className="flex flex-row">
            

            <Button
              className={`flex items-center gap-1 ${
                status.value === "connected" ? "" : "bg-secondary-700"
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
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
