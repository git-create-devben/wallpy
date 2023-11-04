import React, { useState } from 'react';
import { storage } from '../app/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

export interface Developer {
  name: string;
  thumbnail: File | null;
  github: string;
  twitter: string;
  portfolioUrl: string;
}

interface UploadButtonProps {
  developerData: Developer;
}

const UploadButton: React.FC<UploadButtonProps> = ({ developerData }) => {
  const [developer, setDeveloper] = useState<Developer>({
    name: '',
    thumbnail: null,
    github: '',
    twitter: '',
    portfolioUrl: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeveloper({
      ...developer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const storageRef = ref(storage, `thumbnails/${developer.name}`);
    if (developer.thumbnail) {
      uploadBytes(storageRef, developer.thumbnail).then(async (snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);

        const storageBucketUrl = 'https://firebasestorage.googleapis.com/v0/b/wallpy5.appspot.com/o/thumbnails'; // Replace with your storage bucket URL
        const fileUrl = `${storageBucketUrl}/${developer.thumbnail!.name}`;
        console.log('File URL:', fileUrl);

        const firestore = getFirestore();
        const developersCollectionRef = collection(firestore, 'developers');

        await addDoc(developersCollectionRef, {
          name: developer.name,
          thumbnailUrl: snapshot.metadata.fullPath,
          github: developer.github,
          twitter: developer.twitter,
          portfolioUrl: developer.portfolioUrl,
        });

        // Handle the rest of your logic here, if necessary.
      }).catch((error: any) => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.error('No file chosen.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={developer.name}
        onChange={handleChange}
      />
      <input
        type="file"
        name="thumbnail"
        placeholder="Thumbnail"
        onChange={(e) => {
          if (e.target.files) {
            setDeveloper({
              ...developer,
              thumbnail: e.target.files[0],
            });
          }
        }}
      />
      <input
        type="text"
        name="github"
        placeholder="GitHub"
        value={developer.github}
        onChange={handleChange}
      />
      <input
        type="text"
        name="twitter"
        placeholder="Twitter"
        value={developer.twitter}
        onChange={handleChange}
      />
      <input
        type="text"
        name="portfolioUrl"
        placeholder="Portfolio URL"
        value={developer.portfolioUrl}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadButton;
