import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  height: 100%;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin: auto;
  .btn {
    height: 100%;
    width: 60%;
    margin: auto 0.6rem;
  }
`;

const CalendarButton = () => {
  return (
    <BorderWrapper className="btn-border">
      <ButtonWrapper>
        <IconContext.Provider value={{ size: "1.75em", className: "btn" }}>
          <FaCalendarAlt />
        </IconContext.Provider>
      </ButtonWrapper>
    </BorderWrapper>
  );
};

export default CalendarButton;
