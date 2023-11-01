"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

function UploadButton() {
  const uploadPreset = "my-upload-preset";

  async function handleOnClick() {
    // Get the public ID of the uploaded file
    const publicId = await CldUploadWidget({ uploadPreset }).open();

    // Do something with the public ID
  }

  return (
    <>
      <div className="dropdown dropdown-left dropdown-end">
        <label tabIndex={0} className="btn m-1">
          Click
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
      <Button onClick={handleOnClick}>Upload</Button>
    </>
  );
}

export default UploadButton;
