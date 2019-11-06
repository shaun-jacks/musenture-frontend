import { combineReducers } from "redux";
import user from "./user";
import jams from "./jams";

export default combineReducers({
  user,
  jams
});
