import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <>
   <div className="flex justify-center my-20">
    <SignUp appearance={{
        elements:{
            rootBox: "p-10",
        }
    }}/>
   </div>
    </>
  );
}