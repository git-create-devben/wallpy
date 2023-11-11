"use client"
import Project from "@/components/project/project";
import "./globals.css"
import { useState, useEffect } from "react";
import Modal from "@/components/welcome";
const Hero = () => {

  const [showModal, setShowModal] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowModal(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      {/* <Header/> */}

      {showModal && <Modal onClose={closeModal} />}
      <div
        className="hero h-screen cont"
        // style={{
        //   backgroundImage:
        //     "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        // }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h2 className=" text-8xl font-bold mb-2">
              <span className=" text-blue-500">W</span>
              <span className=" text-red-500">a</span>
              <span className=" text-green-500">l</span>
              <span className=" text-yellow-500">l</span>
              <span className=" text-purple-500">p</span>
              <span className=" text-pink-500">y</span>
              <span className=" text-orange-500">.</span>
            </h2>
            <p className="mb-5">
              A collections of developer portifolio <br />
              Developers inspire developers to build awesome portfolio
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-[50rem] "
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" min-h-screen p-5">
        <Project searchTerm={searchTerm}/>
      </div>
    </section>
  );
};

export default Hero;
