import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { GoLocation } from "react-icons/go";
import { IconContext } from "react-icons";
import { FaCalendarAlt } from "react-icons/fa";
import JoinButton from "../Buttons/JoinButton";
import { handleJoinJam } from "../../actions/jams";
import { push } from "connected-react-router";
import Modal from "../Modal";
import Error from "../Messages/Error";

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

const Jam = ({ jam, me, handleJoinJam, auth, push }) => {
  const usersGoing = jam.usersGoing.length;
  const [joinWarning, toggleJoinWarning] = useState(false);

  const showJoinWarningModal = () => {
    toggleJoinWarning(true);
  };
  const closeJoinWarningModal = () => {
    toggleJoinWarning(false);
  };

  return (
    <JamBorder>
      <JamContainer>
        <div className="jam-header">
          <JamUserInfo
            onClick={() => {
              console.log("Clicked!");
              push(`/users/${jam.user.userId}`);
            }}
          >
            <UserProfile>
              {jam.user.avatar && (
                <img src={jam.user.avatar} width="30px" height="30px" />
              )}
            </UserProfile>
            <h5>{jam.user.displayName}</h5>
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
            {usersGoing} jammers going
          </small>
          <div
            onClick={() => {
              if (auth.isAuthenticated) {
                handleJoinJam(jam);
              } else {
                toggleJoinWarning(true);
              }
            }}
          >
            <JoinButton going={jam.going} />
          </div>
          <Modal show={joinWarning} handleClose={closeJoinWarningModal}>
            <Error> Login to join jam</Error>
          </Modal>
        </div>
      </JamContainer>
    </JamBorder>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { handleJoinJam, push })(Jam);
