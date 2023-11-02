import React from "react";
import "./project.css";
import Image from "next/image";

interface ProjectProps {
  imageList: string[];
}

const Project: React.FC<ProjectProps> = ({ imageList }) => {
  return (
    <main className="flex gap-4 flex-wrap">
      {/* If i over on this parent div the children div we show  */}
      {imageList.map((url, index) => (
        <div
          key={index}
          className="parent-div w-[450px] h-[400px] bg-green-600 relative"
        >
          <Image src={url} alt={`image-${index}`} width={450} height={200} />
          <div className=" child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 ">
          </div>
        </div>
      ))}
    </main>
  );
};

export default Project;
