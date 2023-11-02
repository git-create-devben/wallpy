"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UploadButton } from "../utils/uploadthing";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import React from "react";

export const Uploadbutton = () => {
  const [images, setImage] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  const head = images.length ? (
    <>
      <p>`Upload sucessful 🥳</p>
      <p className="m-2">{images.length} file</p>
    </>
  ) : null;

  const imglist = (
    <>
      <p>{head}</p>
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
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      setImage(res)
                      const json = JSON.stringify(res)
                      // Do something with the response
                      console.log(json);
                    }

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
