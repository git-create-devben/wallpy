"use client"

import { CldUploadWidget } from 'next-cloudinary';

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
    <button onClick={handleOnClick}>Upload</button>
  );
}

export default UploadButton;
