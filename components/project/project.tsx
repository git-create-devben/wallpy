import React from 'react'
import { Developer } from "../UploadButton";

type ProjectProps = {
  developerData: Developer;
};


const Project: React.FC<ProjectProps> = ({ developerData }) => {
  return (
    <div>
    <h2>Developer Information</h2>
    <p>Name: {developerData?.name || 'No Name Available'}</p>
    <p>Github: {developerData?.github || 'No Github Available'}</p>
    <p>Twitter: {developerData?.twitter || 'No Twitter Available'}</p>
    <p>Portfolio URL: {developerData?.portfolioUrl || 'No Portfolio URL Available'}</p>
    {/* You can add more data points as needed */}
  </div>
  )
}

export default Project