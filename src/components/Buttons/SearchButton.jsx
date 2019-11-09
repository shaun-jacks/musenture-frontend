import React from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  height: 43px;
  width: 43px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(to right, var(--btnSearch), #74d9f2);
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
    color: var(--btnSearch);
    margin-left: 8px;
    margin-top: 8px;
  }
`;

const SearchButton = () => {
  return (
    <BorderWrapper>
      <ButtonWrapper>
        <IconContext.Provider value={{ size: "1.70em", className: "btn" }}>
          <FaSearch />
        </IconContext.Provider>
      </ButtonWrapper>
    </BorderWrapper>
  );
};

export default SearchButton;
