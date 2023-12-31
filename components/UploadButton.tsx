"use client";

import React, { useEffect, useState } from "react";
import { storage, db } from "@/app/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ZodType, z, } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

type FormData = {
  userName: string;
  // thumbnail: File;
  github: string;
  portfolio: string;
  description: string;
  thread: string | null;
  twitter: string | null;
};

const UploadButton = () => {
  const [info, setInfo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, SetPortfolioUrl] = useState("");
  const [description, setDescription] = useState("");
  const [thread, setThread] = useState("");
  const [twitter, setTwitter] = useState("");
  const [showForm, setShowForm] = useState(true);

  const FormSchema = z.object({
    userName: z.string().min(2),
    // thumbnail:z.instanceof(File),
    github: z.string().url(),
    portfolio: z.string().url(),
    description: z.string(),
    thread: z.string().nullable(),
    twitter: z.string().nullable(),
    // info: z.string(),
  });

  const schema: ZodType<FormData> = FormSchema;

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission here
    console.log("work", data);
    upload();
    alert('Portfolio submitted succesfully! please close the modal');
    setShowForm(false);
  };

  // const uploadImage = (e: any) => {
  //   console.log(e.target.files[0]);
  //   const thumbnails = ref(storage, `thumbnail/s${v4()}`);
  //   uploadBytes(thumbnails, e.target.files[0]).then((data) => {
  //     console.log(data, "thumbnails");
  //     getDownloadURL(data.ref).then((val) => {
  //       console.log("Thumbnail URL:", val); // Add this line to check the value of the thumbnail URL
  //       setThumbnail(val);
  //     });
  //   });
  // };

  const uploadImage = (e: any) => {
    const file = e.target.files[0];

  // Check if a file is selected
  if (!file) {
    alert("Please select an image file.");
    e.target.value = ""; // Clear the input
    return;
  }

  // Check if the file type is an image
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    e.target.value = ""; // Clear the input
    return;
  }

  // Create an image element to get the dimensions
  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    // Check if the image meets your size criteria (1024x1024 in this example)
    if (img.width >= 917 && img.height >= 917) {
      const thumbnails = ref(storage, `thumbnail/s${v4()}`);
      uploadBytes(thumbnails, file).then((data) => {
        console.log(data, "thumbnails");
        getDownloadURL(data.ref).then((val) => {
          console.log("Thumbnail URL:", val);
          setThumbnail(val);
        });
      });
    } else {
      alert("Please select an image with dimensions at least 1024x1024.");
      e.target.value = ""; // Clear the input
    }
  };

  img.onerror = () => {
    alert("Error loading the image. Please try again.");
    e.target.value = ""; // Clear the input
  };
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Portfolio</Button>
      </DialogTrigger>
      <div style={{ display: showForm ? 'block' : 'none' }}>
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
                {...register("userName")}
                onChange={(e) => setInfo(e.target.value)}
              />
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
                // {...register("thumbnail")}
                onChange={(e) => uploadImage(e)}
              />
              <Label htmlFor="Github" className="text-right">
                Github
              </Label>
              <Input
                id="Github"
                placeholder="Paste your Github link"
                className="col-span-3"
                type="url"
                {...register("github")}
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
                {...register("twitter")}
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
                {...register("thread")}
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
                {...register("portfolio")}
                onChange={(e) => SetPortfolioUrl(e.target.value)}
              />
              <Label htmlFor="username" className="text-right">
                Build with:
              </Label>
              <Input
                // name="desc"
                id="desc"
                className="col-span-3"
                type="text"
                {...register("description")}
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
      </div>
    </Dialog>
  );
};

export default UploadButton;
