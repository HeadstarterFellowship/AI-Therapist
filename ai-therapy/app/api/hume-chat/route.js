import { NextResponse } from "next/server";
import { HumeClient } from "hume";

export async function GET(){

    const client = new HumeClient({apiKey:process.env.HUME_API_KEY});

    try {
        const res = await client.empathicVoice.chats.listChats({
            pageSize:100,
            ascendingOrder: false,
        });
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.error(error);
    }
}