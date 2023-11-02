// Project.js
import React from "react";
import Image from "next/image";

const Project = ({ imageURL }) => {
  return (
    <main className="flex gap-4 flex-wrap">
      <div className="parent-div w-[450px] h-[400px] bg-green-600 relative rounded-xl">
        {imageURL ? (
          <Image
            src={imageURL}
            height="400"
            width="450"
            alt="Portfolio background image"
            className="rounded-xl"
          />
        ) : (
          <p>No image uploaded yet</p>
        )}
        <div className="child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 animate-after:w-[70%]">
          {/* Add content here */}
        </div>
      </div>
      <div className="w-[450px] h-[400px] bg-green-600"></div>
      <div className="w-[450px] h-[400px] bg-green-600"></div>
      <div className="w-[450px] h-[400px] bg-green-600"></div>
    </main>
  );
};

export default Project;
