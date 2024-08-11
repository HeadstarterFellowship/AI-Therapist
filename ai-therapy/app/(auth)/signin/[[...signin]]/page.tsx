import { SignIn } from "@clerk/nextjs";

export default function Home() {
    return (
        <div className="flex justify-center my-20">
            <SignIn />
        </div>
    );
}