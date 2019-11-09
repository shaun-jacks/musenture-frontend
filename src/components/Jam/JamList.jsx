import React from "react";
import Jam from "./Jam";

const JamList = props => {
  return <div>{props.jams && props.jams.map(jam => <Jam jam={jam} />)}</div>;
};

export default JamList;
