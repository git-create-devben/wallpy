import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../app/firebase';
import { v4 as uuidv4 } from 'uuid';

interface DeveloperFormProps {
  // Define any props you need to pass to the component
}

const DeveloperForm: React.FC<DeveloperFormProps> = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [githubLink, setGithubLink] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(file);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!thumbnail) return;

    const storageRef = ref(storage, `thumbnails/${thumbnail.name + uuidv4()}`);
    await uploadBytes(storageRef, thumbnail);
    const downloadURL = await getDownloadURL(storageRef);

    // Save the data to your database (e.g., Firebase Firestore)
    // You can use Firebase Firestore or any other database for this purpose
    // Replace the following lines with your own database logic

    const developerData = {
      thumbnail: downloadURL,
      github: githubLink,
      twitter: twitterHandle,
      portfolio: portfolioUrl,
    };

    // Example of saving the data to a Firestore collection
    // Replace 'your_firestore_collection' with your actual collection name
    // await addDoc(collection(db, 'your_firestore_collection'), developerData);

    // Reset the form fields
    setThumbnail(null);
    setGithubLink('');
    setTwitterHandle('');
    setPortfolioUrl('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleThumbnailUpload} />
      <input
        type="text"
        placeholder="GitHub Link"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Twitter Handle"
        value={twitterHandle}
        onChange={(e) => setTwitterHandle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Portfolio URL"
        value={portfolioUrl}
        onChange={(e) => setPortfolioUrl(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeveloperForm;
