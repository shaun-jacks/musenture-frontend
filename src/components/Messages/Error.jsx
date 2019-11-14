import React from "react";
const Error = ({ children }) => {
  return (
    <div style={{ color: "#D8000C", background: "#FFD2D2", padding: "1em" }}>
      {children}
    </div>
  );
};

export default Error;
