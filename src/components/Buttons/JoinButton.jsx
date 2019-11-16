import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  background: linear-gradient(
    to right,
    var(--orangeGradientStart),
    var(--orangeGradientEnd)
  );
  border-radius: 10px;
  padding: 0.5rem 0.75rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  p {
    margin: 0;
  }
  strong {
    color: white;
  }
  &:hover {
    cursor: pointer;
  }
`;

const JoinButton = ({ going }) => {
  console.log(going);
  return (
    <div>
      {going ? (
        ""
      ) : (
        <ButtonWrapper>
          <p>Join</p>
        </ButtonWrapper>
      )}
    </div>
  );
};

export default JoinButton;
