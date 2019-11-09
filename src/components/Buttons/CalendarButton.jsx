import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  background: linear-gradient(to right, #f27474, #e32222);
  height: 100%;
  width: 3rem;
  border-radius: 50%;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  .btn {
    height: 100%;
    width: 60%;
    margin: auto 0.6rem;
    color: var(--bg);
  }
`;

const CalendarButton = () => {
  return (
    <BorderWrapper>
      <ButtonWrapper>
        <IconContext.Provider value={{ size: "1.75em", className: "btn" }}>
          <FaCalendarAlt />
        </IconContext.Provider>
      </ButtonWrapper>
    </BorderWrapper>
  );
};

export default CalendarButton;
