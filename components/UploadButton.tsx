import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import storage from '../app/firebase'; // Update the path to your Firebase config file

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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

    const storageRef = firebase.storage().ref();
    if (developer.thumbnail) {
      const uploadTask = storageRef.child(`thumbnails/${developer.name}`).put(developer.thumbnail);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
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
    <form onSubmit={handleSubmit}>
      {/* Your input fields here */}
    </form>
  );
};

export default UploadButton;
