import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import jams from "./jams";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    jams
  });

export default createRootReducer;
