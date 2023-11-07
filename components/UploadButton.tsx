"use client"

import React, { useEffect, useState } from 'react'
import { storage, db } from '@/app/firebase'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import Image from 'next/image'


type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
}[];

const UploadButton = (props: DeveloperData) => {
const [info, setInfo] = useState("")
const [thumbnail, setThumbnail] = useState("")
// const [developerData, setDeveloperData] = useState<DeveloperData>([]);

const uploadImage = (e: any) => {
  console.log(e.target.files[0]);
  const thumbnails = ref(storage, `thumbnail/s${v4()}`);
  uploadBytes(thumbnails, e.target.files[0]).then((data) => {
    console.log(data, "thumbnails");
    getDownloadURL(data.ref).then((val) => {
      console.log("Thumbnail URL:", val); // Add this line to check the value of the thumbnail URL
      setThumbnail(val);
    });
  });
};


const upload = async () => {
const projects = collection(db, "developersInfo")
await addDoc(projects, {textVal: info, thumnailsUrl:thumbnail })
 alert("data added successfully")
}

// const getData = async () => {
//   const project = collection(db, "developersInfo");
//   const datadb = await getDocs(project);
//   const allInfo = datadb.docs.map((val) => ({
//     id: val.id,
//     textVal: val.data().textVal,
//     thumnailsUrl: val.data().thumnailsUrl,
//   }));
//   setDeveloperData(allInfo);
// };


// useEffect(() => {
//   getData()
// },[])

// console.log(developerData, "datadata")
  return (
    <div>
      {/* <input onChange={(e) => setInfo(e.target.value)}/> <br/> */}
      {/* <input type="file" onChange={(e) => uploadImage(e) }/> */}
      {/* <button onClick={upload}>Upload</button> */}

      {/* {
        developerData.map(value => 
          
          <div key={value.id}>
            <h1>{value.textVal}</h1>
            <Image src={value.thumnailsUrl} height={200} width={200} alt={value.textVal}/>
          </div>
          
          )
      } */}

<Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Portfolio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
              type="file" 
              onChange={(e) => uploadImage(e) }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={upload}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default UploadButton