import React, { useEffect } from "react";
import UsersList from "./Users/UserList";
import styled from "styled-components";

const UserWrapper = styled.div`
  padding: 1em;
`;

const Users = ({ users, push, fetchUsers }) => {
  useEffect(() => fetchUsers(), []);

  return (
    <UserWrapper>
      <UsersList users={users} push={push} />
    </UserWrapper>
  );
};

export default Users;
