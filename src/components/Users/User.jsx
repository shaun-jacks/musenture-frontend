import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import Instrument from "../Icons/Instruments";
import TextButton from "../Buttons/TextButton";

const UserBorder = styled.div`
  background: white;
  padding: 1px;
  margin: 1em 0em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.25s;
  &:hover {
    transform: scale(1.025);
  }
  max-width: 700px;
`;

const UserContainer = styled.div`
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
    margin-right: 1em;
  }
  .user-header {
    display: flex;
  }
  .user-body {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;

    .instrument {
      min-height: 3em;
      min-width: 3em;
      max-height: 6em;
      max-width: 6em;
    }

    .see-profile-btn {
      margin: auto;
    }
  }
  .user-footer {
  }

  padding: 0.5em;
`;

const User = ({ user, push }) => {
  console.log(user);

  return (
    <UserBorder>
      <UserContainer>
        <div className="user-header">
          {user.avatar && <img src={user.avatar} height="50px" width="50px" />}
          <h3>{user.displayName}</h3>
        </div>
        <div className="user-body">
          <div className="instrument">
            <Instrument instrument={user.instrument} />
          </div>
          <div
            className="see-profile-btn"
            onClick={e => {
              e.preventDefault();
              console.log(`Seeing profile: ${user._id}`);
              push(`/users/${user._id}`);
            }}
          >
            <TextButton text="See profile" />
          </div>
        </div>
        <div className="user-footer"></div>
      </UserContainer>
    </UserBorder>
  );
};

export default connect(null, { push })(User);
