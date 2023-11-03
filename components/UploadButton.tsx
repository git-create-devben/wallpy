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

// ... other imports

interface UploadButtonProps {
  setImageListProp: (newImageList: string[]) => void;
  setLinkProp: (newLink: { github: string; portfolio: string; social: string }) => void;
}

const UploadButton = ({ setImageListProp, setLinkProp }: UploadButtonProps) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [githubLink, setGithubLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [socialLink, setSocialLink] = useState("");

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const updatedImageList = [...imageList, url];
        localStorage.setItem("imageList", JSON.stringify(updatedImageList));
        setImageList(updatedImageList);
        setImageListProp(updatedImageList);
      });
    });
  };

  const handleLinkInput = (type: string, value: string) => {
    switch (type) {
      case "github":
        setGithubLink(value);
        break;
      case "portfolio":
        setPortfolioLink(value);
        break;
      case "social":
        setSocialLink(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadImage();
    handleLinkInput("github", githubLink);
    handleLinkInput("portfolio", portfolioLink);
    handleLinkInput("social", socialLink);
    setLinkProp({
      github: githubLink,
      portfolio: portfolioLink,
      social: socialLink,
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a cover pic of your project</DialogTitle>
            <DialogDescription>
              <main className="flex flex-col items-center justify-between p-24">
                <form onSubmit={handleSubmit}>
                                  <input
                  type="file"
                  onChange={(e) => setImageUpload(e.target.files?.[0] || null)}
                />
                <input
                  type="text"
                  placeholder="GitHub Link"
                  onChange={(e) => handleLinkInput("github", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Portfolio Link"
                  onChange={(e) => handleLinkInput("portfolio", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Social Media Link"
                  onChange={(e) => handleLinkInput("social", e.target.value)}
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
                 <button type="submit">Submit</button>
                </form>
              </main>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadButton;
