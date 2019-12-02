import React from "react";
import styled from "styled-components";
import Instrument from "../Icons/Instruments";

const ProfileInfoDisplayWrapper = styled.div`
  background-color: var(--bgAccent);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`;

const ProfileInfoDisplayStyles = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1em;
  max-width: 800px;
  margin: 0 auto;
  img {
    border-radius: 50%;
  }
  .profile-left {
    h2 {
      margin: 0.25em;
    }
  }
  .profile-right {
    margin-left: 2em;
    display: flex;
    flex-direction: column;
    .follow-container {
      h5 {
        margin: 0;
      }
    }
    .instrument {
      max-height: 7em;
      max-width: 7em;
    }
  }
`;

const Spacer = styled.div`
  flex: 0.25;
`;

const ProfileInfoDisplay = ({ user, followers, following }) => {
  return (
    <ProfileInfoDisplayWrapper>
      <ProfileInfoDisplayStyles>
        <div className="profile-left">
          <img
            src={user.avatarLarge ? user.avatarLarge : user.avatar}
            height="100px"
            width="100px"
          />
          <h2>{user.displayName}</h2>
          <p style={{ fontSize: "small" }}>{user.bio}</p>
        </div>
        <div style={{ flex: "1" }} />
        <div className="profile-right">
          <div className="instrument">
            <Instrument instrument={user.instrument} />
          </div>
          <div className="follow-container" style={{ textAlign: "center" }}>
            <div>
              <h5 style={{ marginTop: "2em", marginBottom: "0" }}>Followers</h5>
              <small>{followers.length}</small>
            </div>
            <div>
              <h5 style={{ marginTop: "1em", marginBottom: "0" }}>Following</h5>
              <small>{following.length}</small>
            </div>
          </div>
        </div>
        <Spacer />
      </ProfileInfoDisplayStyles>
    </ProfileInfoDisplayWrapper>
  );
};

export default ProfileInfoDisplay;
