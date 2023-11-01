import React from "react";
import Image from "next/image";

const project = () => {
  return (
    <main className="p-4 ">
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <Image
            alt="A test image"
            src="https://your-domain/image.jpg"
            width="400"
            height="300"
            quality="80"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default project;
