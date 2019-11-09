import React from "react";
import { FaHome } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  background: linear-gradient(to right, #9a5ad6, #7322bf);
  height: 100%;
  width: 3rem;
  border-radius: 50%;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  .btn {
    height: 100%;
    width: 75%;
    margin: auto 0.35rem;
    color: var(--bg);
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
