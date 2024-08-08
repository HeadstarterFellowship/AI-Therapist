import { User } from "lucide-react";

export default function UserMessage({message}: {message: string}) {
    return (
        <div className="flex items-start gap-4 justify-end">
          <div className="rounded-lg p-4 max-w-[80%] bg-accent-600">
            <p className="text-sm">{message}</p>
          </div>
          <div className="p-2 pe-4">
            <div className="py-auto">
              <User size={32} />
            </div>
          </div>
        </div>
      );
}
