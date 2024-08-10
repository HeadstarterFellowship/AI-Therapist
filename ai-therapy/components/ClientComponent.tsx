"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";
import {  useRef } from "react";
import StartCall from "./StartChat";
export default function ClientComponent({
    accessToken,
    configId,
}: {
    accessToken: string;
    configId: string;
}) {
    const timeout = useRef<number | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <VoiceProvider
            auth={{ type: "accessToken", value: accessToken }}
            configId={configId}
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
                <StartCall />
            </div>
        </VoiceProvider>
    );
}