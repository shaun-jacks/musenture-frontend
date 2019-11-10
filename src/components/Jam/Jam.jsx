import React from "react";
import styled from "styled-components";
import moment from "moment";

const JamBorder = styled.div`
  background: white;
  padding: 1px;
  margin: 1em 0em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`;

const JamContainer = styled.div`
  background: var(--bgContainer);
  margin: 0;
  padding: 0.5em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h3,
  h4,
  h5 {
    margin: 0.5em 0em;
  }
  img {
    border-radius: 50%;
  }
  .jam-header {
    display: flex;
    justify-content: space-between;
  }
  .jam-body {
    display: flex;
    justify-content: space-between;
  }
  &:hover {
    cursor: pointer;
  }
  padding: 0.5em;
`;

const Jam = ({ jam }) => {
  return (
    <JamBorder>
      <JamContainer>
        <div className="jam-header">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ borderRadius: "50%", marginRight: "1em" }}>
              {jam.user.avatar && (
                <img src={jam.user.avatar} width="30px" height="30px" />
              )}
            </div>
            <h5>{jam.user.displayName}</h5>
          </div>
          <h3 style={{ marginTop: ".25em" }}>{jam.title}</h3>
        </div>
        <div className="jam-body">
          <small>{jam.location}</small>

          <small>{moment(jam.dateOfJam).calendar()}</small>
        </div>
      </JamContainer>
    </JamBorder>
  );
};

export default Jam;
