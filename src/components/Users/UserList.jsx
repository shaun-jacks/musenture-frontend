import React from "react";
import User from "./User";
import styled from "styled-components";

const UserListWrapper = styled.div`
  /* Larger Devices */
  @media only screen and (min-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
  }
`;

const UserList = ({ users, push }) => {
  return (
    <UserListWrapper>
      {users && users.map(user => <User user={user} push={push} />)}
    </UserListWrapper>
  );
};

export default UserList;
