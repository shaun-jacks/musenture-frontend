import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import jams from "./jams";
import users from "./users";
import me from "./me";
import index from "../redux/modules/reducers";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    jams,
    users,
    me,
    index
  });

export default createRootReducer;
