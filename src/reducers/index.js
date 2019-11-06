import { combineReducers } from "redux";
import auth from "./auth";
import jams from "./jams";

export default combineReducers({
  auth,
  jams
});
