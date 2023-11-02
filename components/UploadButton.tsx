"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UploadButton, UploadDropzone } from "../utils/uploadthing";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UploadedImage } from "@/components/setup"
import React from "react";



interface UploadButtonProps {
  onImageUpload: (images: UploadedImage[]) => void;
}

const Uploadbutton = ({ onImageUpload }: UploadButtonProps) => {
  const [images, setImage] = useState<UploadedImage[]>([]);

  const head = images.length ? (
    <>
      <p>`Upload sucessful 🥳</p>
      <p className="m-2">{images.length} file</p>
    </>
  ) : null;

  const imglist = (
    <>
      {/* <p>{head}</p> */}
      <ul>
        {images.map((imager) => (
          <li key={imager.fileUrl} className="m-2">
            <Link href={imager.fileUrl}>
            <Image src={imager.fileUrl} height={200} width={200} alt="upload"/>
            </Link>          
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a cover pics of your project</DialogTitle>
            <DialogDescription>
              <main className="flex  flex-col items-center justify-between p-24">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    const handleUploadComplete = (res: ImageData[]) => {
                      if (res) {
                        onImageUpload(res);
                        const json = JSON.stringify(res);
                        console.log(json); // Do something with the response
                      }
                    };
                  
                    // alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                {imglist}
              </main>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Uploadbutton;
