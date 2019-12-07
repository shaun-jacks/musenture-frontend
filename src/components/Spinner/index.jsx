import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = ({ loading, text, center = true }) => {
  return (
    <div
      style={center ? { display: "flex", width: "100vw", height: "100vh" } : {}}
    >
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "columnn"
        }}
      >
        <ScaleLoader
          css={{ flex: "1" }}
          sizeUnit={"em"}
          size={10}
          color={"var(--orangeGradientEnd)"}
          loading={loading}
        />
        {text && (
          <strong style={{ flex: "1", color: "var(--orangeGradientEnd)" }}>
            {text}
          </strong>
        )}
      </div>
    </div>
  );
};

export default Spinner;
