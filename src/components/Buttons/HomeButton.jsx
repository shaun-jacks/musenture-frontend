import React from "react";
import { FaHome } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  background: linear-gradient(
    to right,
    var(--orangeGradientStart),
    var(--orangeGradientEnd)
  );
  margin-top: 5%;
  height: 90%;
  width: 90%;
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
    color: var(--bgButtons);
  }
`;

const HomeButton = () => {
  return (
    <BorderWrapper>
      <ButtonWrapper>
        <IconContext.Provider value={{ size: "2em", className: "btn" }}>
          <FaHome />
        </IconContext.Provider>
      </ButtonWrapper>
    </BorderWrapper>
  );
};

export default HomeButton;
