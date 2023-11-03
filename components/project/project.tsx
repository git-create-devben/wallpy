import React from 'react'
import { Developer } from "../UploadButton";

type ProjectProps = {
  developerData: Developer;
};


const Project: React.FC<ProjectProps> = ({ developerData }) => {
  return (
    <div>
    <h2>Developer Information</h2>
    <p>Name: {developerData.name}</p>
    <p>Github: {developerData.github}</p>
    <p>Twitter: {developerData.twitter}</p>
    <p>Portfolio URL: {developerData.portfolioUrl}</p>
    {/* You can add more data points as needed */}
  </div>
  )
}

export default Project