import { combineReducers } from "redux";
import users from "./users";
import usersFollowers from "./usersFollowers";

const entities = combineReducers({
  users,
  usersFollowers
});

export default entities;
