import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleFetchJamsByUserId } from "../actions/jams";
import {
  handleFetchUser,
  handleFollowUser,
  handleUnfollowUser
} from "../actions/users";

import JamList from "../components/Jam/JamList";
import styled from "styled-components";
import Instrument from "../components/Icons/Instruments";
import TextButton from "../components/Buttons/TextButton";

const UserPageWrapper = styled.div`
  background-color: var(--bg);
`;

const ProfileInfoDisplay = styled.div`
  background-color: var(--bgAccent);
  display: flex;
  justify-content: space-between;
  padding: 1em;
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
  }
`;

const ProfileActionsDisplay = styled.div`
  background-color: var(--bgAccent);
  display: flex;
  justify-content: space-around;
  padding-bottom: 1em;
`;

const JamsWrapper = styled.div`
  background-color: var(--bg);
  height: 100%;
  padding: 1em;
`;

const Spacer = styled.div`
  flex: 0.25;
`;

class UserPage extends Component {
  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      await this.props.handleFetchJamsByUserId(
        this.props.userId,
        this.props.auth.user.id
      );
      await this.props.handleFetchUser(
        this.props.userId,
        this.props.auth.user.id
      );
    } else {
      await this.props.handleFetchJamsByUserId(this.props.userId);
      await this.props.handleFetchUser(this.props.userId);
    }
  }

  render() {
    console.log(this.props);
    console.log(this.props.jams);
    const { jams } = this.props;
    const authUser = this.props.auth.user;
    const { user } = this.props.user;
    console.log(user);

    return (
      <div>
        <UserPageWrapper>
          {" "}
          {user && (
            <div>
              <ProfileInfoDisplay>
                <div className="profile-left">
                  {user && (
                    <img
                      src={user.avatarLarge ? user.avatarLarge : user.avatar}
                      height="100px"
                      width="100px"
                    />
                  )}
                  <h2>{user.displayName}</h2>
                  <p style={{ fontSize: "small" }}>{user.bio}</p>
                </div>
                <div className="profile-right">
                  <Instrument instrument={user.instrument} />
                  <div
                    className="follow-container"
                    style={{ textAlign: "center" }}
                  >
                    <div>
                      <h5 style={{ marginTop: "2em", marginBottom: "0" }}>
                        Followers
                      </h5>
                      <small>{user.followers.length}</small>
                    </div>
                    <div>
                      <h5 style={{ marginTop: "1em", marginBottom: "0" }}>
                        Following
                      </h5>
                      <small>{user.following.length}</small>
                    </div>
                  </div>
                </div>
                <Spacer />
              </ProfileInfoDisplay>
              <ProfileActionsDisplay>
                {!this.props.user.amFollowing && (
                  <div
                    onClick={() => {
                      if (this.props.auth.isAuthenticated) {
                        this.props.handleFollowUser(
                          user._id,
                          this.props.auth.user.id
                        );
                      }
                    }}
                  >
                    <TextButton text="Follow User" />
                  </div>
                )}
                {this.props.user.amFollowing && (
                  <div
                    onClick={() => {
                      if (this.props.auth.isAuthenticated) {
                        this.props.handleUnfollowUser(
                          user._id,
                          this.props.auth.user.id
                        );
                      }
                    }}
                  >
                    <TextButton text="Unfollow User" />
                  </div>
                )}
              </ProfileActionsDisplay>
            </div>
          )}
          {jams && (
            <JamsWrapper>
              <JamList jams={jams.jams} me={authUser} />
            </JamsWrapper>
          )}
        </UserPageWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.users.user,
    jams: state.jams.jams
  };
}

export default connect(mapStateToProps, {
  handleFetchJamsByUserId,
  handleFetchUser,
  push,
  handleFollowUser,
  handleUnfollowUser
})(UserPage);
