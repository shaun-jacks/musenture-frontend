import React from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  background: linear-gradient(to right, var(--btnSearch), #74d9f2);
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
