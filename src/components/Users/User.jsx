import React from "react";
import styled from "styled-components";
import Instrument from "../Icons/Instruments";
import TextButton from "../Buttons/TextButton";

const UserBorder = styled.div`
  background: var(--bg);
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
    justify-content: space-between;
  }
  .user-body {
    margin: 10px;
    text-align: center;
  }
  .user-footer {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;

    .see-profile-btn {
      margin: auto;
    }
  }

  /* Larger Devices */
  @media only screen and (min-width: 600px) {
    width: 300px;
    height: 90%;
  }
  padding: 0.5em;
`;

const InstrumentWrapper = styled.div`
  margin-left: 1em;
  width: 3em;
  height: 3em;
`;

const ProfileTitle = styled.div`
  display: flex;
`;

const User = ({ user, push }) => {
  console.log(user);

  return (
    <UserBorder>
      <UserContainer>
        <div className="user-header">
          <ProfileTitle>
            {user.avatar && (
              <img src={user.avatar} height="50px" width="50px" />
            )}
            <h3>{user.displayName}</h3>
          </ProfileTitle>
          <InstrumentWrapper className="instrument">
            <Instrument instrument={user.instrument} />
          </InstrumentWrapper>
        </div>
        <div className="user-body">
          <small>{user.bio}</small>
        </div>
        <div className="user-footer">
          <div
            className="see-profile-btn"
            onClick={e => {
              e.preventDefault();
              console.log(`Seeing profile: ${user.id}`);
              push(`/users/${user.id}`);
            }}
          >
            <TextButton text="See profile" />
          </div>
        </div>
      </UserContainer>
    </UserBorder>
  );
};

export default User;
