import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import jams from "./jams";
import me from "./me";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    jams,
    me
  });

export default createRootReducer;
