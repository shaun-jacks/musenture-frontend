import React from "react";
import User from "./User";
import styled from "styled-components";

const UserListWrapper = styled.div`
  /* Larger Devices */
  @media only screen and (min-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const UserList = props => {
  return (
    <UserListWrapper>
      {props.users && props.users.map(user => <User user={user} />)}
    </UserListWrapper>
  );
};

export default UserList;
