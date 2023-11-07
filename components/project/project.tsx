"use client"

import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Developer } from '../UploadButton';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

const Project: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    const fetchDevelopers = () => {
      const firestore = getFirestore();
      const developersCollectionRef = collection(firestore, 'developers');
      getDocs(developersCollectionRef)
        .then((querySnapshot) => {
          const fetchedDevelopers: Developer[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Developer;
            fetchedDevelopers.push(data);
          });
          setDevelopers(fetchedDevelopers);
        })
        .catch((error) => {
          console.error('Error fetching developers: ', error);
        });
    };
    fetchDevelopers();
  }, []);

  const getDeveloperThumbnail = (path: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    return getDownloadURL(storageRef);
  };

  return (
    <div>
      {developers.map((dev, index) => {
        if (dev.thumbnail) {
          getDeveloperThumbnail(dev.thumbnail.name)
            .then((thumbnailUrl) => {
              return (
                <div key={index}>
                  <h2>Developer Information</h2>
                  <p>Name: {dev.name}</p>
                  <p>Github: {dev.github}</p>
                  <p>Twitter: {dev.twitter}</p>
                  <p>Portfolio URL: {dev.portfolioUrl}</p>
                  {thumbnailUrl && (
                    <Image src={thumbnailUrl} alt="Developer Thumbnail" />
                  )}
                </div>
              );
            })
            .catch((error) => {
              console.error('Error fetching thumbnail URL: ', error);
            });
        }
        return null;
      })}
    </div>
  );
};

export default Project;
