// Modal.js
import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Background overlay with blur */}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg p-8 z-50">
        <p className="text-2xl font-bold mb-4">Welcome to Our Project!</p>
        <p className="text-gray-700">
          This project is still under development, and we welcome contributors.
        </p>

        {/* Close button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
