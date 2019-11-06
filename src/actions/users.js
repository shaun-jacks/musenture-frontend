import axios from "axios";
import * as types from "./types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/auth";

export const loginLoading = () => {
  return {
    type: types.LOGIN_USER
  };
};

export const loginSuccess = user => {
  return {
    type: types.LOGIN_USER_FULFILLED,
    payload: user
  };
};

export const loginError = error => {
  return {
    type: types.LOGIN_USER_REJECTED,
    payload: error
  };
};

//  Login user with facebook
export const handleFacebookLogin = (access_token, serverUrl) => {
  return async dispatch => {
    dispatch(loginLoading());
    // Make POST to server with access token to return JWTs
    // NOTE: Safer to do this through https
    const res = await axios.post(serverUrl, {
      access_token
    });
    const token = res.headers["x-auth-token"];
    // try to decode token to check if valid
    try {
      const user = jwt_decode(token);
      // Set auth token in header for all new post requests
      setAuthToken(token);
      // Set token to localStorage
      localStorage.setItem("token", token);
      dispatch(loginSuccess(user));
    } catch (err) {
      console.log(err);
      dispatch(loginError(err));
    }
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove authentication header for future requests
  setAuthToken(false);
  dispatch({ type: types.LOGOUT_USER });
};
