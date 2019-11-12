import React from "react";

import styled from "styled-components";

const ButtonWrapper = styled.div`
  background: white;
  border-radius: 10px;
  padding: 0.3rem;
  text-align: center;
  // color: var(--bgButtons);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  // border: 1px solid var(--bgButtons);
  &:hover {
    cursor: pointer;
  }
`;

const TextButton = ({ text }) => {
  return <ButtonWrapper>{text}</ButtonWrapper>;
};

export default TextButton;
