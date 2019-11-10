import React from "react";
import styled from "styled-components";
import moment from "moment";
import { GoLocation } from "react-icons/go";
import { IconContext } from "react-icons";
import { FaCalendarAlt } from "react-icons/fa";

const JamBorder = styled.div`
  background: white;
  padding: 1px;
  margin: 1em 0em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.25s;
  &:hover {
    transform: scale(1.025);
  }
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
    .location: {
      margin-right: 0.25em;
    }
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
          <h3 style={{ marginTop: ".25em", color: "var(--bgButtons)" }}>
            {jam.title}
          </h3>
        </div>
        <div className="jam-body">
          <div>
            <IconContext.Provider
              value={{ size: ".85em", className: "location" }}
            >
              <GoLocation />
            </IconContext.Provider>
            <small style={{ marginLeft: ".25rem" }}>{jam.location}</small>
          </div>
          <div>
            <IconContext.Provider
              value={{ size: ".85em", className: "location" }}
            >
              <FaCalendarAlt />
            </IconContext.Provider>
            <small style={{ marginLeft: ".25rem" }}>
              {moment(jam.dateOfJam).calendar()}
            </small>
          </div>
        </div>
      </JamContainer>
    </JamBorder>
  );
};

export default Jam;
