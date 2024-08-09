"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Bot, Mic, Send, Settings, User } from "lucide-react";
import UserMessage from "@/components/UserMessage";
import BotMessage from "@/components/BotMessage";

interface Message {
    type: "bot" | "user";
    message: string;
  }
  
  const botMessages: string[] = [
    "Hey there! How can I assist you today?",
    "Great, I'd love to learn more. Can you tell me about the new features?",
    "I'm here to help! What would you like to know?",
  ];
  
  const userMessages: string[] = [
    "I'm looking for information on your latest product updates.",
    "Absolutely! Our latest update includes several new features to improve the user experience...",
  ];
  const botResponses: string[] = [
    "Sure, I can help with that!",
    "Can you provide more details?",
    "That's interesting!",
    "Let me check on that for you.",
    "I'm here to assist you.",
    "Could you clarify your question?",
  ];
  const initialCombinedMessages: Message[] = [];
  for (let i = 0; i < Math.max(botMessages.length, userMessages.length); i++) {
    if (i < botMessages.length) {
      initialCombinedMessages.push({ type: "bot", message: botMessages[i] });
    }
    if (i < userMessages.length) {
      initialCombinedMessages.push({ type: "user", message: userMessages[i] });
    }
  }
  
  
  
  export default function Chat() {
    const [messages, setMessages] = useState<Message[]>(initialCombinedMessages);
    const [inputMessage, setInputMessage] = useState<string>("");
  
    const handleSendMessage = () => {
      if (inputMessage.trim() === "") return;
  
      // Add user message
      const newMessages: Message[] = [
        ...messages,
        { type: "user", message: inputMessage },
      ];
  
      // Select a random bot message
      const randomBotMessage =
        botResponses[Math.floor(Math.random() * botResponses.length)];
  
      // Add bot message
      newMessages.push({ type: "bot", message: randomBotMessage });
  
      // Update state
      setMessages(newMessages);
      setInputMessage("");
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };
  
    return (
      <>
      <div className="flex flex-col h-screen bg-background">
        <header className="bg-background shadow-md text-primary-foreground py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 ps-4">
              <div className="py-auto">
                <Bot size={32} />
              </div>
            </div>
            <h2 className="text-lg font-medium">Chatbot</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary/20"
          >
            <Settings className="w-5 h-5" />
            <span className="sr-only">More options</span>
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {messages.map((item, index) =>
              item.type === "user" ? (
                <UserMessage key={index} message={item.message} />
              ) : (
                <BotMessage key={index} message={item.message} />
              )
            )}
          </div>
        </div>
        <div className="bg-accent-700 border-t p-8 flex items-center gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 pr-12 h-12"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Mic className="w-5 h-5" />
            <span className="sr-only">Voice Input</span>
          </Button>
          <Button
            type="submit"
            onClick={handleSendMessage}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Send className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
  
 
      </>
  
      
    );
  }
  