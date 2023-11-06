import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Developer } from '../UploadButton';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

const DisplayComponent: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);

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

  const getDeveloperThumbnail = async (path: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  
  return (
    <div>
      {developers.map((dev, index) => (
        <div key={index}>
          <h2>Developer Information</h2>
          <p>Name: {dev.name}</p>
          <p>Github: {dev.github}</p>
          <p>Twitter: {dev.twitter}</p>
          <p>Portfolio URL: {dev.portfolioUrl}</p>
          {dev.thumbnail && typeof dev.thumbnail === 'string' && (
            <Image
              width={200}
              height={200}
              className="rounded-lg"
              layout="fixed"
              objectFit="cover"
              quality={100}
              priority={true}
              loading="eager"
              // blurDataURL={dev.thumbnail}
              placeholder="blur"
              // src={getDeveloperThumbnail(dev.thumbnail)}
              src ={getDeveloperThumbnail(dev.thumbnail)}
              alt="Developer Thumbnail"
            />
           
            
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayComponent;
