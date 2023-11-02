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

interface UploadbuttonProps {
  setImageListProp: (newImageList: string[]) => void;
}

const Uploadbutton = ({ setImageListProp }: UploadbuttonProps) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const imagelistRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        localStorage.setItem("imageList", JSON.stringify([...imageList, url]));
        setImageList((prevList) => [...prevList, url]);
        setImageListProp([...imageList, url]); // Update the image list in the parent component
      });
    });
  };
  useEffect(() => {
    listAll(imagelistRef)
      .then((response: ListResult) => {
        let urls: string[] = [];
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url) {
              urls.push(url);
            }
          });
        });
        setImageList(urls);
      })
      .catch((error) => {
        console.error("Error retrieving image list: ", error);
      });
  }, []);

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
