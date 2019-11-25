import React, { useState } from "react";
import { logoutUser } from "../actions/auth";
import styled from "styled-components";
import Instrument from "../components/Icons/Instruments";
import TextButton from "../components/Buttons/TextButton";
import Modal from "../components/Modal";
import CreateJamForm from "../components/Forms/CreateJamForm";
import EditProfileForm from "../components/Forms/EditProfileForm";

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
    .instrument {
      max-height: 7em;
      max-width: 7em;
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

const Me = ({ user, followers, following, auth }) => {
  console.log(user, followers, auth);
  return (
    <div>
      {user ? (
        <MePageWrapper>
          <ProfileInfoDisplay>
            <div className="profile-left">
              <img
                src={user.avatarLarge ? user.avatarLarge : user.avatar}
                height="100px"
                width="100px"
              />
              <h2>{user.displayName}</h2>
              <p style={{ fontSize: "small" }}>{user.bio}</p>
            </div>
            <div className="profile-right">
              <div className="instrument">
                <Instrument instrument={user.instrument} />
              </div>
              <div className="follow-container" style={{ textAlign: "center" }}>
                <div>
                  <h5 style={{ marginTop: "2em", marginBottom: "0" }}>
                    Followers
                  </h5>
                  <small>{followers.length}</small>
                </div>
                <div>
                  <h5 style={{ marginTop: "1em", marginBottom: "0" }}>
                    Following
                  </h5>
                  <small>{following.length}</small>
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
            {/* <Modal show={showModal} handleClose={this.props.closeMeModal}>
              <CreateJamForm />
            </Modal>
            <Modal
              show={showEditModal}
              handleClose={this.props.closeEditMeModal}
            >
              <EditProfileForm />
            </Modal> */}
            <div
              onClick={() => {
                this.props.showEditMeModal();
              }}
            >
              <TextButton text="Edit Profile" />
            </div>
            <div
              onClick={() => {
                console.log("LOGGING OUT");
                this.props.logoutUser();
                // Redirect to login page
                this.props.push("/");
              }}
            >
              <TextButton text="Logout" />
            </div>
          </ProfileActionsDisplay>
        </MePageWrapper>
      ) : (
        <div>Login to view profile</div>
      )}
    </div>
  );
};

export default Me;
