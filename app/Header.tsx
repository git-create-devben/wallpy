import React from "react";
// import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode";
import UploadButton from "@/components/UploadButton";
import {
  auth,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex justify-between p-2">
      <div className="flex items-center text-center gap-6 w-full mb-2">
        <h2 className="text-4xl font-bold mb-2">
          <span className="text-blue-500">W</span>
          <span className="text-red-500">a</span>
          <span className="text-green-500">l</span>
          <span className="text-yellow-500">l</span>
          <span className="text-purple-500">p</span>
          <span className="text-pink-500">y</span>
          <span className="text-orange-500">.</span>
        </h2>
      </div>
      <div className="flex gap-4">
        <SignedIn />
        <SignedOut />
        <Example />
        <UploadButton />
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export function Example() {
  return (
   <header style={{ display: "flex", justifyContent: "space-between", width: 60, background: "red", color: "white" }}>
    <SignedIn>
      {/* Mount the UserButton component */}
      <UserButton />
    </SignedIn>
    <SignedOut>
      {/* Signed out users get sign in button */}
      <SignInButton />
    </SignedOut>
  </header>
  );
}
