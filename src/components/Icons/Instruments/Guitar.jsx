import React from "react";
import { GiGuitar } from "react-icons/gi";
import { IconContext } from "react-icons";
import styled from "styled-components";

const InstrumentWrapper = styled.div`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.25s;
  background: var(--bgButtons);
  &:hover {
    transform: scale(1.025);
  }
  .instrument {
    margin: 0.25em;
    height: 100%;
    width: 100%;
  }
`;

const Guitar = () => {
  return (
    <InstrumentWrapper>
      <IconContext.Provider value={{ size: "1em", className: "instrument" }}>
        <GiGuitar color="var(--bg)" />
      </IconContext.Provider>
    </InstrumentWrapper>
  );
};

export default Guitar;
