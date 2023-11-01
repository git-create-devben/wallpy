"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from 'next-cloudinary';

function UploadButton() {
  const openUploadWidget = () => {
    // Open the Cloudinary upload widget
  };

  const UploadButtonContent = () => {
    return (
      <CldUploadWidget uploadPreset="<Upload Preset>" onOpen={openUploadWidget}>
        <Button className="button" onClick={openUploadWidget}>
          Upload an Image
        </Button>
      </CldUploadWidget>
    );
  };

  return (
    <UploadButtonContent />
  );
}

export default UploadButton;