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
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { storage } from "../app/firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import {v4} from "uuid"

import React from "react";

export const Uploadbutton = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const [imagelist, setImageList] = useState()
  const imagelistRef = ref(storage, "images/")
const uploadImage =() => {
if (imageUpload == null) return;
const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
uploadBytes(imageRef,imageUpload).then(() => {
  alert("image uploaded")
})
}

useEffect(() => {
listAll(imagelistRef).then((response) => {
  console.log(response)
  response.items.forEach((item) => {
    getDownloadURL(item).then((url) => {
      setImageList((prev) => [...prev, url]);
    })
  })
})
}, [])

  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a cover pics of your project</DialogTitle>
            <DialogDescription>
              <main className="flex  flex-col items-center justify-between p-24">
             <input type="file"  onChange={(e) => {setImageUpload(e.target.files[0])}}/>
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
