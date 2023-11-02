import React from "react";
import "./project.css";

interface ProjectProps {
  imageList: string[];
}

const Project = ({ imageList }: ProjectProps) => {
  return (
    <main className="flex gap-4 flex-wrap">
      <div key={index} className="parent-div w-[450px] h-[400px] bg-green-600 relative">
         {/* If i over on this parent div the children div we show  */}
          <Image src={url} alt="upload image" />

        <div className=" child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 ">
         {/* I want the content in this div shows */}
        </div>
      </div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>    
      
    </main>
  );
};

export default project;
