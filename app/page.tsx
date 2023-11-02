// import Image from "next/image";

import Hero from "./Hero";


export default function Home() {
  return (
    <div>
           <Hero setImageListProp={function (newImageList: string[]): void {
        throw new Error("Function not implemented.");
      } } setLinkProp={function (newLink: { github: string; portfolio: string; social: string; }): void {
        throw new Error("Function not implemented.");
      } } githubLink={""} portfolioLink={""} socialLink={""}/>
    </div>
  );
}
