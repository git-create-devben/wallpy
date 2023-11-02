"use client"

import React from "react";
import "./project.css";
import Image from "next/image";
import Uploadbutton from "../UploadButton";
import { UploadedImage } from "@/components/setup"
import { useState } from "react";

interface ImageData {
  fileUrl: string;
  fileKey: string;
}

const Project = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleImageUpload = (newImages: UploadedImage[]) => {
    setImages(newImages);
  };

  return (
    <main className="flex gap-4 flex-wrap">
      {/* <div className="parent-div w-[450px] h-[400px] bg-green-600 relative rounded-xl">
        <div className=" child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 animate-after:w-[70%]">
        </div>
      </div>    */}
          {/* Other content */}
          <Uploadbutton onImageUpload={handleImageUpload} />
      {images.length > 0 &&
        images.map((image) => (
          <div key={image.fileUrl}>
            <Image src={image.fileUrl} alt="Uploaded Image" style={{ width: "100%", height: "auto" }} />
          </div>
        ))}
    </main>
  );
};

export default Project;
