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
  descriptionTest: string;
}[];

const UploadButton = (props: DeveloperData) => {
  const [info, setInfo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, SetPortfolioUrl] = useState("");
  const [description, setDescription] = useState("");

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
      descriptionTest: description,
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
          <DialogTitle>Add portfolio</DialogTitle>
          <DialogDescription className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              Warning: After upload you wont be able to edit so becarefull when
              filling the forms!
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              UserName
            </Label>
            <Input
              id="name"
              placeholder="Dev Ben"
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
              className="col-span-3"
              placeholder="Upload your file"
              type="file"
              onChange={(e) => uploadImage(e)}
            />
            <Label htmlFor="username" className="text-right">
              Githun Url
            </Label>
            <Input
              id="Github"
              placeholder="Paste your Github url"
              className="col-span-3"
              type="url"
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <Label htmlFor="username" className="text-right">
              Portfolio Url
            </Label>
            <Input
              id="Portfolio"
              placeholder="Paste your portfolio url"
              className="col-span-3"
              type="url"
              onChange={(e) => SetPortfolioUrl(e.target.value)}
            />
            <Label htmlFor="username" className="text-right">
              Descriptions
            </Label>
            <textarea
              name="desc"
              id="desc"
              cols={30}
              rows={30}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="This project is build using , html, css, etc."
            ></textarea>
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
