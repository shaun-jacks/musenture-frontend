import React from "react";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  height: 43px;
  width: 43px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(to right, #ffb21e, orange);
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
    color: #ffb21e;
    margin-left: 5px;
    margin-top: 5px;
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
