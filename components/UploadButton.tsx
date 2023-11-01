import { useState } from "react";
import { useRouter } from "next/router";

export type PortfolioItem = {
  imageUrl: string;
  link: string;
};

const PortfolioUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [link, setLink] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  const body: File | null = null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Check if the file variable is null
    if (file === null) {
      return;
    }
    if(body === null){
      return;
    }
  
    // Upload the file
    const response = await fetch("/api/upload", {
      method: "POST",
      body: new FormData().append("file", file),
    });
  
    const fileUrl = await response.json();
  
    // Set the image URL and link
    setImageUrl(fileUrl);
    setLink(link);
  
    // Navigate to the portfolio item page
    router.push(`/portfolio/${fileUrl}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <input
        type="text"
        placeholder="Link to your portfolio"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default PortfolioUploader;