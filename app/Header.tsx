import React from "react";
import { UserButton } from "@clerk/nextjs";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header className=" flex justify-between p-4">
      <div className=" flex items-center gap-6 w-full">
        <h2 className=" text-4xl font-bold">
          <span className=" text-blue-500">W</span>
          <span className=" text-red-500">a</span>
          <span className=" text-green-500">l</span>
          <span className=" text-yellow-500">l</span>
          <span className=" text-purple-500">p</span>
          <span className=" text-pink-500">y</span>
          <span className=" text-orange-500">.</span>         
        </h2>

        <input
          type="search"
          placeholder="Type here"
          className=" input input-bordered w-full max-w-[40rem] h-14 max-xl:max-w-[20rem]"
        />
      </div>

      <UserButton afterSignOutUrl="/" />
    </header>
  );
};

export default Header;
