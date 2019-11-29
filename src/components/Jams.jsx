import React, { useEffect, Component } from "react";
import styled from "styled-components";
import JamList from "../components/Jam/JamList";

const JamPageWrapper = styled.div`
  padding: 1em;
`;

const Jams = ({ fetchJams, jams }) => {
  useEffect(() => fetchJams(), []);

  return (
    <JamPageWrapper>
      <JamList jams={jams} />
    </JamPageWrapper>
  );
};

export default Jams;
