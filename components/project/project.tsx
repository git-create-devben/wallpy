"use client"

import React from "react";
import "./project.css";
import Image from "next/image";
import { useState } from "react";
// import { UploadButton } from "../utils/uploadthing";
// import Uploadbutton from "../UploadButton"

export const Uploadbutton = () => {
  const [images, setImage] = useState<
    { fileUrl: string; fileKey: string }[]
  >([]);

  const imageURL = images.length ? images[0].fileUrl : "";

  // Pass the image URL to the project component
  return <Project imageURL={imageURL} />;
};


export const Project = () => {

  return (
    <main className="flex gap-4 flex-wrap">
      <div className="parent-div w-[450px] h-[400px] bg-green-600 relative rounded-xl">
        <Image src={imageURL} height="400" width="450" alt="Portfolio background image" className="rounded-xl"/>
        <div className=" child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 animate-after:w-[70%]">
         {/* I want the content in this div shows */}
        </div>
      </div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>    
      
    </main>
  );
};

export default Project;
