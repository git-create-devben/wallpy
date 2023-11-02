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
import { storage } from "../app/firebase"
import { ref } from "firebase/storage"

import React from "react";

export const Uploadbutton = () => {
  const [imageUpload, setImageUpload] = useState()
const uploadImage =() => {
if (imageUpload == null) return;
const imageRef = ref(storage, `images/${}`)
}

  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a cover pics of your project</DialogTitle>
            <DialogDescription>
              <main className="flex  flex-col items-center justify-between p-24">
             <input type="file"  onChange={(e) => {setImageUpload(e.target.files?[0] : null)}}/>
             <button onClick={uploadImage}>Upload</button>
              </main>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Uploadbutton;
