import React from "react";

const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        {children}
        <button
          style={{
            background: "var(--bgAccent)",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)"
          }}
          onClick={handleClose}
        >
          close
        </button>
      </section>
    </div>
  );
};

export default Modal;
