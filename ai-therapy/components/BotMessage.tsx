import { Bot } from "lucide-react";
import Image from "next/image";
export default function BotMessage({message}: {message: string}) {
    return (
        <div className="flex items-start gap-4">
          <div className="p-2 ps-4">
            <div className="py-auto">
              <Image 
                src="/therapyroboticon.svg"
                alt="bot"
                width={32}
                height={32}
                className="rounded-full w-12 h-12"
              
              
              >


              </Image>
              
            </div>
          </div>
          <div className="rounded-lg p-4 max-w-[80%] bg-base-700">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      );
}
