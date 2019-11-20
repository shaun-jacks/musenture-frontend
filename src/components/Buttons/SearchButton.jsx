import React from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const BorderWrapper = styled.div`
  background: linear-gradient(
    to right,
    var(--blueGradientStart),
    var(--blueGradientEnd)
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
    width: 60%;
    margin: auto 0.6rem;
    color: var(--bgAccent);
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
