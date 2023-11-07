"use client"

import React, { useEffect, useState } from 'react'
import { storage, db } from '@/app/firebase'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { Divide } from 'lucide-react'
import Image from 'next/image'


type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
}[];

const UploadButton = (props: DeveloperData) => {
const [info, setInfo] = useState("")
const [thumbnail, setThumbnail] = useState("")
const [developerData, setDeveloperData] = useState<DeveloperData>([]);

const uploadImage = (e: any) => {
  console.log(e.target.files[0])
  const thumbnails = ref(storage, `thumbnail/s${v4()}`)
  uploadBytes(thumbnails, e.target.files[0]).then(data => {
    console.log(data, "thumbnails")
    getDownloadURL(data.ref).then(val => {
      setThumbnail(val)
    })
  })
}

const upload = async () => {
const projects = collection(db, "developersInfo")
await addDoc(projects, {textVal: info, thumnailsUrl:thumbnail })
 alert("data added successfully")
}

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
},[])

console.log(developerData, "datadata")
  return (
    <div>
      <input onChange={(e) => setInfo(e.target.value)}/> <br/>
      <input type="file" onChange={(e) => uploadImage(e) }/>
      <button onClick={upload}>Upload</button>

      {
        developerData.map(value => 
          
          <div key={value.id}>
            <h1>{value.textVal}</h1>
            <Image src={value.thumnailsUrl} height={200} width={200} alt={value.textVal}/>
          </div>
          
          )
      }
    </div>
  )
}

export default UploadButton