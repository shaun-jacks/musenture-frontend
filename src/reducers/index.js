import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import jams from "./jams";
import users from "./users";
import me from "./me";
import local from "../redux/modules/local/auth";
import usersNew from "../redux/modules/db/users";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    jams,
    users,
    me,
    local,
    usersNew
  });

export default createRootReducer;
