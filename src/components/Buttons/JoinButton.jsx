import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  background: var(--bgButtons);
  width: 3rem;
  border-radius: 10px;
  padding: 0.25rem;
  text-align: center;
  strong {
    color: white;
  }
  &:hover {
    cursor: pointer;
  }
`;

const JoinButton = ({ going }) => {
  return (
    <div>
      {going ? (
        ""
      ) : (
        <ButtonWrapper>
          <strong>Join</strong>
        </ButtonWrapper>
      )}
    </div>
  );
};

export default JoinButton;
