import React from "react";
const Error = ({ children }) => {
  return (
    <div style={{ background: "#D8000C", padding: "1px", borderRadius: "5px" }}>
      <div
        style={{
          color: "#FFD2D2",
          background: "var(--bg)",
          borderRadius: "5px",
          padding: "1em"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Error;
