"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from 'next-cloudinary';

const UploadButton = () => {
    <div>
      <CldUploadWidget uploadPreset="<Upload Preset>">
      {({ open }) => {
        function handleOnClick(e) {
          e.preventDefault();
          open();
        };
        return (
          <Button className="button" onClick={handleOnClick}>
            Upload an Image
          </Button>
      );
    }}
    </CldUploadWidget>
    </div>
};

export default UploadButton;
