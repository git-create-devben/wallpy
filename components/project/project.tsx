import React from "react";
import "./project.css";

const project = () => {
  return (
    <main className="flex gap-4 flex-wrap">
      <div className=" w-[450px] h-[400px] bg-green-600 relative">
        <div className="absolute -bottom-0 top-0 left-0 right-0 w-[50px] h-[50px] bg-red">
         
        </div>
      </div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>
      <div className=" w-[450px] h-[400px] bg-green-600"></div>    
      
    </main>
  );
};

export default project;
