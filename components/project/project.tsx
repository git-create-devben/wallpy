"use client"

import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Developer } from '../UploadButton';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

const Project: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      const firestore = getFirestore();
      const developersCollectionRef = collection(firestore, 'developers');
      const querySnapshot = await getDocs(developersCollectionRef);
      const fetchedDevelopers: Developer[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Developer;
        fetchedDevelopers.push(data);
      });
      setDevelopers(fetchedDevelopers);
    };
    fetchDevelopers();
  }, []);

  useEffect(() => {
    const fetchThumbnailUrls = async () => {
      const storage = getStorage();
      const urls = await Promise.all(
        developers.map(async (dev) => {
          if (dev.thumbnail) {
            const storageRef = ref(storage, dev.thumbnail); // Assuming dev.thumbnail is the path to the image in Firebase Storage
            const url = await getDownloadURL(storageRef);
            return url;
          }
          return ''; // Return a default value if dev.thumbnail doesn't exist
        })
      );
      setThumbnailUrls(urls);
    };
    fetchThumbnailUrls();
  }, [developers]);

  return (
    <div>
      {developers.map((dev, index) => (
        <div key={index}>
          <h2>Developer Information</h2>
          {dev.thumbnail && thumbnailUrls[index] && (
            <div>
              <h2>image</h2>
              <Image
                src={thumbnailUrls[index]}
                alt={dev.name}
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
          )}
          <p>Name: {dev.name}</p>
          <p>Github: {dev.github}</p>
          <p>Twitter: {dev.twitter}</p>
          <p>Portfolio URL: {dev.portfolioUrl}</p>
        </div>
      ))}
    </div>
  );
};

export default Project;
