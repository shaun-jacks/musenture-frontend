import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { GoLocation } from "react-icons/go";
import { IconContext } from "react-icons";
import { FaCalendarAlt } from "react-icons/fa";
import Modal from "../Modal";
import Error from "../Messages/Error";
import JoinButton from "../Buttons/JoinButton";

const JamBorder = styled.div`
  background: var(--bg);
  // padding: 1px;
  margin: 0.5em;
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
    margin: 0.5em 0em;
    justify-content: space-between;
    .location: {
      margin-right: 0.25em;
    }
  }
  .jam-footer {
    display: flex;
    justify-content: space-between;
  }

  padding: 0.5em;

  /* Larger Devices */
  @media only screen and (min-width: 600px) {
    width: 300px;
  }
`;

const JamUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1em;
`;

const UserProfile = styled.div`
  border-radius: 50%;
  margin-right: 1em;
`;

const JamTitle = styled.h3`
  margin-top: 0em;
  color: var(--bgButtons);
`;

const Jam = ({ jam, push, users, going, joinJam }) => {
  const usersGoing = jam.usersGoing.length;
  const [joinWarning, toggleJoinWarning] = useState(false);

  const showJoinWarningModal = () => {
    toggleJoinWarning(true);
  };
  const closeJoinWarningModal = () => {
    toggleJoinWarning(false);
  };

  const user = users.byId[jam.creator];
  return (
    <JamBorder>
      <JamContainer>
        <div className="jam-header">
          <JamUserInfo
            onClick={() => {
              console.log("Clicked!");
              push(`/users/${user.id}`);
            }}
          >
            <UserProfile>
              {user.avatar && (
                <img src={user.avatar} width="30px" height="30px" />
              )}
            </UserProfile>
            <h5>{user.displayName}</h5>
          </JamUserInfo>
          <JamTitle>{jam.title}</JamTitle>
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
          <div style={{ marginLeft: "1em" }}>
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
        <div className="jam-footer">
          <small style={{ fontSize: "x-small" }}>
            {jam.usersGoing.length} jammers going
          </small>
          <div
            onClick={() => {
              console.log(jam.id);
              joinJam(jam.id);
            }}
          >
            <JoinButton going={going} />
          </div>
          <Modal show={joinWarning} handleClose={closeJoinWarningModal}>
            <Error> Login to join jam</Error>
          </Modal>
        </div>
      </JamContainer>
    </JamBorder>
  );
};

export default Jam;
