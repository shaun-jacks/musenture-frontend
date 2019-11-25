import { push } from "connected-react-router";
import { asyncActions } from "../modules/entities/users";

const loginFlowMiddleware = ({
  dispatch,
  getState
}) => next => async action => {
  next(action);
  // If successful login, fetch user data
  if (action.type === "AUTH/LOGIN_SUCCESS") {
    const authUserId = getState().index.auth.id;
    dispatch(asyncActions.fetchUserAfterLogin(authUserId));
  }
  // After fetching user data, redirect
  if (action.type === "USERS/FETCH_USER_AFTER_LOGIN_SUCCESS") {
    dispatch(push("/me"));
  }
};

export default loginFlowMiddleware;
