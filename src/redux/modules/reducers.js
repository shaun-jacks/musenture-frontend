import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./local/auth";
import entities from "./entities";
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    entities
  });

export default createRootReducer;
