import { User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
export default function UserMessage({ message }: { message: string }) {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="rounded-lg p-4 max-w-[80%] bg-accent-600">
        <p className="text-sm">{message}</p>
      </div>
      <div className="p-2 pe-4">
        <div className="py-auto">
          {isSignedIn && user && isLoaded ? (
            <Image
              src={user.imageUrl}
              alt="User profile picture"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <User size={32} />
          )}
        </div>
      </div>
    </div>
  );
}
