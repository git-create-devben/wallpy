// Modal.js

import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-primary-darker opacity-80 backdrop-blur-sm animate-fade-in-up animate-slower">

      <div className="absolute w-full h-full bg-black opacity-50"></div>


      {/* Modal content */}
      <div className="bg-white rounded-lg p-8 z-50">
        <p className="text-2xl font-bold mb-4">Welcome to Wallpy</p>
        <p className="text-gray-700">
          This project is still under development, and we welcome contributors.

        </p>

        {/* Close button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
