import React from "react";
import { FiLogIn } from "react-icons/fi";
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
    width: 75%;
    margin: auto 0.35rem;
    color: var(--bgAccent);
  }
`;

const HomeButton = () => {
  return (
    <BorderWrapper>
      <ButtonWrapper>
        <IconContext.Provider value={{ size: "2em", className: "btn" }}>
          <FiLogIn />
        </IconContext.Provider>
      </ButtonWrapper>
    </BorderWrapper>
  );
};

export default HomeButton;
