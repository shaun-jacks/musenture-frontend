import React, { useEffect } from "react";
import UsersList from "../Users/UserList";
import styled from "styled-components";
import { FadeLoader } from "react-spinners";

const UserWrapper = styled.div`
  padding: 1em;
`;

const Users = ({ users, push, fetchUsers, usersLoading }) => {
  useEffect(() => fetchUsers(), []);
  console.log("Loading?", usersLoading);
  return (
    <UserWrapper>
      {usersLoading && (
        <FadeLoader
          sizeUnit={"px"}
          size={150}
          color={"var(--orangeGradientEnd)"}
          loading={usersLoading}
        />
      )}
      {!usersLoading && <UsersList users={users} push={push} />}
    </UserWrapper>
  );
};

export default Users;
