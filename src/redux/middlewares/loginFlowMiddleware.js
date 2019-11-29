import { push } from "connected-react-router";
import { asyncActions } from "../modules/entities/users";
import { asyncActions as jamActions } from "../modules/entities/jams";

const loginFlowMiddleware = ({
  dispatch,
  getState
}) => next => async action => {
  next(action);
  // If successful login, fetch user data
  if (action.type === "AUTH/LOGIN_SUCCESS") {
    const authUserId = getState().auth.id;
    dispatch(asyncActions.fetchUserAfterLogin(authUserId));
  }
  // If successful fetch of user data, fetch jams by user
  if (action.type === "USERS/FETCH_USER_AFTER_LOGIN_SUCCESS") {
    const authUserId = getState().auth.id;
    dispatch(jamActions.fetchJamsByUserIdAfterLogin(authUserId));
  }
  // After fetching user jams data, redirect
  if (action.type === "JAMS/FETCH_JAMS_AFTER_LOGIN_SUCCESS") {
    dispatch(push("/me"));
  }
};

export default loginFlowMiddleware;
