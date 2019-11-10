import React from "react";
import { GoPerson } from "react-icons/go";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  // background: linear-gradient(to right, #ffd484, #ffa600);
  height: 100%;
  width: 3rem;
  // border-radius: 50%;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  .btn {
    height: 100%;
    width: 60%;
    margin: auto 0.6rem;
    color: var(--bgButtons);
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
