import React from "react";
import { GiDrum } from "react-icons/gi";
import { IconContext } from "react-icons";
import styled from "styled-components";

const InstrumentWrapper = styled.div`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.25s;
  background: linear-gradient(
    to right,
    var(--orangeGradientStart),
    var(--orangeGradientEnd)
  );
  padding: 10%;

  margin: 0 auto;
  &:hover {
    transform: scale(1.025);
  }
  .instrument {
    margin: 0.25em;
    height: 85%;
    width: 85%;
  }
`;

const Drums = () => {
  return (
    <InstrumentWrapper>
      <IconContext.Provider value={{ size: "1em", className: "instrument" }}>
        <GiDrum color="var(--bgContainer)" />
      </IconContext.Provider>
    </InstrumentWrapper>
  );
};

export default Drums;
