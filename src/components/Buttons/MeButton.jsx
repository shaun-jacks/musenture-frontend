import React from "react";
import { GoPerson } from "react-icons/go";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  background: linear-gradient(
    to right,
    var(--orangeGradientStart),
    var(--orangeGradientEnd)
  );
  height: 100%;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
`;

const ButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  .btn {
    height: 100%;
    width: 60%;
    margin: auto 0.6rem;
    color: var(--bgAccent);
  }
`;

const MeButton = () => {
  return (
    <BorderWrapper>
      <ButtonWrapper>
        <IconContext.Provider value={{ size: "2em", className: "btn" }}>
          <GoPerson />
        </IconContext.Provider>
      </ButtonWrapper>
    </BorderWrapper>
  );
};

export default MeButton;
