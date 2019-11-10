import React from "react";
import Guitar from "./Guitar";

const Intrument = ({ instrument }) => {
  return <div>{instrument == "guitar" && <Guitar />}</div>;
};

export default Intrument;
