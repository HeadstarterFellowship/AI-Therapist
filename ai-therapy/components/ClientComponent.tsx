"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";
import {  useEffect, useRef } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
export default function ClientComponent({
    accessToken,
    configId,
}: {
    accessToken: string;
    configId: string;
}) {
    const timeout = useRef<number | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
 

  const {user, isSignedIn} = useUser();

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch("/api/hume-chat");
        const data = await response.json();
        console.log(data);

        if (isSignedIn) {
          for (let i = 0; i < data.chatsPage.length; i++) {
            const { error } = await supabaseClient
              .from("userMessages")
              .upsert({ user_id: user?.id, chat_group_id: data.chatsPage[i].chatGroupId, chat_id: data.chatsPage[i].id }, {onConflict: 'chat_id'})
            if (error) {
              console.error("Error inserting new chat group id: ", error.message);
            } else {
              console.log("Chat group id inserted successfully");
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchChats();
  }, [ isSignedIn, user?.id]);
  


    return (
        <VoiceProvider
            auth={{ type: "accessToken", value: accessToken }}
            configId={configId}
            resumedChatGroupId="0d67a6a2-1249-4f06-a055-2eb57dce7a38" 
            onMessage={() => {
                if (timeout.current) {
                  window.clearTimeout(timeout.current);
                }
      
                timeout.current = window.setTimeout(() => {
                  if (ref.current) {
                    const scrollHeight = ref.current.scrollHeight;
      
                    ref.current.scrollTo({
                      top: scrollHeight,
                      behavior: "smooth",
                    });
                  }
                }, 200);
              }}
        >
              <div ref={ref}>
                <Messages />
                <Controls />
                
                
            </div>
        </VoiceProvider>
    );
}