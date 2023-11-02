import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex justify-center items-center w-full h-[100vh]">
      <SignUp />;
    </div>
  );
}
