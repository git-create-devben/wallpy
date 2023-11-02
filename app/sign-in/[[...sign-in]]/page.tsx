import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex justify-center align-middle w-full h-[100vh]">
      <SignIn />
    </div>
  );
}
