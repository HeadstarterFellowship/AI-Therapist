"use client";

import { useState } from "react";
import { useVoice } from "@humeai/voice-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function UserInput() {
  const { sendUserInput } = useVoice();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      sendUserInput(text);
      setText("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className=" p-8 flex items-center gap-2">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 pr-12 h-12"
      />

      <Button
        type="submit"
        onClick={handleSubmit}
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <Send className="w-5 h-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}
