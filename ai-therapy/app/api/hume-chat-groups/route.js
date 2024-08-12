import { NextResponse } from "next/server";
import { HumeClient } from "hume";

export async function GET(){

    const client = new HumeClient({apiKey:process.env.HUME_API_KEY});

    try {
        const res = await client.empathicVoice.chatGroups.listChatGroupEvents("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
            pageNumber: 0,
            pageSize: 3,
            ascendingOrder: true
        });
        
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.error(error);
    }
}