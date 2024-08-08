// ./components/ClientComponent.tsx
"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";

export default function ClientComponent({
    accessToken,
    configId,
}: {
    accessToken: string;
    configId: string;
}) {
    return (
        <VoiceProvider
            auth={{ type: "accessToken", value: accessToken }}
            configId={configId}
        >
            <Messages />
            <Controls />
        </VoiceProvider>
    );
}