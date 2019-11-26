import { combineReducers } from "redux";
import users from "./users";
import usersFollowers from "./usersFollowers";
import jams from "./jams";

const entities = combineReducers({
  users,
  usersFollowers,
  jams
});

export default entities;
