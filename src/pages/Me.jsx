import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { logoutUser } from "../actions/auth";
import {
  handleFetchMe,
  handleFetchMeJams,
  showMeModal,
  closeMeModal
} from "../actions/me";
import JamList from "../components/Jam/JamList";
import styled from "styled-components";
import Instrument from "../components/Icons/Instruments";
import TextButton from "../components/Buttons/TextButton";
import Modal from "../components/Modal";

const MePageWrapper = styled.div`
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

class Me extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (!this.props.me.user) {
        // Fetch user data
        this.props.handleFetchMe();
      }
      this.props.handleFetchMeJams(this.props.auth.user.id);
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    let me, jams, showModal;
    if (this.props.me) {
      console.log(this.props.me);
      me = this.props.me.user;
      showModal = this.props.me.showModal;
      if (this.props.me.jams) {
        jams = this.props.me.jams.jams;
      }
    }
    return (
      <div>
        {isAuthenticated ? (
          <MePageWrapper>
            <ProfileInfoDisplay>
              <div className="profile-left">
                <img src={me.avatar} height="100px" width="100px" />
                <h2>{me.displayName}</h2>
                <p style={{ fontSize: "small" }}>{me.bio}</p>
              </div>
              <div className="profile-right">
                <Instrument instrument={me.instrument} />
                <div
                  className="follow-container"
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <h5 style={{ marginTop: "2em", marginBottom: "0" }}>
                      Followers
                    </h5>
                    <small>{me.followers.length}</small>
                  </div>
                  <div>
                    <h5 style={{ marginTop: "1em", marginBottom: "0" }}>
                      Following
                    </h5>
                    <small>{me.following.length}</small>
                  </div>
                </div>
              </div>
              <Spacer />
            </ProfileInfoDisplay>
            <ProfileActionsDisplay>
              <div
                onClick={() => {
                  this.props.showMeModal();
                }}
              >
                <TextButton text="Create Jam" />
              </div>
              <Modal show={showModal} handleClose={this.props.closeMeModal}>
                <h2>Create a Jam!</h2>
              </Modal>
              <div>
                <TextButton text="Edit Profile" />
              </div>
              <div>
                <TextButton text="Inbox" />
              </div>
              <div
                onClick={() => {
                  console.log("LOGGING OUT");
                  this.props.logoutUser();
                  // Redirect to login page
                  this.props.push("/login");
                }}
              >
                <TextButton text="Logout" />
              </div>
            </ProfileActionsDisplay>
            <JamsWrapper>
              <JamList jams={jams} me={user} />
            </JamsWrapper>
          </MePageWrapper>
        ) : (
          <div>Login to view profile</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    me: state.me.me
  };
}

export default connect(mapStateToProps, {
  handleFetchMe,
  handleFetchMeJams,
  showMeModal,
  closeMeModal,
  logoutUser,
  push
})(Me);
