import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  height: 43px;
  width: 43px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(to right, #f27474, #e32222);
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
    color: var(--btnCalendar);
    margin-left: 7px;
    margin-top: 7px;
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
