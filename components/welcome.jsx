// Modal.js
import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>This project is still under development and is open source. Contributors are welcome!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
