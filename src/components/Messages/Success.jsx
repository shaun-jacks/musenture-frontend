import React from "react";
const Success = ({ children }) => {
  return (
    <div style={{ background: "#4F8A10", padding: "1px", borderRadius: "5px" }}>
      <div
        style={{
          color: "#DFF2BF",
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

export default Success;
