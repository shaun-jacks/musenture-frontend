import React from "react";
const Error = ({ children }) => {
  return (
    <div
      style={{
        color: "#f35e6a",
        background: "var(--bg)",
        borderRadius: "5px",
        padding: "1em"
      }}
    >
      {children}
    </div>
  );
};

export default Error;
