"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import "./project.css";
import { PackagePlusIcon } from "lucide-react";

type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
  github?: string;
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
        <div className="card" key={value.id}>
          <button className="mail"></button>
          <div className="thumbnail">
            <Image
              src={value.thumnailsUrl}
              alt={`thumbnail of ${value.textVal}`}
              layout="fill"
              objectFit="cover"
              className="img"
            />
          </div>
          <div className="bottom">
            <div className="content">
              <h1 className="name">{value.textVal}</h1>
              <p className="about-me text-white "> Build with: {value.descriptionTest}</p>
            </div>
            <div className="bottom-bottom flex items-center">
              <div className="social-links-container">
              {value.github ? (
                <Link href={value.github}>
                  <FaGithub className="h-8 w-8 fa" />
                </Link>
                ) : null}
                <Link href="">
                  <FaXTwitter className="h-8 w-8 fa" />
                </Link>
                <Link href="">
                  <FaThreads className="h-8 w-8 fa" />
                </Link>
              </div>
              <button className="btn  text-white">
                <FaExternalLinkAlt /> view
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
