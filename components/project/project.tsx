import React from "react";
import "./project.css";
import Image from "next/image";

const project = () => {


  
  return (
    <main className="flex gap-4 flex-wrap">
      <div className="parent-div w-[450px] h-[400px] bg-green-600 relative rounded-xl">
        <div className=" child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 animate-after:w-[70%]">
        </div>
      </div>      
    </main>
  );
};

export default project;
