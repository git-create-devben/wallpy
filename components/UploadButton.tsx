import React, { useState } from 'react';
import 'firebase/storage';
import {storage} from '../app/firebase'; // Update the path to your Firebase config file

interface Developer {
  name: string;
  thumbnail: File | null;
  github: string;
  twitter: string;
  portfolioUrl: string;
}

const UploadButton: React.FC = () => {
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

    const storageRef = storage.ref(); // Use the ref function
    if (developer.thumbnail) {
      const uploadTask = storageRef.child(`thumbnails/${developer.name}`).put(developer.thumbnail);

      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
          // You can handle progress here if needed
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        () => {
          console.log('File uploaded successfully.');
          // Handle the rest of your logic here, e.g., saving the developer information to Firebase Firestore.
        }
      );
    } else {
      console.error('No file chosen.');
    }
  };

  return (
    <>
    {/* Your input fields here */}
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
  </>
  );
};

export default UploadButton;
