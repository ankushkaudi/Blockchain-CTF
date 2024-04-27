// Modal.jsx

import React from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {children}
          <div className="file-upload-container">
            <label className="file-upload-label" htmlFor="file-upload">
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
