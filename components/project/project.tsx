"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import "./project.css";
import { PackagePlusIcon } from "lucide-react";

type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
  github: string;
  portfolio: string;
  descriptionTest: string;
}[];

const Project = (props: DeveloperData) => {
  const [developerData, setDeveloperData] = useState<DeveloperData>([]);

  const getData = async () => {
    const project = collection(db, "developersInfo");
    const datadb = await getDocs(project);
    console.log(datadb); // Add this line to check the data received from the database
    const allInfo = datadb.docs.map((val) => ({
      id: val.id,
      textVal: val.data().textVal,
      thumnailsUrl: val.data().thumnailsUrl,
      github: val.data().github,
      portfolio: val.data().portfolio,
      descriptionTest: val.data().descriptionTest,
    }));
    setDeveloperData(allInfo);
  };

  useEffect(() => {
    getData();
  }, []);

  if (developerData.length === 0) {
    return (
      <div className="loadeder">
      <div className="loader-cube">
        <div className="face"></div>
        <div className="face"></div>
        <div className="face"></div>
        <div className="face"></div>
        <div className="face"></div>
        <div className="face"></div>
      </div>
    </div>
  
    ); // or any other desired loading indicator
  }

  return (
    <div className="parent-div flex gap-10 p-20 flex-wrap">
      {developerData.map((value) => (
        // <div key={value.id} className="">
        //   <Image
        //     src={value.thumnailsUrl}
        //     height={400}
        //     width={400}
        //     alt={value.textVal}
        //   />
        //   <div
        //     key={value.id}
        //     className="child-div flex justify-around items-center p-4"
        //   >
        //     <h1>{value.textVal}</h1>
        //     <Link href={value.github} target="_blank">
        //       <FaGithub className="w-10 h-10" />
        //     </Link>
        //     <Link href={value.portfolio} target="_blank">
        //       <FaExternalLinkAlt className="w-10 h-10" />
        //     </Link>
        //   </div>
        // </div>
        // <div
        //   key={value.id}
        //   className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
        // >
        //   <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        //     <Image
        //       src={value.thumnailsUrl}
        //       alt="Tailwind card"
        //       layout="fill"
        //       objectFit="cover"
        //     />
        //   </div>
        //   <div className="p-6">
        //     <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
        //       {value.textVal}
        //     </h5>
        //     <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
        //      Built with: {value.descriptionTest}
        //     </p>
        //   </div>
        //   <div className="p-6 pt-0">
        //     <button
        //       data-ripple-light="true"
        //       type="button"
        //       className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        //     >
        //       Read More
        //     </button>
        //   </div>
        // </div>

        <div className="card"  key={value.id}>
          <button className="mail"></button>
          <div className="thumbnail">
          <Image
              src={value.thumnailsUrl}
              alt="Tailwind card"
              layout="fill"
              objectFit="cover"
              className="img"
            />
          </div>
        <div className="bottom">
        <div className="content">
          <h1 className="name">Dev Ben</h1>
          <p className="about-me"> Ben Lad is a good guy eyeyeye</p>
        </div>
        <div className="bottom-bottom flex items-center">
        <div className="social-links-container">
          <FaGithub className="h-8 w-8"/>
          <FaExternalLinkAlt/>
        </div>
        <button className="btn "> <FaExternalLinkAlt/> view</button>
        </div>
        </div>
       </div>
      ))}
    </div>
  );
};

export default Project;
