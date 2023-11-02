import React from "react";
import "./project.css";

interface ProjectProps {
  imageList: string[];
}

const Project: React.FC<ProjectProps> = ({ imageList }) => {
  return (
    <main className="flex gap-4 flex-wrap">
      <div className="parent-div w-[450px] h-[400px] bg-green-600 relative">
         {/* If i over on this parent div the children div we show  */}
         {imageList.map((url, index) => (
        <div key={index}>
          <Image src={url} alt={`image-${index}`} style={{ width: '200px', height: '200px' }} />
        </div>
      ))}

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

export default Project;
