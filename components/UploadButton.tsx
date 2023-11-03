import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Developer {
  name: string;
  thumbnail: string | Blob;
  github: string;
  twitter: string;
  portfolioUrl: string;
}

const UploadButton: React.FC = () => {
  const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your Supabase URL
  const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Supabase anon key

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
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
    const storage = supabase.storage;
    const { data, error } = await storage.from('thumbnails').upload(
      `thumbnails/${developer.name}`,
      developer.thumbnail
    );

    if (error) {
      console.error('Error uploading file:', error);
    } else {
      console.log('File uploaded successfully. File info:', data);
      // Save the developer information to Supabase Database.
      const databaseRef = supabase.from('developers');
      await databaseRef.insert({
        name: developer.name,
        thumbnailUrl: data?.path, // Adjust as per your data structure
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
