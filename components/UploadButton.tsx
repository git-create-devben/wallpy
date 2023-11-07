"use client"

import React, { useState } from 'react'
import { storage, db } from '@/app/firebase'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection } from 'firebase/firestore'


type Developer = {}

const UploadButton = (props: Developer) => {
const [info, setInfo] = useState("")
const [thumbnail, setThumbnail] = useState("")

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
}
  return (
    <div>
      <input onChange={(e) => setInfo(e.target.value)}/>
      <input type="file" onChange={(e) => uploadImage(e) }/>
      <button onClick={upload}>Upload</button>
    </div>
  )
}

export default UploadButton