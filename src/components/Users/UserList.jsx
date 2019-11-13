import React from "react";
import User from "./User";

const UserList = props => {
  return (
    <div>{props.users && props.users.map(user => <User user={user} />)}</div>
  );
};

export default UserList;
