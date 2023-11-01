import React from 'react'
import { PortfolioItem } from "r";
import { useRouter } from "next/router";
import Image from 'next/image';

const project = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { fileUrl } = router.query;

  const portfolioItem: PortfolioItem = {
    imageUrl: fileUrl,
    link: fileUrl,
  };

  return (
    <div>
      <Image src={portfolioItem.imageUrl} alt="" />
      <a href={portfolioItem.link}>Visit portfolio</a>
    </div>
  );
}

export default project