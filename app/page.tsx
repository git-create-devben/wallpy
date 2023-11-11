// import Image from "next/image";

import Hero from "./Hero";
import Footer from "@/components/footer";

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), {
  ssr: false,
});


export default function Home() {
  return (
    <div>
      <Header/>
           <Hero/>
           <Footer/>
    </div>
  );
}
