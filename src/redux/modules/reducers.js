import { combineReducers } from "redux";
import auth from "./local/auth";
import entities from "./entities";

const index = combineReducers({
  auth,
  entities
});

export default index;
