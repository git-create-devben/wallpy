"use client"

import React from "react";
import "./project.css";
import Image from "next/image";
import { useState } from "react";
// import { UploadButton } from "../utils/uploadthing";

export const Project = () => {
  const [images, setImage] = useState<
  {
    fileUrl: string;
    fileKey: string;
  }[]
>([]);
  return (
    <main className="flex gap-4 flex-wrap">
      <div className="parent-div w-[450px] h-[400px] bg-green-600 relative rounded-xl">
      <ul className="w-[450px] h-[400px] rounded-xl">
        {images.map((imager) => (
          <li key={imager.fileUrl} className="m-2">
            <Image src={imager.fileUrl} height={400} width={450} alt="upload"/>
          </li>
        ))}
      </ul>
        {/* <Image src={fileUrl} height="400" width="450" alt="Portfolio background image" className="rounded-xl"/> */}
        <div className=" child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 animate-after:w-[70%]">
         {/* I want the content in this div shows */}
        </div>
      </div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>    
       <ul>
        {images.map((imager) => (
          <li key={imager.fileUrl} className="m-2">
            <Image src={imager.fileUrl} height={200} width={200} alt="upload"/>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Project;
