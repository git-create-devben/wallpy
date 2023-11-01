"use client"

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from "@/components/ui/button"

function UploadButton() {
  const uploadPreset = 'my-upload-preset';

  const handleOnClick = async () => {
    // Open the upload widget
    const uploadWidget = new CldUploadWidget({
      uploadPreset,
    });

    await uploadWidget.open();

    // Get the public ID of the uploaded file
    const publicId = uploadWidget.result.publicId;

    // Do something with the public ID
  };

  return (
    <Button onClick={handleOnClick}>Upload</Button>
  );
}

export default UploadButton;
