import React from "react";
import styled from "styled-components";
import moment from "moment";

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
  justify-content: space-around;
  h3,
  h4 {
    margin: 0.5em 0em;
  }
  img {
    border-radius: 50%;
  }
`;

const Jam = ({ jam }) => {
  return (
    <JamBorder>
      <JamContainer>
        <div>
          <h3>Jam Session</h3>
          <small>{jam.location}</small>
          <br />
          <small>{moment(jam.dateOfJam).calendar()}</small>
        </div>

        <ul>
          {jam.genres.map(genre => (
            <li>{genre}</li>
          ))}
        </ul>
        <div>
          <h4>{jam.user.displayName}</h4>
          <div style={{ borderRadius: "50%" }}>
            <img src={jam.user.avatar} />
          </div>
        </div>
      </JamContainer>
    </JamBorder>
  );
};

export default Jam;
