"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import "./project.css";

type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
  github?: string;
  portfolio: string;
  descriptionTest: string;
  twitter?: string;
  thread?: string;
}[];

const Project = (props:{ searchTerm: string }) => {
  const [developerData, setDeveloperData] = useState<DeveloperData>([]);
  const [loading, setLoading] = useState(true);

  const { searchTerm} = props;

  useEffect(() => {
    getData(searchTerm); // Pass the search term to getData
  }, [searchTerm]);


  const getData = async (searchTerm: string) => {
    try {
      const project = collection(db, "developersInfo");
      const datadb = await getDocs(project);
      const allInfo = datadb.docs.map((val) => ({
        id: val.id,
        textVal: val.data().textVal,
        thumnailsUrl: val.data().thumnailsUrl,
        github: val.data().github,
        portfolio: val.data().portfolio,
        descriptionTest: val.data().descriptionTest,
        twitter: val.data().twitter,
        thread: val.data().thread,
      }));
  
      // Filter data based on the search input
      const filteredData = allInfo.filter((item) =>
      item.descriptionTest.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
      setDeveloperData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  

  // useEffect(() => {
  //   getData();
  // }, []);

  if (loading) {
    return (
      <>
        <div className="overlay" id="overlay"></div>
        <div className="loaded">
          <div className="loader-cube">
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
          </div>
          <p className="text-white text-sm mt-8">loading....</p>
        </div>
      </>
    );
  }

  return (
    <div className="p-8 flex flex-wrap gap-6">
    {developerData.length === 0 ? (
      <p className="text-base-500 text-lg mt-4  top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
        No portfolios found. Help us expand this project by uploading your portfolio.
      </p>
    ) : (
      developerData.map((value) => (
        <div
          className="card card-compact w-[20rem] bg-base-100 shadow-xl p-2 sm:w-[27rem]"
          key={value.id}
        >
          <button className="mail"></button>
          <div className="thumbnail">
            <Image
              src={value.thumnailsUrl}
              alt={`thumbnail of ${value.textVal}`}
              className="img  rounded-xl"
              width={100}
              height={100}
              layout="responsive"
              // objectFit="cover"
            />
          </div>
          <div className=" card-body">
            <h1 className="card-title text-white text-bold text-1xl">{value.textVal}</h1>
            <p className="about-me text-white text-md  text-bold ">
              Build with: {value.descriptionTest}
            </p>
          </div>
          <div className="bottom-bottom flex items-center justify-between">
            <div className="social-links-container flex gap-2 items-center text-white">
              {value.github ? (
                <Link href={value.github}>
                  <FaGithub className="h-8 w-8 fa" />
                </Link>
              ) : null}
              {value.twitter ? (
                <Link href={value.twitter}>
                  <FaXTwitter className="h-8 w-8 fa" />
                </Link>
              ) : null}
              {value.thread ? (
                <Link href={value.thread}>
                  <FaThreads className="h-8 w-8 fa" />
                </Link>
              ) : null}
            </div>
            {/* <Like/> */}
            <Link href={value.portfolio}>
              <button className="btn btn-ghost text-white">
                <FaExternalLinkAlt /> view
              </button>
            </Link>
          </div>
        </div>
          ))
          )}
              
    </div>
  );
};

export default Project;
