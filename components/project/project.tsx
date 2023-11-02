import React from "react";
import "./project.css";

const project = () => {
  return (
    <main className="flex gap-4 flex-wrap">
      <div className=" w-[450px] h-[400px] bg-green-600 relative">
        <div className="absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-600">
         
        </div>
      </div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>    
      
    </main>
  );
};

export default project;
