import React, { useEffect } from "react";
import UsersList from "../Users/UserList";
import styled from "styled-components";
import Spinner from "../Spinner";

const UserWrapper = styled.div`
  padding: 1em;
`;

const Users = ({ users, push, fetchUsers, usersLoading }) => {
  useEffect(() => fetchUsers(), []);
  console.log("Loading?", usersLoading);
  return (
    <UserWrapper>
      {usersLoading && (
        <Spinner
          loading={usersLoading}
          text={"Loading Users..."}
          center={true}
        />
      )}
      {!usersLoading && <UsersList users={users} push={push} />}
    </UserWrapper>
  );
};

export default Users;
