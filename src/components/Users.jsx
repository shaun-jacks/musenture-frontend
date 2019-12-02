import React, { useEffect } from "react";
import UsersList from "./Users/UserList";
const Users = ({ users, push, fetchUsers }) => {
  useEffect(() => fetchUsers(), []);

  return <UsersList users={users} push={push} />;
};

export default Users;
