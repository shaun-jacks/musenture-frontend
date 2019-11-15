import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
  handleFetchJamsByUserId,
  handleFetchByUserIdCache
} from "../actions/jams";
import {
  handleFetchUser,
  handleFollowUser,
  handleUnfollowUser,
  resetUser
} from "../actions/users";
import Modal from "../components/Modal";
import Error from "../components/Messages/Error";
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
  flex: 0.125;
`;

const InstrumentWrapper = styled.div`
  width: 6em;
  height: 6em;
`;

class UserPage extends Component {
  state = {
    showModal: false,
    showUser: false
  };

  showModal = () => {
    this.setState({ ...this.state, showModal: true });
  };

  closeModal = () => {
    this.setState({ ...this.state, showModal: false });
  };

  async componentDidMount() {
    if (this.props.jams.fetchNewJams) {
      if (this.props.auth.isAuthenticated) {
        // So that we can know
        // who is joining jams and following user
        await this.props.handleFetchJamsByUserId(
          this.props.userId,
          this.props.auth.user.id
        );
      } else {
        await this.props.handleFetchJamsByUserId(this.props.userId);
        await this.props.handleFetchUser(this.props.userId);
        this.setState({ ...this.state, showUser: true });
      }
    } else {
      if (this.props.auth.isAuthenticated) {
        await this.props.handleFetchByUserIdCache(
          this.props.userId,
          this.props.jams.jamsByUserId,
          this.props.auth.user.id
        );
        await this.props.handleFetchUser(
          this.props.userId,
          this.props.auth.user.id
        );
        this.setState({ ...this.state, showUser: true });
      } else {
        await this.props.handleFetchByUserIdCache(
          this.props.userId,
          this.props.jams.jamsByUserId
        );
        await this.props.handleFetchUser(this.props.userId);
        this.setState({ ...this.state, showUser: true });
      }
    }
  }

  componentWillUnmount() {
    console.log("Resetting user info");
    this.props.resetUser();
    this.setState({ ...this.state, showUser: false });
  }

  render() {
    let userJams;
    if (Object.keys(this.props.jams.jamsByUserId).length > 0) {
      userJams = this.props.jams.jamsByUserId[this.props.userId];
    } else {
      userJams = this.props.jams.jams;
    }

    const { jams } = this.props;
    const authUser = this.props.auth.user;
    const { user } = this.props.user;

    console.log(this.props);
    console.log(this.props.jams);
    console.log(user);

    return (
      <div>
        <UserPageWrapper>
          {!this.state.showUser && (
            <div style={{ padding: "1em" }}>
              {" "}
              <h1>Loading User...</h1>
            </div>
          )}
          {this.state.showUser && user && jams && (
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
                  <InstrumentWrapper>
                    <Instrument instrument={user.instrument} />
                  </InstrumentWrapper>
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
                      } else {
                        this.showModal();
                      }
                    }}
                  >
                    <TextButton text="Follow User" />
                  </div>
                )}
                <Modal
                  show={this.state.showModal}
                  handleClose={this.closeModal}
                >
                  <Error>Please login to follow user.</Error>
                </Modal>
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
          {this.state.showUser && jams && user && (
            <JamsWrapper>
              <JamList jams={userJams} me={authUser} />
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
  handleFetchByUserIdCache,
  handleFetchUser,
  push,
  handleFollowUser,
  handleUnfollowUser,
  resetUser
})(UserPage);
