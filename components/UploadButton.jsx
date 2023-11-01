"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from 'next-cloudinary';
import { CldUploadButton } from 'next-cloudinary';

function UploadButton() {
  const openUploadWidget = () => {
    // Open the Cloudinary upload widget
  };

  

  return (
    <CldUploadButton uploadPreset="<Upload Preset>" />
  );
}

export default UploadButton;