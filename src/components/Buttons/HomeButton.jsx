import React from "react";
import { FaHome } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  height: 43px;
  width: 43px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(to right, #9a5ad6, #7322bf);
`;

const ButtonWrapper = styled.div`
  background: var(--bg);
  border-radius: 50%;
  height: 43px;
  width: 43px;
  justify-content: center;
  align-content: center;
  .btn {
    justify-content: center;
    align-content: center;
    color: var(--btnHome);
    margin-left: 5px;
    margin-top: 5px;
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
