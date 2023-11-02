// CommonParentComponent.js
import React, { useState } from "react";
import { Uploadbutton } from "@/components/UploadButton";
import  Project  from "@/components/project/project";

const CommonParentComponent = () => {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  const handleImageUpload = (res: { fileUrl: string; fileKey: string }[]) => {
    if (res && res.length > 0) {
      setImages(res);
    }
  };

  return (
    <div>
      <Uploadbutton onImageUpload={handleImageUpload} />
      <Project imageURL={images.length > 0 ? images[0].fileUrl : ""} />
    </div>
  );
};

export default CommonParentComponent;
