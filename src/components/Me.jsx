import React, { useState } from "react";
import { logoutUser } from "../actions/auth";
import styled from "styled-components";
import ProfileInfoDisplay from "./Users/ProfileInfoDisplay";
import TextButton from "../components/Buttons/TextButton";
import Modal from "../components/Modal";
import CreateJamForm from "../components/Forms/CreateJamForm";
import EditProfileForm from "../components/Forms/EditProfileForm";

const MePageWrapper = styled.div`
  background-color: var(--bg);
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


const Me = ({ user, followers, following, auth }) => {
  console.log(user, followers, auth);
  return (
    <div>
      {user ? (
        <MePageWrapper>
          <ProfileInfoDisplay
            user={user}
            followers={followers}
            following={following}
          />
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
