import React from "react";
const Success = ({ children }) => {
  return (
    <div
      style={{
        color: "#5ef39c",
        background: "var(--bg)",
        borderRadius: "5px",
        padding: "1em"
      }}
    >
      {children}
    </div>
  );
};

export default Success;
