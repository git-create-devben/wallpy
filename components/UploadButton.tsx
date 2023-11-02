"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { storage } from "../app/firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  ListResult,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import React from "react";

export const Uploadbutton = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const imagelistRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagelistRef)
      .then((response: ListResult) => {
        console.log(response);
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url) {
              setImageList((prev) => [...prev, url]);
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error retrieving image list: ", error);
      });
  },);

  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a cover pic of your project</DialogTitle>
            <DialogDescription>
              <main className="flex flex-col items-center justify-between p-24">
                <input
                  type="file"
                  onChange={(e) => setImageUpload(e.target.files?.[0] || null)}
                />
                <button onClick={uploadImage}>Upload</button>
                {imageList.map((url, index) => (
                  <div key={index}>
                    <Image
                      src={url}
                      alt={`image-${index}`}
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
              </main>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Uploadbutton;
