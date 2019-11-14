import React from "react";
import Guitar from "./Guitar";
import Voice from "./Voice";
import Drums from "./Drums";

const Intrument = ({ instrument }) => {
  return (
    <div>
      {instrument == "guitar" && <Guitar />}
      {instrument == "voice" && <Voice />}
      {instrument == "drums" && <Drums />}
    </div>
  );
};

export default Intrument;
