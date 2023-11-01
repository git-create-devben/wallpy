"use client"

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from "@/components/ui/button";

function UploadButton() {
  const uploadPreset = 'my-upload-preset';

  async function handleOnClick() {
    // Get the public ID of the uploaded file
    const publicId = await CldUploadWidget({ uploadPreset }).open();

    // Do something with the public ID
  }

  return (
    <Button onClick={handleOnClick}>Upload</Button>
  );
}

export default UploadButton;
