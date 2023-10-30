import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Project from "./project";

const Hero = () => {
  return (
    <section>
      <div
        className="hero h-[30rem]"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h2 className=" text-8xl font-bold mb-2">
              <span className=" text-blue-500">W</span>
              <span className=" text-red-500">a</span>
              <span className=" text-green-500">l</span>
              <span className=" text-yellow-500">l</span>
              <span className=" text-purple-500">p</span>
              <span className=" text-pink-500">y</span>
              <span className=" text-orange-500">.</span>
            </h2>
            <p className="mb-5">
              A collections of developer portifolio
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-[50rem] "
              />
              <MagnifyingGlassIcon
                className=" absolute bottom-0 right-2 top-4 text-sm"
                fontSize={40}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Project/>
      </div>
    </section>
  );
};

export default Hero;
