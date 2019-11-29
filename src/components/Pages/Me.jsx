import React, { useState } from "react";
import styled from "styled-components";
import ProfileInfoDisplay from "../Users/ProfileInfoDisplay";
import TextButton from "../Buttons/TextButton";
import Modal from "../Modal";
import CreateJamForm from "../../containers/Forms/CreateJamForm";
import EditProfileForm from "../../containers/Forms/EditProfileForm";
import JamsList from "../Jams/JamList";

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

const Me = ({ user, followers, following, jamsGoing, logout, push }) => {
  const [showCreateJamModal, setCreateJamModal] = useState(false);
  const [showEditProfileModal, setEditProfileModal] = useState(false);

  const closeCreateJamModal = () => {
    setCreateJamModal(false);
  };
  const closeEditProfileModal = () => {
    setEditProfileModal(false);
  };

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
                setCreateJamModal(true);
              }}
            >
              <TextButton text="Create Jam" />
            </div>
            <Modal show={showCreateJamModal} handleClose={closeCreateJamModal}>
              <CreateJamForm />
            </Modal>
            <Modal
              show={showEditProfileModal}
              handleClose={closeEditProfileModal}
            >
              <EditProfileForm />
            </Modal>
            <div
              onClick={() => {
                setEditProfileModal(true);
              }}
            >
              <TextButton text="Edit Profile" />
            </div>
            <div
              onClick={() => {
                logout();
                // Redirect to login page
                push("/");
              }}
            >
              <TextButton text="Logout" />
            </div>
          </ProfileActionsDisplay>
          <JamsWrapper>
            <h3 style={{ textAlign: "center" }}>Jams Joined</h3>
            {jamsGoing && <JamsList jams={jamsGoing} />}
          </JamsWrapper>
        </MePageWrapper>
      ) : (
        <div>Login to view profile</div>
      )}
    </div>
  );
};

export default Me;
