"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase';
import Image from 'next/image';

type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
}[];

const Project = (props: DeveloperData) => {
  const [developerData, setDeveloperData] = useState<DeveloperData>([]);


  const getData = async () => {
    const project = collection(db, "developersInfo");
    const datadb = await getDocs(project);
    const allInfo = datadb.docs.map((val) => ({
      id: val.id,
      textVal: val.data().textVal,
      thumnailsUrl: val.data().thumnailsUrl,
    }));
    setDeveloperData(allInfo);
  };
  
  
  useEffect(() => {
    getData()
  })

  return (
    <div>
      {developerData.map((value) => (
        <div key={value.id}>
          <h1>{value.textVal}</h1>
          <Image src={value.thumnailsUrl} height={200} width={200} alt={value.textVal} />
        </div>
      ))}
    </div>
  );
};

export default Project;
