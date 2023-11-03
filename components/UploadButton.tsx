import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'

interface Developer {
  name: string;
  thumbnail: string;
  github: string;
  twitter: string;
  portfolioUrl: string;
}

const UploadButton: React.FC = () => {
 
const supabaseUrl = 'https://vkarozfhfwvtmbjgtmzi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrYXJvemZoZnd2dG1iamd0bXppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMzc4MDgsImV4cCI6MjAxNDYxMzgwOH0.Ne6deynwQtKFd6bw6fFCWPK-QSDDv3JmTn6UsoiLxkw'

const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const [developer, setDeveloper] = useState<Developer>({
    name: '',
    thumbnail: '',
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
  
    // Upload the thumbnail image to Supabase Storage.
    const storageRef = supabase.storage().from('thumbnails');
    const thumbnailRef = storageRef.ref(developer.name);
    await thumbnailRef.upload()()(developer.thumbnail);
  
    // Save the developer information to Supabase Database.
    const databaseRef = supabase.from('developers');
    await databaseRef.insert({
      name: developer.name,
      thumbnailUrl: await thumbnailRef.getUrl(),
      github: developer.github,
      twitter: developer.twitter,
      portfolioUrl: developer.portfolioUrl,
    });
  
    // Clear the form.
    setDeveloper({
      name: '',
      thumbnail: '',
      github: '',
      twitter: '',
      portfolioUrl: '',
    });
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
        onChange={handleChange}
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
