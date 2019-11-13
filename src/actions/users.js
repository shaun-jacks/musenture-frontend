import axios from "axios";
import * as types from "./types";
import { serverUri } from "../utils/config";

// Fetch a single user by user Id
export const fetchUser = () => {
  return {
    type: types.FETCH_USER
  };
};

export const fetchUserSuccess = (user, authUserId = "") => {
  return {
    type: types.FETCH_USER_FULFILLED,
    payload: user,
    authUserId
  };
};

export const fetchUserError = error => {
  return {
    type: types.FETCH_USER_REJECTED,
    payload: error
  };
};

export const handleFetchUser = (userId, authUserId = "") => {
  return async dispatch => {
    dispatch(fetchUser());
    // Make GET request to user by id
    try {
      const serverUrl = `${serverUri}/users/${userId}`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchUserSuccess(res.data.user, authUserId));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchUserError(err.message));
    }
  };
};

// Fetch all users
export const fetchUsers = () => {
  return {
    type: types.FETCH_USERS
  };
};

export const fetchUsersSuccess = (users, authUserId = "") => {
  return {
    type: types.FETCH_USERS_FULFILLED,
    payload: users,
    authUserId
  };
};

export const fetchUsersError = error => {
  return {
    type: types.FETCH_USERS_REJECTED,
    payload: error
  };
};

export const handleFetchUsers = (authUserId = "") => {
  return async dispatch => {
    dispatch(fetchUsers());
    // GET to server for all users
    try {
      const serverUrl = `${serverUri}/users`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchUsersSuccess(res.data.users, authUserId));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchUsersError(err.response));
    }
  };
};
