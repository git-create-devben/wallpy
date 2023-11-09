"use client";

import React, { useEffect, useState } from "react";
import { storage, db } from "@/app/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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
  thread: string;
  twitter: string;
}[];

const UploadButton = (props: DeveloperData) => {
  const [info, setInfo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, SetPortfolioUrl] = useState("");
  const [description, setDescription] = useState("");
  const [thread, setThread] = useState("");
  const [twitter, setTwitter] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission here

    console.log(data);
    upload();
  };

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
      thread: thread,
      twitter: twitter,
    });
    return (
      <div>
        <div className="alert alert-success absolute top-4">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
      </div>
    );
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
            <span className="text-white">
              Warning: After You upload your portfolio, you wont be able to edit
              or delete so becarefull when filling the form.
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                UserName
              </Label>
              <Input
                id="name"
                placeholder="Dev Ben"
                className="col-span-3"
                {...register("userName", { required: true, minLength: 3 })}
              />
              {errors.userName && (
              <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm">Error! Task failed successfully.</span>
            </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="upload" className="text-right">
                thumbnail
              </Label>
              <Input
                id="Upload"
                className="col-span-3"
                placeholder="Upload your file"
                type="file"
                {...register("thumbnail", { required: true })}
                onChange={(e) => uploadImage(e)}
              />
              {errors.thumbnail && (
                <span>This field is required. Please upload a thumbnail.</span>
              )}
              <Label htmlFor="Github" className="text-right">
                Github
              </Label>
              <Input
                id="Github"
                placeholder="Paste your Github link"
                className="col-span-3"
                type="url"
                onChange={(e) => setGithubUrl(e.target.value)}
              />
              <Label htmlFor="X" className="text-right">
                X(Twitter)
              </Label>
              <Input
                id="X"
                placeholder="Paste your  X link"
                className="col-span-3"
                type="url"
                onChange={(e) => setTwitter(e.target.value)}
              />
              <Label htmlFor="Thread" className="text-right">
                Thread
              </Label>
              <Input
                id="Thread"
                placeholder="Paste your thread link"
                className="col-span-3"
                type="url"
                onChange={(e) => setThread(e.target.value)}
              />
              <Label htmlFor="portfolio" className="text-right">
                Portfolio
              </Label>
              <Input
                id="Portfolio"
                placeholder="Paste your portfolio link"
                className="col-span-3"
                type="url"
                onChange={(e) => SetPortfolioUrl(e.target.value)}
              />
              <Label htmlFor="username" className="text-right">
                Build with:
              </Label>
              <Input
                name="desc"
                id="desc"
                className="col-span-4"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder=" html, css, etc."
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
