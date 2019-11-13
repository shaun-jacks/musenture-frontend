import axios from "axios";
import * as types from "./types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/auth";
import { serverUri } from "../utils/config";

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
export const resetLoginForm = () => dispatch => {
  dispatch({ type: types.RESET_LOGIN_FORM });
};

// Login locally
export const handleLocalLogin = (email, password) => {
  return async dispatch => {
    dispatch(loginLoading());
    // Make POST to server with access token to return JWTs
    // NOTE: Safer to do this through https
    const serverUrl = `${serverUri}/users/auth/local`;
    try {
      const res = await axios.post(serverUrl, {
        email,
        password
      });
      const token = res.data;
      // try to decode token to check if valid
      try {
        const user = jwt_decode(token);
        console.log(user);
        // Set auth token in header for all new post requests
        setAuthToken(token);
        // Set token to localStorage
        localStorage.setItem("token", token);
        dispatch(loginSuccess(user));
      } catch (err) {
        console.log(err);
        dispatch(loginError(err));
      }
    } catch (err) {
      console.log("Error posting to server.", err.response);
      if (err.response) {
        dispatch(registerUserError(err.response.data.error));
      } else {
        dispatch(registerUserError(err));
      }
    }
  };
};

//  Login user with facebook
export const handleFacebookLogin = access_token => {
  return async dispatch => {
    dispatch(loginLoading());
    // Make POST to server with access token to return JWTs
    // NOTE: Safer to do this through https
    const serverUrl = `${serverUri}/users/auth/facebook`;
    try {
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
    } catch (err) {
      console.log("Error posting to server.", err.response.data);
      if (err.response) {
        dispatch(registerUserError(err.response.data.error));
      } else {
        dispatch(registerUserError(err));
      }
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

// Register user
export const registerUserLoading = () => dispatch => {
  dispatch({ type: types.REGISTER_USER });
};

export const registerUserSuccess = user => dispatch => {
  dispatch({ type: types.REGISTER_USER_FULFILLED, payload: user });
};

export const registerUserError = err => dispatch => {
  dispatch({ type: types.REGISTER_USER_REJECTED, payload: err });
};

export const resetRegisterForm = () => dispatch => {
  dispatch({ type: types.RESET_REGISTER_FORM });
};

//  Login user with facebook
export const handleRegisterUser = (email, displayName, password, password2) => {
  return async dispatch => {
    dispatch(registerUserLoading());
    // Make POST to server
    const serverUrl = `${serverUri}/users/auth/register`;
    console.log(email);
    try {
      const res = await axios.post(serverUrl, {
        email,
        displayName,
        password,
        password2
      });
      dispatch(registerUserSuccess(res.data));
    } catch (err) {
      console.log("Error posting to server.", err.response.data);
      if (err.response) {
        dispatch(registerUserError(err.response.data.error));
      } else {
        dispatch(registerUserError(err));
      }
    }
  };
};
