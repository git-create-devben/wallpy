"use client";

import React, { useEffect, useState } from "react";
import { storage, db } from "@/app/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
  github: string;
  portfolio: string;
}[];

const UploadButton = (props: DeveloperData) => {
  const [info, setInfo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, SetPortfolioUrl] = useState("");

  const uploadImage = (e: any) => {
    console.log(e.target.files[0]);
    const thumbnails = ref(storage, `thumbnail/s${v4()}`);
    uploadBytes(thumbnails, e.target.files[0]).then((data) => {
      console.log(data, "thumbnails");
      getDownloadURL(data.ref).then((val) => {
        console.log("Thumbnail URL:", val); // Add this line to check the value of the thumbnail URL
        setThumbnail(val);
      });
    });
  };

  const upload = async () => {
    const projects = collection(db, "developersInfo");
    await addDoc(projects, {
      textVal: info,
      thumnailsUrl: thumbnail,
      github: githubUrl,
      portfolio: portfolioUrl,
    });
    alert("data added successfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Portfolio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New portfolio</DialogTitle>
          <DialogDescription>Add a new portfolio</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              UserName
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Add file
            </Label>
            <Input
              id="Upload"
              // defaultValue="@peduarte"
              className="col-span-3"
              type="file"
              onChange={(e) => uploadImage(e)}
            />
            <Label htmlFor="username" className="text-right">
              Githun Url
            </Label>
            <Input
              id="Github"
              // defaultValue="@peduarte"
              className="col-span-3"
              type="url"
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <Label htmlFor="username" className="text-right">
              Portfolio Url
            </Label>
            <Input
              id="Portfolio"
              // defaultValue="@peduarte"
              className="col-span-3"
              type="url"
              onChange={(e) => SetPortfolioUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={upload}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
