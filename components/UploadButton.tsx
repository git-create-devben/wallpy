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


  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a cover pics of your project</DialogTitle>
            <DialogDescription>
              <main className="flex  flex-col items-center justify-between p-24">
             <input type="file" />
              </main>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Uploadbutton;
