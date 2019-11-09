import React from "react";
import styled from "styled-components";

const JamBorder = styled.div`
  background: var(--btnSearch);
  padding: 2px;
  margin: 1em 0em;
  border-radius: 10px;
`;

const JamContainer = styled.div`
  background: var(--bgContainer);
  margin: 0;
  padding: 0.5em;
  border-radius: 10px;
  display: flex;
  h3 {
    margin: 0.5em 0em;
  }
`;

const Jam = ({ jam }) => {
  return (
    <JamBorder>
      <JamContainer>
        <div>
          <h3>Jam Session</h3>
          <small>{jam.location}</small>
        </div>

        <ul>
          {jam.genres.map(genre => (
            <li>{genre}</li>
          ))}
        </ul>
      </JamContainer>
    </JamBorder>
  );
};

export default Jam;
